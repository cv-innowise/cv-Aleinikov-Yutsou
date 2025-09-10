import { cn } from "@/shared/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Header = () => {
  const pathname = usePathname();

  return (
    <header className={cn("w-full flex justify-center items-center px-4")}>
      <nav className="flex">
        <Link href="/login" className={cn("py-3 px-2 rounded-none transition-all duration-300", pathname === "/login" ? "border-b-2 [color:var(--primary)] [border-bottom-color:var(--primary)]" : "border-b-2 border-transparent")}>
          Log in
        </Link>

        <Link href="/signup" className={cn("py-3 px-2 rounded-none transition-all duration-300", pathname === "/signup" ? "border-b-2 [color:var(--primary)] [border-bottom-color:var(--primary)]" : "border-b-2 border-transparent")}>
          Sign up
        </Link>
      </nav>
    </header>
  );
};
