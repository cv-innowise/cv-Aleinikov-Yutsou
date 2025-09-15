import { cn } from "@/shared/lib/utils";
import { Input } from "./input";
import { Eye } from "lucide-react";
import { EyeOff } from "lucide-react";
import React, { useState } from "react";

export const PasswordField = ({ placeholder, ...props }: React.ComponentProps<"input">) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="relative">
      <Input className={cn("pr-[2.5rem]")} {...props} placeholder={placeholder} type={showPassword ? "text" : "password"} />
      <button aria-label={showPassword ? "Hide password" : "Show password"} type="button" onClick={togglePasswordVisibility} className={cn("absolute right-3 top-1/2 -translate-y-1/2 text-sm", "transition-colors duration-300 text-muted-foreground hover:text-foreground opacity-80")}>
        {showPassword ? <EyeOff /> : <Eye />}
      </button>
    </div>
  );
};
