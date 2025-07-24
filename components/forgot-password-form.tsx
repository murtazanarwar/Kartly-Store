"use client";

import React, { useState } from "react";
import toast from "react-hot-toast";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/shadcn_button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { forgotPassword } from "@/actions/get-authservice";
import { useRouter } from "next/navigation";


export function ForgotPasswordForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
  });
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
        setLoading(true);
        const response = await forgotPassword(user);
        console.log("Forgot Password Response", response);
        toast.success('Email Sent!');
        router.push('/log-in');
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("Sending Email failed. Please try again.");
      }
      console.log("Error Sending Email",err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden">
        <CardContent className="p-6 md:p-8">
          <form className="flex flex-col gap-6" onSubmit={onSubmit}>
            <div className="flex flex-col items-center text-center">
              <h1 className="text-2xl font-bold">Forgot your password?</h1>
              <p className="text-balance text-muted-foreground">
                Enter your email address and we’ll send you a link to reset your password.
              </p>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="johndoe@example.com"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              Send reset link
            </Button>
            <div className="text-center text-sm">
              Remembered your password?{' '}
              <a href="/log-in" className="underline underline-offset-4">
                Log in
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
