"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Target, TrendingUp, Award, CheckCircle, Globe } from "lucide-react";

type Language = "hinglish" | "english";

export default function HomePage() {
  const [language, setLanguage] = useState<Language>("hinglish");

  useEffect(() => {
    const saved = localStorage.getItem("language") as Language;
    if (saved && (saved === "hinglish" || saved === "english")) {
      setLanguage(saved);
    }
  }, []);

  const toggleLanguage = () => {
    const newLang = language === "hinglish" ? "english" : "hinglish";
    setLanguage(newLang);
    localStorage.setItem("language", newLang);
  };

  const t = (hinglish: string, english: string) => {
    return language === "hinglish" ? hinglish : english;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary">
      {/* Navigation */}
      <nav className="border-b bg-background/95 backdrop-blur sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <Target className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold">Teer Khela AI</span>
            </Link>
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                size="sm"
                onClick={toggleLanguage}
                className="flex items-center gap-2"
              >
                <Globe className="h-4 w-4" />
                {language === "hinglish" ? "English" : "हिंग्लिश"}
              </Button>
              <Link href="/predictions">
                <Button variant="ghost" size="sm">{t("Predictions", "Predictions")}</Button>
              </Link>
              <Link href="/results">
                <Button variant="ghost" size="sm">{t("Results", "Results")}</Button>
              </Link>
              <Link href="/login">
                <Button variant="outline" size="sm">{t("Login", "Login")}</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <h1 className="text-5xl font-bold tracking-tight">
            {t(
              "AI-Powered Teer Predictions",
              "AI-Powered Teer Predictions"
            )}
          </h1>
          <p className="text-xl text-muted-foreground">
            {t(
              "Shillong, Khanapara, Juwai aur anya Teer games ke liye advanced AI predictions",
              "Advanced AI predictions for Shillong, Khanapara, Juwai and other Teer games"
            )}
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/predictions">
              <Button size="lg" className="gap-2">
                <TrendingUp className="h-5 w-5" />
                {t("Predictions Dekho", "View Predictions")}
              </Button>
            </Link>
            <Link href="/results">
              <Button size="lg" variant="outline">
                {t("Latest Results", "Latest Results")}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="text-3xl font-bold">15,247</div>
              <div className="text-sm text-muted-foreground">{t("Total Users", "Total Users")}</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="text-3xl font-bold">5,183</div>
              <div className="text-sm text-muted-foreground">
                {t("Active Subscribers", "Active Subscribers")}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="text-3xl font-bold">1,264</div>
              <div className="text-sm text-muted-foreground">
                {t("Predictions", "Predictions")}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="text-3xl font-bold">8,942</div>
              <div className="text-sm text-muted-foreground">{t("Results", "Results")}</div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-center mb-12">
          {t("Hamare Features", "Our Features")}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-6 w-6 text-primary" />
                {t("AI Predictions", "AI Predictions")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                {t(
                  "Advanced machine learning algorithms se accurate predictions",
                  "Accurate predictions using advanced machine learning algorithms"
                )}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-6 w-6 text-primary" />
                {t("Real-time Results", "Real-time Results")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                {t(
                  "Sabse pehle results paayein, instantly update hote hain",
                  "Get results first, updated instantly"
                )}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-6 w-6 text-primary" />
                {t("Dream Number Analysis", "Dream Number Analysis")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                {t(
                  "Apne sapno ko numbers mein convert karein AI ki madad se",
                  "Convert your dreams to numbers with AI assistance"
                )}
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-3xl">
              {t("Premium Access Paayen", "Get Premium Access")}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              {t(
                "Premium members ko milte hain exclusive predictions, priority support, aur advanced analytics",
                "Premium members get exclusive predictions, priority support, and advanced analytics"
              )}
            </p>
            <Link href="/login">
              <Button size="lg">
                {t("Abhi Subscribe Karein", "Subscribe Now")}
              </Button>
            </Link>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t mt-20">
        <div className="container mx-auto px-4 py-8 text-center text-sm text-muted-foreground">
          <p>© 2024 Teer Khela AI. {t("Sab rights reserved.", "All rights reserved.")}</p>
        </div>
      </footer>
    </div>
  );
}
