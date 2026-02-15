import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

export function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === "zh" ? "en" : "zh";
    i18n.changeLanguage(newLang);
    localStorage.setItem("oaim-language", newLang);
  };

  return (
    <Button
      size="icon"
      variant="ghost"
      onClick={toggleLanguage}
      data-testid="button-language-toggle"
    >
      <span className="text-xs font-semibold">
        {i18n.language === "zh" ? "EN" : "中"}
      </span>
    </Button>
  );
}
