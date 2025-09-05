import { render } from "@testing-library/react";
import type { ReactNode } from "react";
import type { RenderOptions } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import AppCompanyProvider from "@/providers/AppCompanyProvider";

export function renderWithProviders(
  ui: React.ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) {
  const Wrapper = ({ children }: { children: ReactNode }) => (
    <AppCompanyProvider>
      <MemoryRouter>{children}</MemoryRouter>
    </AppCompanyProvider>
  );

  return render(ui, { wrapper: Wrapper, ...options });
}
