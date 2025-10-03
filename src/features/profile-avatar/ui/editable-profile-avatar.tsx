"use client";

import * as yup from "yup";
import { Form, FormField, FormLabel } from "@/shared/components/ui/form";
import { ProfileAvatarProps } from "../types";
import { useForm } from "react-hook-form";
import { Input } from "@/shared/components/ui/input";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/shared/components/ui/avatar";
import { Upload, X } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { useEffect, useTransition } from "react";
import { cn } from "@/shared/lib/utils";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { uploadAvatarSchema } from "../validation/upload-avatar.schema";
import { toBase64 } from "../lib/utils";
import { yupResolver } from "@hookform/resolvers/yup";
import { uploadAvatar } from "../mutations/upload-avatar";
import { deleteAvatar } from "../mutations/delete-avatar";

export const EditableProfileAvatar: React.FC<ProfileAvatarProps> = ({
  userId,
  avatarUrl,
  email,
}) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const form = useForm<yup.InferType<typeof uploadAvatarSchema>>({
    resolver: yupResolver(uploadAvatarSchema),
    defaultValues: {
      userId,
    },
  });
  const {
    formState: { errors },
  } = form;

  const onSubmit = ({
    userId, avatar,
  }: yup.InferType<typeof uploadAvatarSchema>) => {
    startTransition(async () => {
      const base64 = await toBase64(avatar);
      const promise = uploadAvatar({
        userId: userId,
        size: avatar.size,
        type: avatar.type,
        base64,
      });

      toast.promise(promise, {
        success: "Avatar was uploaded",
        error: "Something went wrong",
        loading: "Loading...",
      });

      router.refresh();
    });
  };

  const onDeleteAvatar = () => {
    startTransition(async () => {
      const promise = deleteAvatar({ userId });

      toast.promise(promise, {
        success: "Avatar was removed",
        error: "Something went wrong",
        loading: "Loading...",
      });
      router.refresh();
    });
  };

  useEffect(() => {
    if (errors.avatar?.message) {
      toast.error(errors.avatar?.message);
    }
  }, [errors]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormLabel htmlFor="avatar-input" className="relative w-min group">
          <Avatar className={cn("w-20 h-20", isPending && "opacity-50")}>
            <AvatarImage src={avatarUrl ?? undefined} />
            <AvatarFallback>{email[0]}</AvatarFallback>
          </Avatar>
          <div className="absolute w-full h-full top-0 left-0 rounded-full flex items-center justify-center bg-black transition-opacity opacity-0 group-hover:opacity-40">
            <Upload className="w-8 h-8 text-muted-foreground" />
          </div>
          {avatarUrl && (
            <Button
              variant="destructive"
              size="icon"
              className="absolute -top-2 -right-2 rounded-full transition-opacity opacity-0 group-hover:opacity-100"
              onClick={onDeleteAvatar}
              disabled={isPending}
              data-testid="delete-avatar"
            >
              <X className="w-4 h-4" />
            </Button>
          )}
          <FormField
            control={form.control}
            name="avatar"
            render={({ field: { ref, name, onBlur, onChange } }) => (
              <Input
                type="file"
                ref={ref}
                accept="image/*"
                name={name}
                onBlur={onBlur}
                id="avatar-input"
                disabled={isPending}
                hidden
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  onChange(file ? file : null);
                  form.handleSubmit(onSubmit)();
                }}
                data-testid="upload-avatar"
              />
            )}
          />
          <FormField
            control={form.control}
            name="userId"
            render={({ field }) => <Input {...field} hidden />}
          />
        </FormLabel>
      </form>
    </Form>
  );
};
