import type { IDataEvent, IDataFooter, IDataHeader, INavbar } from "./appConfig";
import type { IThemas } from "./themas";

export type Language = "br" | "en";
export type Theme = "light" | "dark";

export type IAppCompanyContext = {
  loading: boolean;
  lang: Language;
  themeMode: Theme;
  toggleTheme: () => void;
  setLang: (lang: Language) => void;
  dataEvent: IDataEvent | null;
}