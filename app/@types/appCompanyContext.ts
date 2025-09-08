import type { IDataFooter, IDataHeader, INavbar } from "./appConfig";
import type { IThemas } from "./themas";

export type Language = "br" | "en";
export type Theme = "light" | "dark";

export interface IAppCompanyContext {
  eventId: string;
  themas: IThemas | null;
  dataHeader: IDataHeader | null;
  loading: boolean;
  lang: Language;
  navbar: INavbar[];
  themeMode: Theme;
  toggleTheme: () => void;
  setLang: (lang: Language) => void;
  dataFooter: IDataFooter | null;
}