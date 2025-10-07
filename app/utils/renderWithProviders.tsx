import { render } from "@testing-library/react";
import type { ReactNode } from "react";
import type { RenderOptions } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import AppCompanyProvider from "@/providers/AppCompanyProvider";
import { CacheProvider } from "@/providers/CacheProvider";

export function renderWithProviders(
  ui: React.ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) {
  const Wrapper = ({ children }: { children: ReactNode }) => (
    <AppCompanyProvider>
      <CacheProvider>
        <MemoryRouter>{children}</MemoryRouter>
      </CacheProvider>
    </AppCompanyProvider>
  );

  return render(ui, { wrapper: Wrapper, ...options });
}
