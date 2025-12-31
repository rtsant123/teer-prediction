"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Target, TrendingUp, Shield, Zap, Star, Users } from "lucide-react";
import { useLanguage } from "@/lib/contexts/language-context";
import { LanguageToggle } from "@/components/language/language-toggle";

export default function HomePageClient() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-secondary">
      {/* Navigation */}
      <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Target className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-green-400 bg-clip-text text-transparent">
                {t("Teer Khela with AI", "Teer Khela with AI")}
              </span>
            </div>
            <div className="flex items-center space-x-2 md:space-x-4">
              <LanguageToggle />
              <Link href="/results">
                <Button variant="ghost" size="sm" className="text-sm md:text-base">
                  {t("Results / रिजल्ट", "Results")}
                </Button>
              </Link>
              <Link href="/predictions">
                <Button variant="ghost" size="sm" className="text-sm md:text-base">
                  {t("Predictions / भविष्यवाणी", "Predictions")}
                </Button>
              </Link>
              <Link href="/login">
                <Button variant="outline" size="sm" className="text-sm md:text-base">
                  {t("Login / लॉगिन", "Login")}
                </Button>
              </Link>
              <Link href="/register">
                <Button size="sm" className="text-sm md:text-base">
                  {t("Sign Up / साइन अप", "Sign Up")}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12 md:py-20">
        <div className="text-center space-y-6 max-w-4xl mx-auto">
          <div className="inline-block px-4 py-2 bg-primary/10 rounded-full border border-primary/20">
            <p className="text-primary font-semibold text-sm md:text-base">
              🎯 {t("AI Powered • 10,000+ Players Ka Bharosa", "AI Powered • Trusted by 10,000+ Players")}
            </p>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            {t("AI Se Jeeto Big!", "Win Big with AI!")}
            <br />
            <span className="bg-gradient-to-r from-primary to-green-400 bg-clip-text text-transparent">
              {t("Teer Khela AI", "Teer Khela AI")}
            </span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            {t(
              "🎯 AI bahut important hai! Hamare advanced AI technology se accurate predictions milega. AI-powered dream interpretation, AI algorithms, aur machine learning se winning numbers nikalo. Latest results free mein dekho aur premium AI predictions unlock karo!",
              "🎯 AI is very important! Get accurate predictions with our advanced AI technology. AI-powered dream interpretation, algorithms, and machine learning to find winning numbers. View latest results for free and unlock premium AI predictions!"
            )}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link href="/register">
              <Button size="lg" className="w-full sm:w-auto text-lg px-8">
                ✨ {t("Free Sign Up Karo", "Free Sign Up")}
              </Button>
            </Link>
            <Link href="/results">
              <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg px-8">
                {t("Free Results Dekho →", "View Free Results →")}
              </Button>
            </Link>
            <Link href="/predictions">
              <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg px-8">
                {t("AI Predictions Lo →", "Get AI Predictions →")}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="text-center">
            <CardContent className="pt-6">
              <Users className="h-8 w-8 mx-auto text-primary mb-2" />
              <div className="text-3xl font-bold">15,247</div>
              <div className="text-sm text-muted-foreground">{t("Total Users", "Total Users")}</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <Star className="h-8 w-8 mx-auto text-primary mb-2" />
              <div className="text-3xl font-bold">5,183</div>
              <div className="text-sm text-muted-foreground">{t("Active Subscribers", "Active Subscribers")}</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <TrendingUp className="h-8 w-8 mx-auto text-primary mb-2" />
              <div className="text-3xl font-bold">1,264</div>
              <div className="text-sm text-muted-foreground">{t("AI Predictions", "AI Predictions")}</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <Target className="h-8 w-8 mx-auto text-primary mb-2" />
              <div className="text-3xl font-bold">8,942</div>
              <div className="text-sm text-muted-foreground">{t("Verified Results", "Verified Results")}</div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t("Why Choose Teer Khela AI?", "Why Choose Teer Khela AI?")}
            <br />
            <span className="text-primary">{t("क्यों चुनें तीर खेला AI?", "")}</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <Card className="border-primary/20 hover:border-primary transition-colors">
            <CardContent className="pt-6">
              <Zap className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">{t("AI-Powered Predictions", "AI-Powered Predictions")}</h3>
              <p className="text-muted-foreground">
                {t(
                  "Advanced AI algorithms historical data analyze karte hain aur accurate predictions dete hain Bhutan, Shillong, Khanapara, aur Juwai Teer ke liye.",
                  "Advanced AI algorithms analyze historical data to provide accurate predictions for Bhutan, Shillong, Khanapara, and Juwai Teer."
                )}
              </p>
            </CardContent>
          </Card>

          <Card className="border-primary/20 hover:border-primary transition-colors">
            <CardContent className="pt-6">
              <Shield className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">{t("Dream Interpretation", "Dream Interpretation")}</h3>
              <p className="text-muted-foreground">
                {t(
                  "110+ dream symbols ka database AI-powered interpretation ke saath. Apne sapno ko lucky numbers mein convert karo.",
                  "110+ dream symbols database with AI-powered interpretation. Convert your dreams into lucky numbers."
                )}
              </p>
            </CardContent>
          </Card>

          <Card className="border-primary/20 hover:border-primary transition-colors">
            <CardContent className="pt-6">
              <TrendingUp className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">{t("Formula Calculator", "Formula Calculator")}</h3>
              <p className="text-muted-foreground">
                {t(
                  "Past results par based mathematical formulas. Direct, House, aur Ending numbers hamare AI ke saath calculate karo.",
                  "Mathematical formulas based on past results. Calculate Direct, House, and Ending numbers with our AI."
                )}
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Star className="h-6 w-6 text-primary fill-primary" />
            <h2 className="text-3xl md:text-4xl font-bold ml-2">
              {t("Real Users Ka Review", "Real User Reviews")}
            </h2>
          </div>
          <p className="text-muted-foreground">
            {t("Dekho kya keh rahe hain log jo already use kar rahe hain!", "See what people are saying who are already using it!")}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <Card className="gradient-card">
            <CardContent className="pt-6">
              <div className="flex mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-primary fill-primary" />
                ))}
                <span className="ml-2 text-sm font-semibold">4.7</span>
                <span className="ml-2 px-2 py-0.5 bg-primary text-primary-foreground text-xs rounded-full">NEW</span>
              </div>
              <p className="text-sm text-muted-foreground mb-1">{t("2 hours ago", "2 hours ago")}</p>
              <p className="italic">{t('"subscription loi bohot val lagise bro..AI predictions ekdom accurate!"', '"subscription taken, very good bro..AI predictions are very accurate!"')}</p>
            </CardContent>
          </Card>

          <Card className="gradient-card">
            <CardContent className="pt-6">
              <div className="flex mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-primary fill-primary" />
                ))}
                <span className="ml-2 text-sm font-semibold">4.8</span>
              </div>
              <p className="text-sm text-muted-foreground mb-1">{t("1 week ago", "1 week ago")}</p>
              <p className="italic">{t('"pehle to bharosa nhi tha but 3 din ka plan liya aur kafi accurate numbers mile!"', '"didn\'t trust at first but took 3 day plan and got very accurate numbers!"')}</p>
            </CardContent>
          </Card>

          <Card className="gradient-card">
            <CardContent className="pt-6">
              <div className="flex mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-primary fill-primary" />
                ))}
                <span className="ml-2 text-sm font-semibold">4.8</span>
              </div>
              <p className="text-sm text-muted-foreground mb-1">{t("5 days ago", "5 days ago")}</p>
              <p className="italic">{t('"subscription liya tha sahi decision tha, AI se predictions bahut help karta hai!"', '"took subscription, right decision, AI predictions help a lot!"')}</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-12 md:py-20">
        <Card className="gradient-primary text-primary-foreground text-center">
          <CardContent className="pt-12 pb-12 space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">
              {t("Ready to Win Big with AI?", "Ready to Win Big with AI?")}
              <br />
              {t("AI के साथ बड़ा जीतने के लिए तैयार हैं?", "")}
            </h2>
            <p className="text-lg max-w-2xl mx-auto opacity-90">
              {t(
                "Join 10,000+ players trusting our AI predictions. Get started for free today!",
                "Join 10,000+ players trusting our AI predictions. Get started for free today!"
              )}
            </p>
            <Link href="/register">
              <Button size="lg" variant="secondary" className="text-lg px-8">
                ✨ {t("Free Sign Up Karo - Start Winning!", "Free Sign Up - Start Winning!")}
              </Button>
            </Link>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t mt-12">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-sm text-muted-foreground">
            <p>&copy; 2025 {t("Teer Khela with AI. All rights reserved.", "Teer Khela with AI. All rights reserved.")}</p>
            <p className="mt-2">{t("AI-powered predictions for Bhutan, Shillong, Khanapara, and Juwai Teer", "AI-powered predictions for Bhutan, Shillong, Khanapara, and Juwai Teer")}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
