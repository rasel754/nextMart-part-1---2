"use client";
import ReCAPTCHA from "react-google-recaptcha";
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
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginUser, reCaptchaTokenVerification } from "@/services/AuthService";
import { toast } from "sonner";
import { loginSchema } from "./loginValidation";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useUser } from "@/context/userContexts";
import Logo from "@/app/assets/svgs/Logo";

export default function LoginForm() {
  const form = useForm({ resolver: zodResolver(loginSchema) });
  const { setIsLoading } = useUser();

  const [reCaptchaStatus, setReCaptchaStatus] = useState(false);


  const searchParams = useSearchParams();

  const redirect = searchParams.get("redirectPath");
  const router = useRouter();

  const {
    formState: { isSubmitting },
  } = form;

  const handleReCaptcha = async (value: string | null) => {
    try {
      const res = await reCaptchaTokenVerification(value!);
      if (res?.success) {
        setReCaptchaStatus(true);
      }
    } catch (err: any) {
      console.error(err);
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const res = await loginUser(data);

      setIsLoading(true);

      if (res?.success) {
        toast.success(res?.message);

        router.push(redirect || "/");
        
      } 
      else {
        toast.error(res?.message);
      }
    }
    
    catch (err: any) {
      console.error(err);

    }
  };

  return (
    <div className="border border-[oklch(var(--border))] rounded-2xl bg-[oklch(var(--background))] text-[oklch(var(--foreground))] shadow-md p-6 w-full max-w-md mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-3">
        <Logo className="w-12 h-12" />
        <div>
          <h1 className="text-2xl font-semibold">Welcome back!</h1>
          <p className="text-sm text-muted-foreground">
            Login to your account to continue
          </p>
        </div>
      </div>

      {/* Form */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="you@example.com"
                    type="email"
                    {...field}
                    value={field.value || ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Password */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="********"
                    type="password"
                    {...field}
                    value={field.value || ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* reCAPTCHA */}
          <div className="flex justify-center">
            <ReCAPTCHA
              sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_CLIENT_KEY!}
              onChange={handleReCaptcha}
              className="scale-[0.95]"
            />
          </div>

          {/* Submit */}
          <Button
            type="submit"
            className="w-full"
            disabled={!reCaptchaStatus}
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </Button>
        </form>
      </Form>

      {/* Link to Register */}
      <p className="text-sm text-center text-muted-foreground">
        Don’t have an account?{" "}
        <Link href="/register" className="text-primary hover:underline">
          Register
        </Link>
      </p>
    </div>
  );
}


