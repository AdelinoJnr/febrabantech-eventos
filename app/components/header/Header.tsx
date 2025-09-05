import React, { useEffect } from 'react';

import { useAppCompany } from "@/providers/AppCompanyProvider";
import styles from "./Header.module.scss";
import OverlayLoading from '@/components/overlayLoading/OverlayLoading';

export default function Header() {
  const { loading, themas, dataHeader, setLang } = useAppCompany();

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLang(e.target.value as 'br' | 'en');
  };

  useEffect(() => {
    if (themas) {
      console.log("🎨 Temas carregados:", themas);
    }
  }, [themas]);

  if (loading || !dataHeader) {
    return <OverlayLoading />
  }

  const {
    logo,
    is_language_display,
    button_ticket,
    button_ticket_en,
    ticket_open,
    ticket_closed,
    manager_ticket,
    is_show_subscribe,
    button_background_color,
    button_text_color,
  } = dataHeader;

  return (
    <header>
      <div className={styles.backFebrabantech}>
        <a href="https://febrabantech.febraban.org.br">Ir para a plataforma FEBRABAN TECH</a>
      </div>

      <div
        id="cabecalho"
        className={`navbar navbar-expand-sm ${styles.header}`}
        style={{ backgroundColor: themas?.corPrincipal }}
      >
        <div className='cursor-pointer'>
          <img
            src={logo}
            className="navbar-brand logoImg"
            alt="Logo do evento"
            width={253}
            height={80}
          />
        </div>

        <div className="collapse navbar-collapse d-flex justify-content-end">
          {/* Placeholder para busca */}
          <div>{/* <SearchHeaderEvent /> */}</div>

          {is_language_display && (
            <div style={{ paddingRight: 16 }}>
              <div style={{ textAlign: "right", fontSize: 12, marginBottom: 3 }}>
                <label style={{ color: "#B3B3B3" }}>Idioma</label>
              </div>
              <select onChange={handleLanguageChange}
                style={{
                  background: "#4D4D4D",
                  padding: "5px 4px",
                  borderRadius: 5,
                  width: "6rem",
                  color: "#B3B3B3",
                  fontWeight: 600,
                  fontSize: 12,
                }}
              >
                <option value="br">BR</option>
                <option value="en">EN</option>
              </select>
            </div>
          )}

          {/* Ticket aberto */}
          {ticket_open && is_show_subscribe && (
            <div>
              <button
                className="btninscreva"
                style={{
                  backgroundColor: button_background_color || "#ebe717",
                  color: button_text_color || "#000",
                }}
                onClick={() => console.log("Ir para inscrição")}
              >
                {button_ticket || button_ticket_en}
              </button>
              <a
                className="gerinscricao text-center"
                style={{ color: "#FFF" }}
                onClick={() => console.log("Compra individual")}
              >
                INCRIÇÃO
              </a>
            </div>
          )}

          {/* Ticket fechado */}
          {ticket_closed && is_show_subscribe && (
            <form>
              <button
                className="btninscreva"
                style={{
                  backgroundColor: button_background_color || "#4D4D4D",
                  color: button_text_color || "white",
                }}
                onClick={() => console.log("Inscrição fechada")}
              >
                {button_ticket || button_ticket_en}
              </button>
            </form>
          )}

          {/* Ticket manager */}
          {manager_ticket && is_show_subscribe && (
            <form>
              <button
                className="btninscreva"
                style={{
                  backgroundColor: button_background_color || "#ebe717",
                  color: button_text_color || "#000",
                }}
                onClick={() => console.log("Manager ticket")}
              >
                {button_ticket || button_ticket_en}
              </button>
            </form>
          )}
        </div>
      </div>
    </header>
  )
}
