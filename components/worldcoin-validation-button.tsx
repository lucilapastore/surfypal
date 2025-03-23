"use client";

import { Button } from "@/components/ui/button";
import useWorldCoin, {
  IncognitoActions,
  loginDeviceVerifyPayload,
} from "@/hooks/use-worldcoin";
import { User } from "@/types";
import { IDKitWidget } from "@worldcoin/idkit";
import {
  ISuccessResult,
  MiniAppVerifyActionPayload,
  MiniKit,
  ResponseEvent,
  VerificationLevel,
} from "@worldcoin/minikit-js";
import { CheckCircle, Fingerprint } from "lucide-react";
import { useRouter } from "next/navigation";
import { FC, useEffect, useState } from "react";
import { toast } from "sonner";

interface WorldcoinValidationButtonProps {
  user: User;
  onSuccess?: () => void;
}

const WorldcoinValidationButton: FC<WorldcoinValidationButtonProps> = ({
  user,
  onSuccess,
}) => {
  const [isMiniKit, setMiniKit] = useState<boolean>(false);
  const { verifyWithServer, handleVerifyIdKit } = useWorldCoin();
  const router = useRouter();

  // Handle MiniKit verification response
  const handleMiniKitSubscription = async (
    response: MiniAppVerifyActionPayload
  ) => {
    if (response.status === "error" || !user) {
      throw new Error(`Verification failed: ${JSON.stringify(response)}`);
    }

    const verifyResponse = await verifyWithServer(
      response,
      IncognitoActions.VERIFY_USER,
      user.id
    );

    const verifyResponseJson = await verifyResponse.json();
    if (verifyResponseJson.status === 200) {
      toast.success("Successfully verified with Worldcoin!");
      router.refresh();
    }
  };

  // Initialize MiniKit verification
  const verifyWithMiniKit = () => {
    try {
      MiniKit.commands.verify(loginDeviceVerifyPayload);
    } catch (error) {
      console.error("Error using MiniKit:", error);
      toast.error("Please open this app in the World App to use MiniKit");
    }
  };

  // Setup MiniKit subscription
  useEffect(() => {
    try {
      // Check if MiniKit is defined and has the isInstalled method
      const miniKitAvailable =
        typeof MiniKit !== "undefined" &&
        typeof MiniKit.isInstalled === "function";

      if (!miniKitAvailable || !MiniKit.isInstalled()) {
        return;
      }

      setMiniKit(true);

      MiniKit.subscribe(
        ResponseEvent.MiniAppVerifyAction,
        handleMiniKitSubscription
      );

      return () => {
        MiniKit.unsubscribe(ResponseEvent.MiniAppVerifyAction);
      };
    } catch (error) {
      console.error("Error setting up MiniKit:", error);
      // Don't set isMiniKit to true if there's an error
    }
  }, []);

  // Handle successful IDKit verification
  const onSuccessIdKit = async () => {
    toast.success("Successfully verified with Worldcoin!");
    router.refresh();
    onSuccess?.();
  };

  // Create the validation button
  const validateButton = (onClick: () => void) => {
    return (
      <Button
        className="flex items-center justify-center gap-2 transition-colors"
        onClick={onClick}
        variant="outline"
      >
        <Fingerprint size={20} className="text-primary" />
        Verify with World ID
      </Button>
    );
  };

  if (user.worldIdVerified) {
    return (
      <div className="flex items-center gap-2 text-sm text-primary">
        <CheckCircle size={16} className="text-primary" />
        <span>Verified with Worldcoin</span>
      </div>
    );
  }

  return isMiniKit ? (
    validateButton(verifyWithMiniKit)
  ) : (
    <IDKitWidget
      app_id={process.env.NEXT_PUBLIC_WORLDCOIN_APP_ID as `app_${string}`}
      action={IncognitoActions.VERIFY_USER}
      onSuccess={onSuccessIdKit}
      handleVerify={async (proof: ISuccessResult) => {
        await handleVerifyIdKit(proof, user.id);
      }}
      verification_level={VerificationLevel.Device}
    >
      {({ open }) => validateButton(open)}
    </IDKitWidget>
  );
};

export default WorldcoinValidationButton;
