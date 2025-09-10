import { cn } from "@/shared/lib/utils";
import { PropsWithChildren } from "react";

interface DeletableContentProps {
  className?: string;
}

export const DeletableContent: React.FC<
  PropsWithChildren<DeletableContentProps>
> = ({ className, children }) => {
  return <div className={cn(className)}>{children}</div>;
};
