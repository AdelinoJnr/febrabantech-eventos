import { useAppCompany } from "@/app/AppCompanyProvider";

export function useTranslation() {
  const { lang } = useAppCompany();

  const translate = (translateBr: string, translateEn: string): string => {
    console.log(translateBr, translateEn);
    if (translateBr === "às" && lang !== "br") return "to";
    if (!translateEn || translateEn.trim() === "") return translateBr;
    return lang === "br" ? translateBr : translateEn;
  };

  return { translate };
}