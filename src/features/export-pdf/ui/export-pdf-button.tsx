import { Button } from "@/shared/components/ui/button";

interface ExportPdfButtonProps<T extends object> {
  data?: T;
  children: React.ReactNode;
}

export const ExportPdfButton = <T extends object>({ data, children }: ExportPdfButtonProps<T>) => {
  return <Button>{children}</Button>;
};
