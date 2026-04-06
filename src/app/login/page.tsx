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
import { Field, useForm } from "@tanstack/react-form";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";
import z from "zod";

const page = () => {
  const router = useRouter();
  const formSchema = z.object({
    email: z
      .string()
      .min(5, "Bug title must be at least 5 characters.")
      .max(32, "Bug title must be at most 32 characters."),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters.")
      .max(50, "Password must be at most 50 characters."),
  });

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      console.log("Submitted value", value);

      const res = await signIn("credentials", {
        email: value.email,
        password: value.password,
        redirect: false, // important for handling response manually
      });

      if (res?.error) {
        toast("Login failed", {
          description: res.error,
        });
        console.log(res?.error);
      } else {
        toast("Login successful");
        router.push("/");
      }
    },
  });

  console.log("Form", form.state.values);
  return (
    <div className="w-full flex justify-center items-center">
      <div className="w-[440px] h-[450px]">
        <h2 className="scroll-m-20  pb-2 text-3xl font-semibold tracking-tight first:mt-0 text-center py-6">
          Login
        </h2>
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

          <div className="w-fulll flex flex-row justify-center gap-1 my-6">
            <p className="text-sm text-muted-foreground">New User?</p>{" "}
            <span className="text-sm text-sky-600 hover:underline">
              <Link href={"/register"}>Create an account</Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
