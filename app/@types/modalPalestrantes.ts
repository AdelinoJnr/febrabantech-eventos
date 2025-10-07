export type ModalPalestrantesProps = {
  isOpen: boolean;
  onClose: () => void;
  image_url: string;
  speaker_name: string;
  pseudonym: string;
  mini_bio: string;
  mini_bio_en: string;
  agenda: { talk_start_date: Date }[];
};