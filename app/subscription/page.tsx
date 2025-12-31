"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { toast } from "sonner";
import { Check, Loader2, Target, Sparkles } from "lucide-react";

declare global {
  interface Window {
    Razorpay: any;
  }
}

interface SubscriptionPlan {
  id: string;
  name: string;
  nameHindi: string | null;
  durationDays: number;
  price: number;
  description: string | null;
  descriptionHindi: string | null;
  features: string[];
  isActive: boolean;
  order: number;
}

export default function SubscriptionPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [processingPlanId, setProcessingPlanId] = useState<string | null>(null);

  useEffect(() => {
    fetchPlans();
    loadRazorpayScript();
  }, []);

  const fetchPlans = async () => {
    try {
      const response = await fetch("/api/plans");
      const data = await response.json();
      setPlans(data.plans || []);
    } catch (error) {
      toast.error("Failed to load subscription plans");
    } finally {
      setLoading(false);
    }
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleSubscribe = async (planId: string, planPrice: number, planName: string) => {
    if (status === "unauthenticated") {
      toast.error("Please login to subscribe");
      router.push("/login");
      return;
    }

    setProcessingPlanId(planId);

    try {
      // Create Razorpay order
      const orderResponse = await fetch("/api/razorpay/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planId }),
      });

      const orderData = await orderResponse.json();

      if (!orderResponse.ok) {
        throw new Error(orderData.error || "Failed to create order");
      }

      // Open Razorpay checkout
      const options = {
        key: orderData.key,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Teer Khela AI",
        description: `Subscription: ${planName}`,
        order_id: orderData.orderId,
        handler: async function (response: any) {
          // Verify payment
          try {
            const verifyResponse = await fetch("/api/razorpay/verify-payment", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });

            const verifyData = await verifyResponse.json();

            if (!verifyResponse.ok) {
              throw new Error(verifyData.error || "Payment verification failed");
            }

            toast.success("Payment successful! Subscription activated.");
            router.push("/dashboard");
          } catch (error: any) {
            toast.error(error.message || "Payment verification failed");
          } finally {
            setProcessingPlanId(null);
          }
        },
        prefill: {
          name: session?.user?.name || "",
          email: session?.user?.email || "",
          contact: session?.user?.mobile || "",
        },
        theme: {
          color: "#10b981",
        },
        modal: {
          ondismiss: function () {
            setProcessingPlanId(null);
          },
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error: any) {
      toast.error(error.message || "Failed to initiate payment");
      setProcessingPlanId(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-secondary">
      {/* Navigation */}
      <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <Target className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold">Teer Khela AI</span>
            </Link>
            <div className="flex items-center space-x-4">
              {session ? (
                <>
                  <Link href="/dashboard">
                    <Button variant="outline" size="sm">Dashboard</Button>
                  </Link>
                  <Link href="/">
                    <Button variant="ghost" size="sm">Home</Button>
                  </Link>
                </>
              ) : (
                <>
                  <Link href="/login">
                    <Button variant="outline" size="sm">Login</Button>
                  </Link>
                  <Link href="/register">
                    <Button size="sm">Sign Up</Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Header */}
      <section className="container mx-auto px-4 py-12 text-center">
        <div className="max-w-3xl mx-auto space-y-4">
          <div className="inline-block px-4 py-2 bg-primary/10 rounded-full border border-primary/20 mb-4">
            <p className="text-primary font-semibold">
              ✨ AI Predictions • 10,000+ Happy Users
            </p>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold">
            Choose Your Plan
            <br />
            <span className="text-primary">अपना प्लान चुनें</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Get access to AI-powered predictions, dream calculator, and formula calculator
            <br />
            AI भविष्यवाणी, ड्रीम कैलकुलेटर और फॉर्मूला कैलकुलेटर तक पहुंच प्राप्त करें
          </p>
        </div>
      </section>

      {/* Plans */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <Card
              key={plan.id}
              className={`relative ${
                plan.durationDays === 3
                  ? "border-primary shadow-lg shadow-primary/20 scale-105"
                  : "border-border"
              }`}
            >
              {plan.durationDays === 3 && (
                <div className="absolute -top-4 left-0 right-0 flex justify-center">
                  <span className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                    <Sparkles className="h-4 w-4" />
                    Most Popular
                  </span>
                </div>
              )}

              <CardHeader className="text-center pt-8">
                <CardTitle className="text-2xl">
                  {plan.name}
                  <br />
                  <span className="text-lg text-muted-foreground">{plan.nameHindi}</span>
                </CardTitle>
                <CardDescription className="text-3xl font-bold text-foreground mt-4">
                  ₹{plan.price}
                  <span className="text-sm font-normal text-muted-foreground">
                    /{plan.durationDays} {plan.durationDays === 1 ? "day" : "days"}
                  </span>
                </CardDescription>
                <p className="text-sm text-muted-foreground mt-2">
                  {plan.description}
                  <br />
                  {plan.descriptionHindi}
                </p>
              </CardHeader>

              <CardContent>
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <Check className="h-5 w-5 text-primary flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter>
                <Button
                  className="w-full"
                  size="lg"
                  variant={plan.durationDays === 3 ? "default" : "outline"}
                  onClick={() => handleSubscribe(plan.id, plan.price, plan.name)}
                  disabled={processingPlanId === plan.id}
                >
                  {processingPlanId === plan.id ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      Processing...
                    </>
                  ) : (
                    "Subscribe Now / अब सब्सक्राइब करें"
                  )}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-12">
        <Card className="max-w-4xl mx-auto">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">
              What You Get / आपको क्या मिलेगा
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <h3 className="font-semibold flex items-center gap-2">
                  <Check className="h-5 w-5 text-primary" />
                  AI-Powered Predictions
                </h3>
                <p className="text-sm text-muted-foreground">
                  Advanced algorithms analyze historical data for accurate predictions
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold flex items-center gap-2">
                  <Check className="h-5 w-5 text-primary" />
                  Dream Calculator
                </h3>
                <p className="text-sm text-muted-foreground">
                  110+ dream symbols to convert dreams into numbers
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold flex items-center gap-2">
                  <Check className="h-5 w-5 text-primary" />
                  Formula Calculator
                </h3>
                <p className="text-sm text-muted-foreground">
                  Mathematical formulas for Direct, House, and Ending numbers
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold flex items-center gap-2">
                  <Check className="h-5 w-5 text-primary" />
                  Latest Results
                </h3>
                <p className="text-sm text-muted-foreground">
                  Daily updated results for all Teer houses
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t mt-12">
        <div className="container mx-auto px-4 py-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2025 Teer Khela with AI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
