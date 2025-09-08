import { waitFor, screen } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import Sobre from "@/routes/sobre/Sobre";
import { renderWithProviders } from "@/utils/renderWithProviders";
import * as service from '@/services/event-extension.service';
import { vi } from 'vitest';

describe("Página Sobre", () => {
  beforeEach(() => {
    vi.spyOn(service, "getPageSobre").mockResolvedValue({
      title_about: "Título teste",
      title_about_translated: "Title test",
      description_about: "Descrição teste",
      description_about_translated: "Description test",
      img_about: "imagem.png",
    });
  });

  it("abre a página e mostra o loading inicialmente", async () => {
    renderWithProviders(<Sobre />);
    const loading = screen.getByText(/loading/i);
    expect(loading).toBeInTheDocument();
  });

  it("carrega os dados do evento e exibe o conteúdo", async () => {
    renderWithProviders(<Sobre />);

    await waitFor(() => {
      expect(screen.getByText("Título teste")).toBeInTheDocument();
      expect(screen.getByText("Descrição teste")).toBeInTheDocument();
    });
  });

  it("exibe a imagem sobre do evento", async () => {
    renderWithProviders(<Sobre />);
    
    const img = await screen.findByAltText(/Imagem sobre evento/i);
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", "imagem.png");
  });
});
