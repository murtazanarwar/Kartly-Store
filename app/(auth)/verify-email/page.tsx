"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/shadcn_button";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { verifyEmail } from "@/actions/get-authservice";

export default function VerifyEmailPage() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const urlToken = new URLSearchParams(window.location.search).get("token");
    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    const verifyUserEmail = async () => {
      try {
        await verifyEmail({ token });
        setVerified(true);
        toast.success("Email verified successfully!");
        router.push('/')
      } catch (error) {
        if (error instanceof Error) {
          toast.error(error.message || "Verification failed.");
        } else {
          toast.error("Verification failed.");
        }
        setError(true);
      }
    };

    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token, router]);

  return (
    <div className={cn("flex flex-col items-center justify-center min-h-screen p-4")}>
      <Card className="w-full max-w-md text-center">
        <CardContent className="p-6 flex flex-col gap-4">
          <h1 className="text-2xl font-bold">Verify Email</h1>

          {verified ? (
            <>
              <p className="text-green-600 font-medium">Your email has been successfully verified.</p>
              <Link href="/log-in">
                <Button className="w-full mt-2">Go to Login</Button>
              </Link>
            </>
          ) : error ? (
            <>
              <p className="text-red-600 font-medium">Verification failed. Token may be invalid or expired.</p>
              <Link href="/sign-up">
                <Button variant="outline" className="w-full mt-2">Sign Up Again</Button>
              </Link>
            </>
          ) : (
            <p className="text-muted-foreground">Verifying your email...</p>
          )}

          <div className="text-sm mt-2 text-muted-foreground break-all">
            Token: {token || "Not found in URL"}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
