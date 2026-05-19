"use client";

import { Button } from "@/components/ui/button";
import {
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { LoginSpinner } from "@/components/ui/spinner";
import { registerUser } from "@/lib/api";
import { Field, useForm } from "@tanstack/react-form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";
import z from "zod";

const RegisterPage = () => {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);

  // Updated schema with password confirmation validation
  const formSchema = z
    .object({
      email: z
        .string()
        .min(5, "Email must be at least 5 characters.")
        .max(32, "Email must be at most 32 characters.")
        .email("Please enter a valid email address."),
      password: z
        .string()
        .min(6, "Password must be at least 6 characters.")
        .max(20, "Password must be at most 20 characters."),
      password_again: z.string(),
    })
    .refine((data) => data.password === data.password_again, {
      message: "Passwords do not match.",
      path: ["password_again"],
    });

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
      password_again: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      setLoading(true);
      try {
        // Only send email and password to the API
        const { email, password } = value;
        const res = await registerUser({ email, password });
        console.log("Register", res);
        toast.success(res?.data?.message || "Registration successful!", {
          position: "top-right",
          style: {
            backgroundColor: "#4ade80",
          } as React.CSSProperties,
        });
        router.push("/login");
      } catch (error: any) {
        const status = error.response?.status;
        const message = error.response?.data?.message;

        if (status === 409) {
          toast.warning(message || "User already exists.", {
            position: "top-right",
            style: {
              backgroundColor: "yellow",
            } as React.CSSProperties,
          });
        } else if (status === 500) {
          toast.error("Registration failed. Please try again.", {
            position: "top-right",
            style: {
              backgroundColor: "red",
            } as React.CSSProperties,
          });
        } else {
          toast.error(message || "Something went wrong");
        }
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div className="w-full flex justify-center items-center">
      <div className="w-[440px] h-fit">
        <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0 text-center py-6">
          Register
        </h2>
        {loading && (
          <div className="w-full flex justify-center items-center py-2">
            <LoginSpinner className="text-xl" />
          </div>
        )}
        <div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
          >
            <FieldGroup>
              <form.Field
                name="email"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <FieldContent data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={isInvalid}
                        placeholder="example@example.com"
                        autoComplete="off"
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </FieldContent>
                  );
                }}
              />

              <form.Field
                name="password"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <FieldContent data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        type="password"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={isInvalid}
                        autoComplete="off"
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </FieldContent>
                  );
                }}
              />

              <form.Field
                name="password_again"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <FieldContent data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>
                        Password (Again)
                      </FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        type="password"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={isInvalid}
                        autoComplete="off"
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </FieldContent>
                  );
                }}
              />
            </FieldGroup>
            <Button type="submit" className="w-full my-6 rounded-3xl">
              Continue
            </Button>
          </form>

          <div className="py-3 flex items-center text-sm text-gray-800 before:flex-1 before:border-t before:border-gray-200 before:me-6 after:flex-1 after:border-t after:border-gray-200 after:ms-6 dark:text-white dark:before:border-neutral-600 dark:after:border-neutral-600">
            OR
          </div>

          <div className="w-full flex flex-row justify-center gap-1 my-6">
            <p className="text-sm text-muted-foreground">Already a member?</p>{" "}
            <span className="text-sm text-sky-600 hover:underline">
              <Link href={"/login"}>Login</Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
