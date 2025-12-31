"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Target } from "lucide-react";
import { useLanguage } from "@/lib/contexts/language-context";
import { LanguageToggle } from "@/components/language/language-toggle";

export default function ResultsPage() {
  const { t } = useLanguage();

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
              <LanguageToggle />
              <Link href="/predictions">
                <Button variant="ghost" size="sm">{t("Predictions", "Predictions")}</Button>
              </Link>
              <Link href="/login">
                <Button variant="outline" size="sm">{t("Login", "Login")}</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl">{t("Latest Teer Results", "Latest Teer Results")}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              {t("Results page coming soon. Check back later!", "Results page coming soon. Check back later!")}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
