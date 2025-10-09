import { whatTips } from "./getPageDicas";

export type CardPalestrantesProps = {
  id: string;
  image_url: string;
  speaker_name: string;
  pseudonym: string
  mini_bio: string;
  mini_bio_en: string;
  handleClick: (id: string) => void;
};

export type CardIngressosProps = {
  includes: string;
  includes_en: string;
  title_ticket_dy: string;
  title_ticket_dy_en: string;
  value_ticket_dy: string;
}

interface ModalButton {
  label: string;
  onClick?: () => void;
  href?: string;
}

export interface ModalBaseProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  content: string | React.ReactNode;
  isHtml?: boolean;
  button?: ModalButton;
  img?: string;
}

export interface CardDicasProps {
  icon: keyof typeof whatTips;
  titleCard: string;
  image_url: string;
  content: string;
}

export interface CardNoticiasProps {
  img: string;
  title: string;
  description: string;
  typeNew: number;
  friendly_url: string;
}