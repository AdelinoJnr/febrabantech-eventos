import type { IDataHeader, INavbar } from "./appConfig";
import type { IThemas } from "./themas";

export type Language = "br" | "en";

export interface IAppCompanyContext {
  themas: IThemas | null;
  dataHeader: IDataHeader | null;
  loading: boolean;
  lang: Language;
  navbar: INavbar[];
  setLang: (lang: Language) => void;
}