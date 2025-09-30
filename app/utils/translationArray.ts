import { useAppCompany } from "@/providers/AppCompanyProvider";

export function translationArray() {
  const { lang } = useAppCompany();

  const translateArray = (
    translateBr: string | null,
    translateEn: string | null
  ): string[] => {
    const raw = lang === "br" ? translateBr : translateEn;
    if (!raw) return [];

    try {
      const parsed: { value_includes: string }[] = JSON.parse(raw);

      return parsed.map((item) => item.value_includes.trim()).filter(Boolean);
    } catch (err) {
      return [];
    }
  };

  return { translateArray };
}