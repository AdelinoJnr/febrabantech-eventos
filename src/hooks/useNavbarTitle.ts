import { useAppCompany } from "@/app/AppCompanyProvider";

export function useNavbarTitle(value: string) {
  const { navbar } = useAppCompany();

  const item = navbar?.find((item) => item.value.toLowerCase() === value.toLowerCase());

  return {
    viewValue: (item?.viewValue)?.toLowerCase() || "",
    seeEnglishValue: (item?.seeEnglishValue)?.toLowerCase() || "",
  };
}