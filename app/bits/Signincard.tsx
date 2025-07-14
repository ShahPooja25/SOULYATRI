"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../components/lib/firebase";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";

export function SigninCard() {
  const [selectedRole, setSelectedRole] = useState<string>("");
  const router = useRouter();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement)?.value;
    const password = (form.elements.namedItem("password") as HTMLInputElement)?.value;

    if (!email || !password) {
      alert("Please fill in all required fields.");
      return;
    }

    // Simulate sign-in process
    setTimeout(() => {
      router.push("/dashboard");
    }, 1000);
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("Google Sign-in success:", user);
      router.push("/dashboard");
    } catch (error) {
      console.error("Google Sign-in error:", error);
      alert("Failed to sign in with Google.");
    }
  };

  return (
    <Card className="w-full shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
      <CardHeader className="text-center pb-2">
        <CardTitle className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#FF7B00] to-[#18A2B8] bg-clip-text text-transparent">
          Welcome Back
        </CardTitle>
        <CardDescription className="text-gray-600 text-base md:text-lg mt-2">
          Continue your healing journey where you left off
        </CardDescription>
        <div className="mt-3">
          <Link href="/signup">
            <Button
              variant="link"
              className="text-[#18A2B8] hover:text-[#FF7B00] transition-colors text-sm md:text-base p-0"
            >
              Don't have an account? Sign up
            </Button>
          </Link>
        </div>
      </CardHeader>

      <CardContent className="px-4 md:px-6">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-3">
            <div className="grid gap-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                className="h-10 md:h-11 border-2 border-gray-200 focus:border-[#18A2B8] focus:ring-[#18A2B8] rounded-lg text-sm md:text-base"
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="role">Role</Label>
              <select
                id="role"
                name="role"
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="h-10 md:h-11 border-2 border-gray-200 focus:border-[#FF7B00] focus:ring-[#FF7B00] rounded-lg text-sm md:text-base px-3 bg-white"
                required
              >
                <option value="">Select your role</option>
                <option value="admin">Admin</option>
                <option value="therapist">Therapist</option>
                <option value="user">User</option>
              </select>
            </div>

            {selectedRole === "therapist" && (
              <div className="grid gap-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  name="address"
                  type="text"
                  placeholder="Your practice address"
                  className="h-10 md:h-11 border-2 border-gray-200 focus:border-[#18A2B8] focus:ring-[#18A2B8] rounded-lg text-sm md:text-base"
                  required
                />
              </div>
            )}

            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                className="h-10 md:h-11 border-2 border-gray-200 focus:border-[#FF7B00] focus:ring-[#FF7B00] rounded-lg text-sm md:text-base"
                required
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <input
                  id="remember"
                  name="remember"
                  type="checkbox"
                  className="w-4 h-4 text-[#FF7B00] bg-gray-100 border-gray-300 rounded focus:ring-[#FF7B00] focus:ring-2"
                />
                <Label htmlFor="remember" className="text-sm text-gray-600">
                  Remember me
                </Label>
              </div>
              <Button
                variant="link"
                className="text-[#18A2B8] hover:text-[#FF7B00] text-sm p-0"
                type="button"
              >
                Forgot password?
              </Button>
            </div>

            <Button
              type="submit"
              className="w-full h-10 md:h-11 bg-gradient-to-r from-[#FF7B00] to-[#18A2B8] hover:from-[#e66a00] hover:to-[#1591a3] text-white font-semibold text-base md:text-lg rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 mt-4"
            >
              Continue Your Journey
            </Button>
          </div>
        </form>
      </CardContent>

      <CardFooter className="px-4 md:px-6 pb-4 md:pb-6">
        <Button
          type="button"
          onClick={handleGoogleSignIn}
          variant="outline"
          className="w-full h-10 md:h-11 border-2 border-gray-300 hover:border-[#FF7B00] hover:text-[#FF7B00] font-medium rounded-lg transition-all duration-300 bg-transparent text-sm md:text-base"
        >
          <svg
            className="w-4 md:w-5 h-4 md:h-5 mr-2"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M21.35 11.1h-9.18v2.92h5.28c-.23 1.37-1.43 4.04-5.28 4.04-3.18 0-5.79-2.63-5.79-5.87s2.61-5.87 5.79-5.87c1.81 0 3.02.77 3.71 1.43l2.55-2.47C16.61 4.47 14.3 3.5 11.51 3.5 6.82 3.5 3 7.35 3 12s3.82 8.5 8.51 8.5c4.91 0 8.13-3.46 8.13-8.33 0-.59-.08-1.07-.19-1.57z" />
          </svg>
          Continue with Google
        </Button>
      </CardFooter>
    </Card>
  );
}
