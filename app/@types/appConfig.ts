import { IThemas } from "./themas";

export interface IAppConfig {
  id: string;
  heading: string;
  city: string;
  main_color: string;
  secondary_color: string;
  background_color: string;
  background_color_menu: string;
  timer_color_count: string;
  timer_main_background_color: string;
  timer_secondary_background_color: string;
  menu_color: string;
  button_ticket: string;
  button_ticket_en: string;
  is_language_display: boolean;
  logo: string;
  manager_ticket: string;
  ticket_closed: string;
  ticket_open: string;
  ticket_link_manager: string;
  ticket_link_gp: string;
  ticket_link_ind: string;
  title_ticket: string;
  title_ticket_en: string;
  privacy_term: string;
  use_term: string;
  privacy_term_en: string;
  use_term_en: string;
  contact_us: string;
  has_countdown: boolean;
  has_landing_page: boolean;
  is_show_subscribe: boolean;
  title_link_question: string;
  description_question: string;
  title_link_question_en: string;
  description_question_en: string;
  button_background_color: string;
  button_text_color: string;
  headingEvent: string;
  menu: INavbar[];
  description_about: string;
  emailImprensa: string;
  background_img: string;
  background_img_mobile: string;
  background_img_tablet: string;
  sponsor_image_one: string;
  city_state: string;
  country: string;
  logradouro: string;
  number: string;
}

export interface IDataHeader {
  button_ticket: string;
  button_ticket_en: string;
  is_language_display: boolean;
  logo: string;
  manager_ticket: string;
  ticket_closed: string;
  ticket_open: string;
  privacy_term: string;
  use_term: string;
  privacy_term_en: string;
  use_term_en: string;
  contact_us: string;
  has_countdown: boolean;
  has_landing_page: boolean;
  is_show_subscribe: boolean | string;
  title_link_question: string;
  description_question: string;
  title_link_question_en: string;
  description_question_en: string;
  button_background_color: string;
  button_text_color: string;
  headingEvent: string;
  description_about: string;
}

export interface INavbar {
  seeEnglishValue: string;
  value: string;
  viewValue: string;
}

export interface IDataFooter {
  emailImprensa: string;
}

export interface IDataPatrocinadores {
  background_img: string;
  background_img_mobile: string;
  background_img_tablet: string;
  sponsor_image_one: string;
}

export interface IAddress {
  city: string;
  city_state: string;
  country: string;
  logradouro: string;
  number: string;
}

export interface IDataEvent {
  eventId: string;
  themas: IThemas;
  menu: INavbar[];
  header: IDataHeader;
  footer: IDataFooter;
  address: IAddress;
}