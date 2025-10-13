import { LanguageSwitcher } from "@/features/language-switcher";
import { ThemeSwitcher } from "@/shared/components/theme-switcher";

export const metadata = {
  title: "Settings",
  description: "Manage your account, language, and theme preferences.",
  keywords: [
    "settings",
    "preferences",
    "account",
    "language",
    "theme",
    "user settings",
    "CV Platform",
  ],
};

const SettingsPage = () => {
  return (
    <div className="w-full space-y-4">
      <ThemeSwitcher />
      <LanguageSwitcher />
    </div>
  );
};

export default SettingsPage;
