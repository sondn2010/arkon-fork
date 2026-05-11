"use client";

import { useI18n } from "@/lib/i18n";
import { Button } from "@/components/ui/button";

export function LanguageSwitcher() {
  const { locale, setLocale } = useI18n();

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setLocale(locale === "vi" ? "en" : "vi")}
      className="text-xs"
    >
      {locale === "vi" ? "EN" : "VI"}
    </Button>
  );
}