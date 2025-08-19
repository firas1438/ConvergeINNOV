"use client";
import { Input, Button, Form } from "@heroui/react";
import { addToast } from "@heroui/toast";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";

// zod schema for validation
const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z.string().min(1, "Password is required")
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginForm() {
  // state for server-side errors
  const [serverError, setServerError] = useState("");
  const router = useRouter();

  // form handling with react-hook-form and zod validation
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginFormValues>({ resolver: zodResolver(loginSchema) });

  // handle submit method
  const onSubmit = async (data: LoginFormValues) => {
    setServerError("");
    const res = await signIn("credentials", { email: data.email, password: data.password, redirect: false });
    if (res?.ok) {
      addToast({ title: "Login Successful", description: "Welcome back! Loading your dashboard...", variant: "bordered", timeout: 4000, shouldShowTimeoutProgress: true });
      router.push("/dashboard");
    }
    if (res?.error) {
      setServerError(res.error);
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 pb-2">
      {/* email */}
      <Input label="Email" placeholder="your@email.com" type="email" isInvalid={!!errors.email} errorMessage={errors.email?.message} {...register("email")} />
      {/* password */}
      <Input label="Password" placeholder="••••••••" type="password" isInvalid={!!errors.password} errorMessage={errors.password?.message} {...register("password")} />
      {/* submit button */}
      <Button type="submit" color="primary" className="mt-2 p-6 font-medium w-full" radius="sm" isLoading={isSubmitting}>Log In</Button>
      {/* error message */}
      <div className="mt-2 min-h-[2rem]">{serverError && <p className="text-red-500 text-sm">{serverError}</p>}</div>
    </Form>
  );
}