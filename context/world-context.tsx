"use client"; // Required for Next.js

import { MiniKit } from "@worldcoin/minikit-js";
import { ReactNode, useEffect } from "react";

export default function MiniKitProvider({
  children,
  appId,
}: {
  children: ReactNode;
  appId?: string;
}) {
  useEffect(() => {
    // Passing appId in the install is optional
    // but allows you to access it later via `window.MiniKit.appId`
    MiniKit.install(appId);
  }, []);

  return <>{children}</>;
}
