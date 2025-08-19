"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input, Textarea, Form } from "@heroui/react";
import { addToast } from "@heroui/toast";

// zod schema for field validation
const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().min(1, "Email is required").email("Invalid email"),
  phone: z.string().min(1,"Phone number is required").regex(/^\+?\d[\d\s]*$/, "Invalid phone number"),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(1, "Message is required"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function ContactForm() {
  // form handling with react-hook-form and zod validation
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<ContactFormValues>({ resolver: zodResolver(contactSchema) });

  // handle form submit
  const onSubmit = async (data: ContactFormValues) => {
    try {
      // sends POST request to backend API
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data),});
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Something went wrong");
      // shows success toast and resets form
      addToast({ title: "Message Sent!", description: "We’ve received your message and will get back to you soon.", color: "success" });
      reset();

    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Something went wrong. Please try again.";
      addToast({ title: "Submission Failed", description: message, color: "danger",});
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-3">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
        <Input label="Full Name *" placeholder="Your name" isInvalid={!!errors.name} errorMessage={errors.name?.message} {...register("name")} />
        <Input label="Email *" placeholder="your@email.com" isInvalid={!!errors.email} errorMessage={errors.email?.message} {...register("email")} />
      </div>
      <Input label="Phone *" placeholder="+216 12 345 678" isInvalid={!!errors.phone} errorMessage={errors.phone?.message} {...register("phone")} />
      <Input label="Subject *" placeholder="Message subject" isInvalid={!!errors.subject} errorMessage={errors.subject?.message} {...register("subject")} />
      <Textarea label="Message *" placeholder="How can we help you?" rows={4} isInvalid={!!errors.message} errorMessage={errors.message?.message} {...register("message")} />
      <Button type="submit" color="primary" className="mt-2 font-medium w-full" radius="sm" isLoading={isSubmitting}>Send Message</Button>
    </Form>
  );
}
