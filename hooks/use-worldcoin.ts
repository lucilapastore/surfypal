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

interface VerifyResponse {
  status: number;
  user?: any;
  error?: string;
}

const useWorldCoin = () => {
  const handleVerifyIdKit = async (proof: ISuccessResult, userId: string) => {
    try {
      if (!proof || !userId) {
        throw new Error("Missing required verification parameters");
      }

      const res = await verifyWithServer(
        proof,
        IncognitoActions.VERIFY_USER,
        userId
      );

      const data: VerifyResponse = await res.json();

      if (!res.ok || data.error) {
        console.error("Verification failed:", data.error);
        toast.error("Verification failed. Please try again.");
        throw new Error(data.error || "Verification failed");
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
      if (!process.env.NEXT_PUBLIC_WORLDCOIN_APP_ID) {
        throw new Error("World ID app_id is not configured");
      }

      const url = "/api/worldcoin-validation";

      const response = await fetch(url, {
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

      return response;
    } catch (error) {
      console.error("Error sending verification to server:", error);
      toast.error("Failed to connect to verification server");
      throw error;
    }
  };

  return { handleVerifyIdKit, verifyWithServer };
};

export default useWorldCoin;
