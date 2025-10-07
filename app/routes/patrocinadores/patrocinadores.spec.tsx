import { waitFor, screen, act, waitForElementToBeRemoved } from '@testing-library/react';
import Patrocinadores from './Patrocinadores';
import { renderWithProviders } from "@/utils/renderWithProviders";
import * as service from '@/services/event-extension.service';
import { vi } from 'vitest';

vi.mock("@/services/patrocinadores");

describe("Página Patrocinadores", () => {
  beforeEach(() => {
    vi.resetAllMocks();

    vi.spyOn(service, "getPagePatrocinadores").mockResolvedValue({
      background_img: "imagem.png",
      background_img_mobile: "imagem-mobile.png",
      background_img_tablet: "imagem-tablet.png",
      sponsor_image_one: "imagem-fallback.png",
    });
  });

  it("mostra o loading inicialmente", () => {
    renderWithProviders(<Patrocinadores />);
    expect(screen.getByTestId("overlay-loading")).toBeInTheDocument();
  });

  it("exibe a imagem depois que os dados são carregados", async () => {
    renderWithProviders(<Patrocinadores />);

    await waitFor(() => {
      const img = screen.getByAltText("Patrocinador evento");
      expect(img).toBeInTheDocument();
      expect(img).toHaveAttribute("src", "imagem.png");
    });
  });

  it("usa a imagem de fallback se não houver background_img", async () => {
    (service.getPagePatrocinadores as vi.Mock).mockResolvedValueOnce({
      background_img: "",
      background_img_mobile: "",
      background_img_tablet: "",
      sponsor_image_one: "fallback.png",
    });

    renderWithProviders(<Patrocinadores />);

    await waitFor(() => {
      expect(screen.getByAltText("Patrocinador evento")).toHaveAttribute("src", "fallback.png");
    });
  });

});
