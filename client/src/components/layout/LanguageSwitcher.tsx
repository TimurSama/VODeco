import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Globe } from "lucide-react";

const LanguageSwitcher = () => {
  const { i18n, t } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);

  // Обновляем состояние при изменении языка
  useEffect(() => {
    setCurrentLanguage(i18n.language);
  }, [i18n.language]);

  // Изменяем язык и сохраняем в localStorage
  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
    localStorage.setItem("language", language);
    setCurrentLanguage(language);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-full">
          <Globe className="h-4 w-4" />
          <span className="sr-only">{t("language.changeLanguage")}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          className={currentLanguage === "ru" ? "bg-muted" : ""}
          onClick={() => changeLanguage("ru")}
        >
          🇷🇺 {t("language.ru")}
        </DropdownMenuItem>
        <DropdownMenuItem
          className={currentLanguage === "en" ? "bg-muted" : ""}
          onClick={() => changeLanguage("en")}
        >
          🇬🇧 {t("language.en")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;