"use client";
import { Input, Button, Form } from "@heroui/react";
import { addToast } from "@heroui/toast";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { register as registerUser } from "@/lib/register";

// schema for validation
const signupSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z.string().min(5, "Password must be at least 5 characters")
});

type SignupFormValues = z.infer<typeof signupSchema>;

export default function LoginForm() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<SignupFormValues>({ resolver: zodResolver(signupSchema)});
  const [serverError, setServerError] = useState("");
  const router = useRouter();

  // handle submit
  const onSubmit = async (data: SignupFormValues) => {
      setServerError("");
      const res = await registerUser({ email: data.email, password: data.password, name: data.name });
      if (res?.success) {
        addToast({ title: "Registration submitted!", description: "Your registration request is pending until an admin approves it.", color:"default", timeout: 10000, shouldShowTimeoutProgress: true });
        router.push("/login");
      }
      if (res?.error) {
        setServerError(res.error);
        return;
      }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 pb-2">
      {/* name */}
      <Input label="Full Name" placeholder="Your Name" isInvalid={!!errors.name} errorMessage={errors.name?.message} {...register("name")} />
      {/* email */}
      <Input label="Email" placeholder="your@email.com" type="email" isInvalid={!!errors.email} errorMessage={errors.email?.message} {...register("email")} />
      {/* password */}
      <Input label="Password" placeholder="••••••••" type="password" isInvalid={!!errors.password} errorMessage={errors.password?.message} {...register("password")} />
      {/* submit button */}
      <Button type="submit" color="primary" className="mt-2 p-6 font-medium w-full" radius="sm" isLoading={isSubmitting}>Register</Button>
      {/* error message */}
      <div className="mt-2 min-h-[2rem]">{serverError && <p className="text-red-500 text-sm">{serverError}</p>}</div>
    </Form>
  );
}