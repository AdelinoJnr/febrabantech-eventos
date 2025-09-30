export type IGetPagePalestrantes = {
  id: string;
  mini_bio: string;
  mini_bio_en: string;
  image_url: string;
  pseudonym: string;
  speaker_name: string;
  agenda: { talk_start_date: Date }[];
}