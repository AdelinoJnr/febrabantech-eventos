export interface IGetPageDicas {
  color_banner_tip: string;
  dicas: Dicas[];
}

export interface Dicas {
  caption: string;
  caption_translated: string;
  have_image: string;
  icon: keyof typeof whatTips;
  image_url: string;
  tip_title: string;
  tip_title_translated: string;
  content: string;
  content_translated: string;
}

export const whatTips = {
  FaMapLocationDot: "Como Chegar?",
  FaBed: "Onde se hospedar?",
  FaNetworkWired: "Coworking Febraban",
  FaMicrophone: "Imprensa",
  FaParking: "Estacionamento",
  FaBriefcaseMedical: "Posto Médico",
  FaArchive: "Chapelaria",
  FaQuestionCircle: "Precisando de ajuda?",
  IoFastFood: "Alimentação",
  FaWifi: "Wi-fi",
};