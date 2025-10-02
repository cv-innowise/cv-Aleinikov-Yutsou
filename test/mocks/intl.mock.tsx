import { vi } from "vitest";
import React from "react";
import { NextIntlClientProvider } from "next-intl";
import messages from "@/i18n/messages/en.json";

vi.mock("@testing-library/react", async () => {
  const actual = await vi.importActual<typeof import("@testing-library/react")>("@testing-library/react");

  const Wrapper: React.FC<React.PropsWithChildren> = ({ children }) => (
    <NextIntlClientProvider locale="en" messages={messages}>
      {children}
    </NextIntlClientProvider>
  );

  return {
    ...actual,
    render: (ui: React.ReactElement, options?: Parameters<typeof actual.render>[1]) => actual.render(ui, { wrapper: Wrapper, ...options }),
  };
});
