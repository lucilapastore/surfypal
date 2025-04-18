"use client";

import { WorldIdButton } from "@/components/auth/world-id-button";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useSurfyPalStore } from "@/lib/store";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const { signIn } = useSurfyPalStore();
  const router = useRouter();

  const handleSignIn = async (userType: "host" | "surfer") => {
    try {
      await signIn(userType);
      router.push("/dashboard");
    } catch (error) {
      console.error("Failed to sign in:", error);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <Card className="mx-auto w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Welcome Back</CardTitle>
          <CardDescription>
            Sign in to your SurfyPal account to continue your journey
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-6">
          <WorldIdButton onSuccess={() => handleSignIn("host")} />

          <div className="relative flex w-full items-center justify-center">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <span className="relative bg-background px-2 text-xs uppercase text-muted-foreground">
              Or continue with
            </span>
          </div>

          <div className="grid w-full gap-2">
            <Button variant="outline" onClick={() => handleSignIn("host")}>
              Demo User (Host)
            </Button>
            <Button variant="outline" onClick={() => handleSignIn("surfer")}>
              Demo User (Surfer)
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <div className="text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="font-medium text-primary hover:underline"
            >
              Sign up
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
