import { ISuccessResult, verifyCloudProof } from "@worldcoin/minikit-js";
import { NextRequest, NextResponse } from "next/server";

// Import API functions from your existing API module
import { updateUser } from "@/lib/api";

interface IRequestPayload {
  payload: ISuccessResult;
  action: string;
  userId: string;
  signal?: string;
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const { payload, action, signal, userId } =
      (await req.json()) as IRequestPayload;

    const app_id = process.env.NEXT_PUBLIC_WORLDCOIN_APP_ID as `app_${string}`;
    const verifyRes = await verifyCloudProof(payload, app_id, action);

    if (verifyRes.success) {
      // Update user as verified in your existing API
      // Assuming updateUser function updates the user and returns the updated user
      const updatedUser = await updateUser(userId, { worldIdVerified: true });

      return NextResponse.json({
        status: 200,
        user: updatedUser,
      });
    } else {
      // Handle verification failure
      return NextResponse.json({ verifyRes, status: 400 }, { status: 400 });
    }
  } catch (error) {
    console.error("Worldcoin verification error:", error);
    return NextResponse.json(
      { error: "Verification failed", status: 500 },
      { status: 500 }
    );
  }
}
