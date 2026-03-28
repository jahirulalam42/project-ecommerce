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
import Link from "next/link";
import React from "react";
import { toast } from "sonner";
import z from "zod";

const page = () => {
  const formSchema = z.object({
    email: z
      .string()
      .min(5, "Bug title must be at least 5 characters.")
      .max(32, "Bug title must be at most 32 characters."),
    password: z
      .string()
      .min(20, "Description must be at least 20 characters.")
      .max(100, "Description must be at most 100 characters."),
    password_again: z
      .string()
      .min(20, "Description must be at least 20 characters.")
      .max(100, "Description must be at most 100 characters."),
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
      toast("You submitted the following values:", {
        description: (
          <pre className="mt-2 w-[320px] overflow-x-auto rounded-md bg-code p-4 text-code-foreground">
            <code>{JSON.stringify(value, null, 2)}</code>
          </pre>
        ),
        position: "bottom-right",
        classNames: {
          content: "flex flex-col gap-2",
        },
        style: {
          "--border-radius": "calc(var(--radius)  + 4px)",
        } as React.CSSProperties,
      });
    },
  });
  return (
    <div className="w-full flex justify-center items-center">
      <div className="w-[440px] h-fit">
        <h2 className="scroll-m-20  pb-2 text-3xl font-semibold tracking-tight first:mt-0 text-center py-6">
          Register
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

export default page;
