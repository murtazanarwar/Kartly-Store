"use client";
import React, { useEffect } from "react";

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/shadcn_button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FaApple, FaGoogle, FaMeta } from "react-icons/fa6"
import axios from 'axios';
import {useRouter} from 'next/navigation';
import toast from "react-hot-toast";
import { useUser } from "@/hooks/use-user";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  
  const router = useRouter();
  const setGlobalUser = useUser((s) => s.setUser); 
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });

  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);


  const onLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post('/api/log-in', user);
      const userData = response.data.user;
      setGlobalUser(userData);
      // console.log("Login Response", response.data);
      router.push('/');
    } catch (error:any) {
      // console.log("Login failed", error);
      toast.error(error.message);
    }finally{
      setLoading(false);
    }
  };

  useEffect(() => {
    if(user.email.length > 0 && user.password.length > 0){
      setButtonDisabled(false);
    }
    else{
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8" onSubmit={onLogin}>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Welcome back</h1>
                <p className="text-balance text-muted-foreground">
                  Login to your account
                </p>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={user.email}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                  placeholder="johndoe@example.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="/forgot-password"
                    className="ml-auto text-sm underline-offset-2 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input 
                  id="password" 
                  type="password" 
                  value={user.password}
                  onChange={(e) => setUser({ ...user, password: e.target.value })}
                  required 
                />
              </div>
              <Button 
                type="submit" 
                className="w-full"
                disabled={buttonDisabled || loading}
              >
                {loading ? "Loging in..." : "Log In"}
              </Button>
              <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                <span className="relative z-10 bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <Button variant="outline" className="w-full flex items-center justify-center gap-2">
                  <FaApple className="w-5 h-5" />
                  <span className="sr-only">Login with Apple</span>
                </Button>
                <Button variant="outline" className="w-full flex items-center justify-center gap-2">
                  <FaGoogle className="w-5 h-5" />
                  <span className="sr-only">Login with Google</span>
                </Button>
                <Button variant="outline" className="w-full flex items-center justify-center gap-2">
                  <FaMeta className="w-5 h-5" />
                  <span className="sr-only">Login with Facebook</span>
                </Button>
              </div>
              <div className="text-center text-sm">
                Don&apos;t have an account?{' '}
                <a href="/sign-up" className="underline underline-offset-4">
                  Sign up
                </a>
              </div>
            </div>
          </form>
          <div className="relative hidden bg-muted md:block">
            <img
              src="/auth-screen/log-in.png"
              alt="Illustration"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
      {/* <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{' '}
        and <a href="#">Privacy Policy</a>.
      </div> */}
    </div>
  )
}
