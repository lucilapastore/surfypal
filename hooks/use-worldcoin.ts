"use client";

import {
  ISuccessResult,
  VerificationLevel,
  VerifyCommandInput,
} from "@worldcoin/minikit-js";
import { toast } from "sonner";

export const worldcoinAppId = process.env
  .NEXT_PUBLIC_WORLDCOIN_APP_ID as `app_${string}`;

export const IncognitoActions = {
  VERIFY_USER: process.env.NEXT_PUBLIC_WORLDCOIN_ACTION_NAME!,
};

export const loginDeviceVerifyPayload: VerifyCommandInput = {
  action: IncognitoActions.VERIFY_USER,
  verification_level: VerificationLevel.Device,
};

const useWorldCoin = () => {
  const handleVerifyIdKit = async (proof: ISuccessResult, userId: string) => {
    try {
      const res = await verifyWithServer(
        proof,
        IncognitoActions.VERIFY_USER,
        userId
      );

      if (!res.ok) {
        const errorData = await res.json();
        console.error("Verification failed:", errorData);
        toast.error("Verification failed. Please try again.");
        throw new Error("Verification failed.");
      }

      return true;
    } catch (error) {
      console.error("Error during verification:", error);
      toast.error("Verification process encountered an error");
      throw error;
    }
  };

  const verifyWithServer = async (
    proof: ISuccessResult,
    action: string,
    userId: string
  ) => {
    try {
      const url = "/api/worldcoin-validation";

      return await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          payload: proof,
          action,
          userId,
        }),
      });
    } catch (error) {
      console.error("Error sending verification to server:", error);
      toast.error("Failed to connect to verification server");
      throw error;
    }
  };

  return { handleVerifyIdKit, verifyWithServer };
};

export default useWorldCoin;
