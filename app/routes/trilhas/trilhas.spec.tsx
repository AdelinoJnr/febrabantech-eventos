import { act, screen, waitForElementToBeRemoved } from '@testing-library/react';
// import userEvent from "@testing-library/user-event";
import Trilhas from "@/routes/trilhas/Trilhas";
import { renderWithProviders } from "@/utils/renderWithProviders";
import * as service from '@/services/event-extension.service';
import { vi } from 'vitest';

describe("Página Trilha", () => {
  beforeEach(() => {
    vi.spyOn(service, "getPageTrilhas").mockImplementation(() =>
      Promise.resolve({
        description_trail: "Descrição teste",
        description_trail_translated: "Description test",
      })
    );
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("abre a página e mostra o loading inicialmente", async () => {
    renderWithProviders(<Trilhas />);

    const overlay = screen.getByTestId("overlay-loading");
    expect(overlay).toBeInTheDocument();
  });

  it("carrega os dados do evento e exibe o conteúdo", async () => {
    renderWithProviders(<Trilhas />);

    await screen.findByTestId("overlay-loading");

    await waitForElementToBeRemoved(() =>
      screen.queryByTestId("overlay-loading")
    );

    const descricao = await screen.findByText("Descrição teste");
    expect(descricao).toBeInTheDocument();
  });
});
