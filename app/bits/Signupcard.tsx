"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation"; // ✅ for navigation in Next.js
import Link from "next/link"; // ✅ use Next.js Link
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

export function SignupCard() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<string>("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const password = (form.elements.namedItem("password") as HTMLInputElement)
      .value;
    const confirmPassword = (
      form.elements.namedItem("confirmPassword") as HTMLInputElement
    ).value;

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // Simulate signup process
    setTimeout(() => {
      router.push("/dashboard"); // ✅ Next.js router
    }, 1000);
  };

  return (
    <Card className="w-full shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
      <CardHeader className="text-center pb-2">
        <CardTitle className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#FF7B00] to-[#18A2B8] bg-clip-text text-transparent">
          Begin Your Journey
        </CardTitle>
        <CardDescription className="text-gray-600 text-base md:text-lg mt-2">
          Join thousands on their path to healing and self-discovery
        </CardDescription>
        <div className="mt-3">
          <Link href="/signin" passHref>
            <Button
              variant="link"
              className="text-[#18A2B8] hover:text-[#FF7B00] transition-colors text-sm md:text-base p-0"
            >
              Already have an account? Login
            </Button>
          </Link>
        </div>
      </CardHeader>

      <CardContent className="px-4 md:px-6">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-3">
            <div className="grid gap-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" name="name" type="text" placeholder="Your full name" required />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" name="email" type="email" placeholder="you@example.com" required />
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
                  required
                />
              </div>
            )}

            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" placeholder="Create password" required />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input id="confirmPassword" name="confirmPassword" type="password" placeholder="Confirm password" required />
            </div>
          </div>

          <CardFooter className="flex-col gap-3 px-0 mt-4">
            <Button
              type="submit"
              className="w-full h-10 md:h-11 bg-gradient-to-r from-[#FF7B00] to-[#18A2B8] hover:from-[#e66a00] hover:to-[#1591a3] text-white font-semibold text-base md:text-lg rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Start Your Healing Journey
            </Button>
            <Button
              variant="outline"
              type="button"
              className="w-full h-10 md:h-11 border-2 border-gray-300 hover:border-[#FF7B00] hover:text-[#FF7B00] font-medium rounded-lg transition-all duration-300"
            >
              <svg
                className="w-4 md:w-5 h-4 md:h-5 mr-2"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M21.35 11.1H12v2.82h5.37c-.23 1.2-.94 2.18-2 2.85v2.37h3.23c1.89-1.74 2.98-4.31 2.98-7.22z" />
                <path d="M12 22c2.7 0 4.97-.89 6.63-2.4l-3.23-2.37c-.9.6-2.06.97-3.4.97-2.6 0-4.81-1.75-5.6-4.1H3.1v2.57C4.8 19.43 8.09 22 12 22z" />
                <path d="M6.4 13.1c-.2-.6-.4-1.26-.4-2s.2-1.4.4-2V6.5H3.1C2.4 7.9 2 9.4 2 11s.4 3.1 1.1 4.5l3.3-2.4z" />
                <path d="M12 4.1c1.47 0 2.8.5 3.85 1.48l2.87-2.87C16.97 1.6 14.6.6 12 .6 8.09.6 4.8 3.17 3.1 6.5L6.4 8.9C7.19 6.55 9.4 4.8 12 4.8v-.7z" />
              </svg>
              Continue with Google
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
}
