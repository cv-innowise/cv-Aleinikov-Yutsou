import { LanguageSwitcher } from "@/features/language-switcher";
import { ThemeSwitcher } from "@/shared/components/theme-switcher";

const SettingsPage = () => {
  return (
    <div className="w-full space-y-4">
      <ThemeSwitcher />
      <LanguageSwitcher />
    </div>
  );
};

export default SettingsPage;
