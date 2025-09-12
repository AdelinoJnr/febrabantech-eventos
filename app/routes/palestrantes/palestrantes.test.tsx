import { fireEvent, screen } from '@testing-library/react';
import Palestrantes from "@/routes/palestrantes/Palestrantes";
import { renderWithProviders } from "@/utils/renderWithProviders";
import * as service from '@/services/event-extension.service';
import { vi } from 'vitest';
import CardPalestrantes from '@/components/cards/cardPalestrantes/CardPalestrantes';

const mockPalestrantes = [
  {
    id: "5f349f20-c105-4b7d-9f9e-c059c051e24e",
    speaker_name: "João Silva",
    pseudonym: "JS",
    mini_bio: "Especialista em tecnologia e inovação.",
    mini_bio_en: "Technology and innovation specialist.",
    image_url: "https://via.placeholder.com/150",
    agenda: [
      { talk_start_date: new Date("2025-06-10T10:00:00") },
      { talk_start_date: new Date("2025-06-12T14:00:00") },
      { talk_start_date: new Date("2025-06-10T11:00:00") },
    ],
  },
  {
    id: "fc7467c3-d2e8-4891-aeee-28737b11eee0",
    speaker_name: "Maria Souza",
    pseudonym: "MS",
    mini_bio: "Palestrante em design e UX.",
    mini_bio_en: "Speaker in design and UX.",
    image_url: "https://via.placeholder.com/150",
    agenda: [
      { talk_start_date: new Date("2025-06-11T11:30:00") },
    ],
  },
  {
    id: "8962d9bc-fe85-423a-af9d-751bb4e155cb",
    speaker_name: "Carlos Pereira",
    pseudonym: "CP",
    mini_bio: "Especialista em marketing digital.",
    mini_bio_en: "Digital marketing specialist.",
    image_url: "https://via.placeholder.com/150",
    agenda: [
      { talk_start_date: new Date("2025-06-12T16:00:00") },
      { talk_start_date: new Date("2025-06-13T09:00:00") },
    ],
  },
];

export interface IGetPagePalestrantes {
  id: string;
  mini_bio: string;
  mini_bio_en: string;
  image_url: string;
  pseudonym: string;
  speaker_name: string;
  agenda: { talk_start_date: Date }[];
}

describe("Página Palestrantes", () => {
  beforeEach(() => {
    vi.spyOn(service, "getPagePalestrantes").mockResolvedValue(mockPalestrantes);
  });

  it("abre a página e mostra o loading inicialmente", async () => {
    renderWithProviders(<Palestrantes />);

    const overlay = screen.getByTestId("overlay-loading");
    expect(overlay).toBeInTheDocument();
  });

  it("renderiza os cards de palestrantes", async () => {
    renderWithProviders(<Palestrantes />);

    for (const palestrante of mockPalestrantes) {
      const nomePalestrante = await screen.findByText(palestrante.pseudonym || palestrante.speaker_name);
      const biografia = await screen.findByText(palestrante.pseudonym || palestrante.speaker_name);

      expect(nomePalestrante).toBeInTheDocument();
      expect(biografia).toBeInTheDocument();
    }
  });

  it("mostra fallback quando não há pseudonym, mini_bio ou image_url", async () => {
    const mock = [
      { ...mockPalestrantes[0], pseudonym: "", mini_bio: "", image_url: "" }
    ];

    vi.spyOn(service, "getPagePalestrantes").mockResolvedValue(mock);

    renderWithProviders(<Palestrantes />);

    const cardName = await screen.findByText(mock[0].speaker_name);
    expect(cardName).toBeInTheDocument();

    const cardBio = await screen.findByText("sem biografia");
    expect(cardBio).toBeInTheDocument();

    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("src", "./app/assets/images/user_placeholder.png");
  });

  it("renderiza exatamente 3 cards de palestrantes", async () => {
    renderWithProviders(<Palestrantes />);

    const cards = await screen.findAllByText(/JS|MS|CP/);
    expect(cards.length).toBe(3);
  });

  it("abre o modal ao clicar no card", async () => {
    renderWithProviders(<Palestrantes />);

    const firstCard = await screen.findByText(mockPalestrantes[0].pseudonym || mockPalestrantes[0].speaker_name);
    fireEvent.click(firstCard);

    const miniBioModal = screen.getByTestId("mini-bio-palestrante-modal");

    expect(miniBioModal).toBeInTheDocument();
  });

  it("fecha o modal ao clicar no botão de fechar", async () => {
    renderWithProviders(<Palestrantes />);

    
    const firstCard = await screen.findByText(mockPalestrantes[0].pseudonym || mockPalestrantes[0].speaker_name);
    fireEvent.click(firstCard);
    
    const miniBioModal = screen.getByTestId("mini-bio-palestrante-modal");

    const closeButton = screen.getByTestId("close-modal");
    fireEvent.click(closeButton);

    expect(miniBioModal).not.toBeInTheDocument();
  });

  it("exibe corretamente os dias da agenda, sem duplicatas", async () => {
    renderWithProviders(<Palestrantes />);

    const firstCard = await screen.findByText(mockPalestrantes[0].pseudonym || mockPalestrantes[0].speaker_name);
    fireEvent.click(firstCard);

    const agendaEl = await screen.findByTestId("palestrante-agenda");
    expect(agendaEl).toHaveTextContent("📅 10/06; 12/06");
  });
});
