"use client";

import { useLanguage } from "@/lib/contexts/language-context";
import { Button } from "@/components/ui/button";
import { Languages } from "lucide-react";

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === "hinglish" ? "english" : "hinglish");
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLanguage}
      className="gap-2"
    >
      <Languages className="h-4 w-4" />
      <span className="hidden md:inline">
        {language === "hinglish" ? "EN" : "HI"}
      </span>
    </Button>
  );
}
