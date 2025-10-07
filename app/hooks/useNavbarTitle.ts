import { useAppCompany } from "@/providers/AppCompanyProvider";

export function useNavbarTitle(value: string) {
  const { navbar } = useAppCompany();

  const item = navbar?.find((item) => item.value.toLowerCase() === value.toLowerCase());

  return {
    viewValue: item?.viewValue || "",
    seeEnglishValue: item?.seeEnglishValue || "",
  };
}