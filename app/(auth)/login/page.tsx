"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Target } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    mobile: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await signIn("credentials", {
        mobile: formData.mobile,
        password: formData.password,
        redirect: false,
      });

      if (result?.error) {
        toast.error("Invalid mobile number or password");
        setIsLoading(false);
        return;
      }

      toast.success("Login successful!");
      router.push("/dashboard");
      router.refresh();
    } catch (error: any) {
      toast.error(error.message || "Login failed");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-background to-secondary">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-4">
            <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
              <Target className="h-8 w-8 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">Login / लॉगिन</CardTitle>
          <CardDescription>
            Login to access AI predictions
            <br />
            AI भविष्यवाणियों तक पहुंचने के लिए लॉगिन करें
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="mobile">
                Mobile Number / मोबाइल नंबर
              </Label>
              <Input
                id="mobile"
                type="tel"
                placeholder="10-digit mobile number"
                required
                maxLength={10}
                value={formData.mobile}
                onChange={(e) =>
                  setFormData({ ...formData, mobile: e.target.value.replace(/\D/g, "") })
                }
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">
                Password / पासवर्ड
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter password"
                required
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                disabled={isLoading}
              />
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Login / लॉगिन करें"}
            </Button>

            <div className="text-center text-sm">
              <span className="text-muted-foreground">
                Don't have an account? / खाता नहीं है?{" "}
              </span>
              <Link href="/register" className="text-primary hover:underline">
                Sign Up / साइन अप करें
              </Link>
            </div>

            <div className="text-center text-sm">
              <Link href="/" className="text-muted-foreground hover:text-primary">
                ← Back to Home / होम पर वापस जाएं
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
