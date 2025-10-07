import { waitFor, screen, act, waitForElementToBeRemoved } from '@testing-library/react';
import Sobre from "@/routes/sobre/Sobre";
import { renderWithProviders } from "@/utils/renderWithProviders";
import * as service from '@/services/event-extension.service';
import { vi } from 'vitest';

describe("Página Sobre", () => {
  beforeEach(() => {
    vi.spyOn(service, "getPageSobre").mockImplementation(() =>
      Promise.resolve({
        title_about: "Título teste",
        title_about_translated: "Title test",
        description_about: "Descrição teste",
        description_about_translated: "Description test",
        img_about: "imagem.png",
      })
    );
  });

  it("abre a página e mostra o loading inicialmente", async () => {
    renderWithProviders(<Sobre />);

    const overlay = screen.getByTestId("overlay-loading");
    expect(overlay).toBeInTheDocument();
  });

  it("carrega os dados do evento e exibe o conteúdo", async () => {
    renderWithProviders(<Sobre />);

    await screen.findByTestId("overlay-loading");
    
    await waitForElementToBeRemoved(() =>
      screen.queryByTestId("overlay-loading")
    );

    const titulo = await screen.findByText("Título teste");
    const descricao = await screen.findByText("Descrição teste");

    expect(titulo).toBeInTheDocument();
    expect(descricao).toBeInTheDocument();
  });

  it("exibe a imagem sobre do evento", async () => {
    renderWithProviders(<Sobre />);

    await screen.findByTestId("overlay-loading");
    
    await waitForElementToBeRemoved(() =>
      screen.queryByTestId("overlay-loading")
    );

    const img = await screen.findByAltText(/Imagem sobre evento/i);
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", "imagem.png");
  });
});
