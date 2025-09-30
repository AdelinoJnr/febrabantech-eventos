import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { appConfig } from "@/services/event-extension.service";
import type { IDataHeader, IAppConfig, INavbar, IDataFooter, IDataPatrocinadores } from "@/@types/appConfig";
import type { IThemas } from "@/@types/themas";
import type { IAppCompanyContext, Language, Theme } from "@/@types/appCompanyContext";
import { environment } from "@/environments/environment";
import { orderNavBar } from "@/utils/orderNavBar";

const AppCompanyContext = createContext<IAppCompanyContext>({
  eventId: '',
  themas: null,
  dataHeader: null,
  loading: true,
  lang: 'br',
  navbar: [],
  themeMode: 'dark',
  toggleTheme: () => {},
  setLang: () => {},
  dataFooter: null,
});

export default function AppCompanyProvider({ children }: { children: React.ReactNode }) {
  const [eventId, setEventId] = useState('');
  const [themas, setThemas] = useState<IThemas | null>(null);
  const [navbar, setNavbar] = useState<INavbar[] | []>([]);
  const [dataHeader, setDataHeader] = useState<IDataHeader | null>(null);
  const [dataFooter, setDataFooter] = useState<IDataFooter | null>(null);
  const [lang, setLang] = useState<Language>("br");
  const [themeMode, setThemeMode] = useState<Theme>("dark");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppCompany = async () => {
      try {
        const result = await appConfig(environment.FRIENDLY_URL_EVENT);
        setEventId(result.id);
        formatData(result);
      } catch (err) {
        console.error("Erro ao buscar app-company:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAppCompany();
  }, []);

  useEffect(() => {
    document.documentElement.classList.remove("dark", "light");
    document.documentElement.classList.add(themeMode);
  }, [themeMode]);
  
  const toggleTheme = () => {
    setThemeMode((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const formatData = (data: IAppConfig | null) => {
    if (data) {
      const dataThemas: IThemas = {
        corPrincipal: data?.main_color || "#000",
        corSecundaria: data?.secondary_color || "#fff",
        corFundo: data?.background_color || "#f0f0f0",
        corMenu: data?.background_color_menu || "#FFF",
        corContadorCronometro: data?.timer_color_count,
        corCronometroPrincipal: data?.timer_main_background_color || "#ff0000",
        corCronometroSecundaria: data?.timer_secondary_background_color || "#00ff00",
        menu_color: data?.menu_color || "#333",
      };

      const header: IDataHeader = {
        button_ticket: data?.button_ticket,
        button_ticket_en: data?.button_ticket_en,
        is_language_display: data?.is_language_display,
        manager_ticket: data?.manager_ticket,
        ticket_closed: data?.ticket_closed,
        ticket_open: data?.ticket_open,
        logo: data?.logo,
        privacy_term: data?.privacy_term,
        use_term: data?.use_term,
        privacy_term_en: data?.privacy_term_en,
        use_term_en: data?.use_term_en,
        contact_us: data?.contact_us,
        has_countdown: data?.has_countdown,
        has_landing_page: data?.has_landing_page,
        is_show_subscribe : String(data?.is_show_subscribe) === "0" ? false : true,
        title_link_question: data?.title_link_question || '',
        description_question: data?.description_question || '',
        title_link_question_en: data?.title_link_question_en || '',
        description_question_en: data?.description_question_en || '',
        button_background_color: data?.button_background_color || '',
        button_text_color: data?.button_text_color || '',
        headingEvent: data?.heading,
        description_about: data?.description_about || '',
      };

      const footer: IDataFooter = {
        emailImprensa: data?.emailImprensa,
      };

      const menu: INavbar[] = orderNavBar(Object.values(data?.menu));

      setNavbar(menu);
      setDataHeader(header);
      setDataFooter(footer);
      setThemas(dataThemas);
    }
  }

  const contextValue = useMemo(() => ({
    eventId,
    themas,
    dataHeader,
    loading,
    lang,
    navbar,
    setLang,
    themeMode,
    toggleTheme,
    dataFooter,
  }), [
    eventId,
    themas,
    dataHeader,
    loading,
    lang,
    navbar,
    setLang,
    themeMode,
    toggleTheme,
    dataFooter,
  ]);

  return (
    <AppCompanyContext.Provider value={contextValue}>
      {children}
    </AppCompanyContext.Provider>
  );
}

export const useAppCompany = () => useContext(AppCompanyContext);
