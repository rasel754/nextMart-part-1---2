
"use client";
import Logo from "@/app/assets/svgs/Logo";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import React from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { registrationSchema } from "./registerValidation";
import { registerUser } from "@/services/AuthService";
import { toast } from "sonner";

const RegisterForm = () => {
  const form = useForm({ resolver: zodResolver(registrationSchema) });

  const {
    formState: { isSubmitting },
  } = form;

  const password = form.watch("password");
  const passwordConfirm = form.watch("passwordConfirm");

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const res = await registerUser(data);
      if (res?.success) {
        toast.success(res?.message);
      } else {
        toast.error(res?.message);
      }
    } catch (error: any) {
      console.log(error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="max-w-md w-full rounded-2xl p-6 shadow-md border bg-[oklch(var(--card))] border-[oklch(var(--border))] text-[oklch(var(--foreground))]">
      <div className="flex items-center space-x-4 mb-6">
        <Logo />
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Create an account</h1>
          <p className="text-sm text-[oklch(var(--muted-foreground))]">Join us today and start your journey!</p>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your name..."
                    {...field}
                    value={field.value || ""}
                    className="bg-[oklch(var(--input))] text-[oklch(var(--foreground))]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your email..."
                    type="email"
                    {...field}
                    value={field.value || ""}
                    className="bg-[oklch(var(--input))] text-[oklch(var(--foreground))]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your password..."
                    type="password"
                    {...field}
                    value={field.value || ""}
                    className="bg-[oklch(var(--input))] text-[oklch(var(--foreground))]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="passwordConfirm"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Retype your password..."
                    type="password"
                    {...field}
                    value={field.value || ""}
                    className="bg-[oklch(var(--input))] text-[oklch(var(--foreground))]"
                  />
                </FormControl>
                {passwordConfirm && password !== passwordConfirm ? (
                  <FormMessage>Password does not match</FormMessage>
                ) : (
                  <FormMessage />
                )}
              </FormItem>
            )}
          />

          <Button
            disabled={!!passwordConfirm && password !== passwordConfirm}
            type="submit"
            className="w-full mt-2 bg-[oklch(var(--primary))] text-[oklch(var(--primary-foreground))] hover:opacity-90"
          >
            {isSubmitting ? "Registering..." : "Register"}
          </Button>
        </form>
      </Form>

      <p className="text-sm text-center mt-4 text-[oklch(var(--muted-foreground))]">
        Already have an account?{" "}
        <Link href="/login" className="text-[oklch(var(--primary))] font-medium hover:underline">
          Login
        </Link>
      </p>
    </div>
  );
};

export default RegisterForm;
