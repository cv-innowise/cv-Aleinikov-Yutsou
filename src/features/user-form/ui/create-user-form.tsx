import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/shared/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/components/ui/popover";
import { DialogClose, DialogTitle } from "@/shared/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/shared/components/ui/radio-group";
import { Input } from "@/shared/components/ui/input";
import { PasswordField } from "@/shared/components/ui/password-field";
import { createUserSchema } from "../validatiion/create-user.schema";
import { Button } from "@/shared/components/ui/button";
import { cn } from "@/shared/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import { CvItem } from "@/shared/graphql/cvs/cvs.types";
import { Department } from "@/shared/graphql/departments/departments.types";
import { Position } from "@/shared/graphql/positions/positions.types";
import { UserRole } from "@/shared/types/cv-graphql";
import { createUser } from "../mutations/create-user";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

interface CreateUserFormProps {
  freeCvs: CvItem[];
  departments: Department[];
  positions: Position[];
}

export const CreateUserForm: React.FC<CreateUserFormProps> = ({
  freeCvs,
  departments,
  positions,
}) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const t = useTranslations("user-form");
  const form = useForm<yup.InferType<typeof createUserSchema>>({
    resolver: yupResolver(createUserSchema),
    defaultValues: {
      cvsIds: [],
      role: UserRole.Employee,
    },
  });

  const onCvToggle = (cv: CvItem) => () => {
    const cvIds = form.getValues().cvsIds;
    if (cvIds.includes(cv.id)) {
      form.setValue(
        "cvsIds",
        cvIds.filter((cvId) => cvId !== cv.id)
      );
    } else {
      form.setValue("cvsIds", [...cvIds, cv.id]);
    }
  };

  const onSubmit = (formData: yup.InferType<typeof createUserSchema>) => {
    startTransition(async () => {
      const promise = createUser(formData);

      toast.promise(promise, {
        success: t("user-created"),
        error: t("error"),
        loading: t("loading"),
      });
      router.refresh();
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <DialogTitle>{t("create")}</DialogTitle>
        <FormField
          control={form.control}
          name="auth.email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("email")}</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder={t("email")}
                  {...field}
                  data-testid="user-email-input"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="auth.password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("password")}</FormLabel>
              <FormControl>
                <PasswordField
                  placeholder={t("password")}
                  {...field}
                  data-testid="user-password-input"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-col md:flex-row gap-x-4 gap-y-2 justify-between">
          <FormField
            control={form.control}
            name="profile.first_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("first-name")}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={t("first-name")}
                    {...field}
                    value={field.value || ""}
                    data-testid="user-first-name-input"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="profile.last_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("last-name")}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={t("last-name")}
                    {...field}
                    value={field.value || ""}
                    data-testid="user-last-name-input"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="cvsIds"
          render={({ field }) => {
            return (
              <FormItem className="flex flex-col">
                <FormLabel>{t("cvs-label")}</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn("w-[200px] justify-between")}
                        data-testid="select-cvs-button"
                      >
                        {t("cvs")}
                        <ChevronsUpDown className="opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandInput
                        placeholder={t("search-cvs")}
                        className="h-9"
                      />
                      <CommandList>
                        <CommandEmpty>{t("no-cvs")}</CommandEmpty>
                        <CommandGroup>
                          {freeCvs.map((cv) => (
                            <CommandItem
                              value={cv.id}
                              key={cv.id}
                              onSelect={onCvToggle(cv)}
                            >
                              {cv.name}
                              <Check
                                className={cn(
                                  "ml-auto",
                                  field.value.includes(cv.id)
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <div className="flex flex-col md:flex-row gap-x-4 gap-y-2 justify-between">
          <FormField
            control={form.control}
            name="departmentId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("department-label")}</FormLabel>
                <Select
                  onValueChange={(val) =>
                    field.onChange(val === "none" ? "" : val)
                  }
                  defaultValue={field.value || "none"}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue
                        placeholder={t("department")}
                        data-testid="select-department-value"
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="none">{t("no-department")}</SelectItem>
                    {departments.map((dep) => (
                      <SelectItem key={dep.id} value={dep.id}>
                        {dep.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="positionId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("position-label")}</FormLabel>
                <Select
                  onValueChange={(val) =>
                    field.onChange(val === "none" ? "" : val)
                  }
                  defaultValue={field.value || "none"}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue
                        placeholder={t("position")}
                        data-testid="select-position-value"
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="none">{t("no-position")}</SelectItem>
                    {positions.map((pos) => (
                      <SelectItem key={pos.id} value={pos.id}>
                        {pos.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("role-label")}</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-row gap-x-4"
                >
                  <FormItem className="flex items-center gap-3">
                    <FormControl>
                      <RadioGroupItem
                        value={UserRole.Employee}
                        data-testid="employee-radio-item"
                      />
                    </FormControl>
                    <FormLabel className="font-normal">
                      {t("role-employee")}
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center gap-3">
                    <FormControl>
                      <RadioGroupItem
                        value={UserRole.Admin}
                        data-testid="admin-radio-item"
                      />
                    </FormControl>
                    <FormLabel className="font-normal">
                      {t("role-admin")}
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="float-right space-x-4">
          <DialogClose asChild>
            <Button
              disabled={isPending}
              type="button"
              variant="outline"
              data-testid="cancel-button"
            >
              {t("cancel")}
            </Button>
          </DialogClose>
          <Button loading={isPending} type="submit" data-testid="submit-button">
            {t("confirm")}
          </Button>
        </div>
      </form>
    </Form>
  );
};
