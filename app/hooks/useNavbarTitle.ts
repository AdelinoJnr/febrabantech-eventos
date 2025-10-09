import { useAppCompany } from "@/providers/AppCompanyProvider";

export function useNavbarTitle(value: string) {
  const { dataEvent } = useAppCompany();
  const { menu } = dataEvent || {};

  const item = menu?.find((item) => item.value.toLowerCase() === value.toLowerCase());

  return {
    viewValue: item?.viewValue || "",
    seeEnglishValue: item?.seeEnglishValue || "",
  };
}