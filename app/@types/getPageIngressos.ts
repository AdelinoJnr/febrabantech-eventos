export interface IGetPageIngressos {
    tickets: Tickets[];
    title_link_question: string;
    title_link_question_en: string;
    description_question: string;
    description_question_en: string;
    ticket_link_ind: string;
}

export interface Tickets {
    includes: string;
    includes_en: string;
    title_ticket_dy: string;
    title_ticket_dy_en: string;
    value_ticket_dy: string;
}