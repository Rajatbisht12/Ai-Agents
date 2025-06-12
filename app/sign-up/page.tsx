"use client";
import React, { useState } from "react";
import { useAuth, useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

function SignUpPage() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pendingVerification, setPendingVerification] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  if (!isLoaded) return null;

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!signUp) return;

    try {
      await signUp!.create({ emailAddress: email, password });
      await signUp!.prepareEmailAddressVerification({
        strategy: "email_code",
      });
      setPendingVerification(true);
    } catch (error: any) {
      console.error(JSON.stringify(error, null, 2));
      setError(error.errors?.[0]?.message || "Something went wrong.");
    }
  }

  async function onPressVerify(e: React.FormEvent) {
    e.preventDefault();
    if (!signUp) return;

    try {
      const completeSignUp = await signUp!.attemptVerification({
        code: verificationCode,
        strategy: "email_code",
      });

      if (completeSignUp.status === "complete") {
        await setActive!({ session: completeSignUp.createdSessionId });
        router.push("/dashboard");
      } else {
        throw new Error("Failed to verify email");
      }
    } catch (error: any) {
      console.error(JSON.stringify(error, null, 2));
      setError(error.errors?.[0]?.message || "Verification failed.");
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-background px-4">
      <Card className="w-full max-w-md shadow-xl rounded-2xl border border-muted">
        <CardHeader>
          <CardTitle className="text-3xl font-semibold text-center">
            Sign Up
          </CardTitle>
        </CardHeader>

        <CardContent>
          {!pendingVerification ? (
            <form onSubmit={submit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <Button
                    type="button"
                    size="icon"
                    variant="ghost"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-500" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-500" />
                    )}
                  </Button>
                </div>
              </div>
              <div id="clerk-captcha" />

              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Button type="submit" className="w-full">
                Continue
              </Button>
            </form>
          ) : (
            <form onSubmit={onPressVerify} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="code">Verification Code</Label>
                <Input
                  id="code"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  placeholder="Enter the code sent to your email"
                  required
                />
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Button type="submit" className="w-full">
                Verify & Continue
              </Button>
            </form>
          )}
        </CardContent>

        <CardFooter className="flex justify-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            href="/sign-in"
            className="ml-1 font-medium text-primary hover:underline"
          >
            Sign In
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}

export default SignUpPage;
