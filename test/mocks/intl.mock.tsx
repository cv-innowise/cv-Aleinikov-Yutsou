import React from "react";
import { vi } from "vitest";

vi.mock("next-intl", async () => {
  const actual = await vi.importActual<any>("next-intl");
  return {
    ...actual,
    useTranslations: (ns?: string) => (key: string) => ns ? `${ns}.${key}` : key,
    useLocale: () => "en",
    NextIntlClientProvider: ({ children }: any) => <>{children}</>,
  };
});
