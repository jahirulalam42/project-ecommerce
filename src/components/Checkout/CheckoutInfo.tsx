"use client";
import React from "react";
import { useForm } from "@tanstack/react-form";
import { XIcon } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useSelector } from "react-redux";

const CheckoutInfo = () => {
  const subtotal = useSelector((state: any) => state.cart.subtotal);
  const taxtotal = useSelector((state: any) => state.cart.taxtotal);
  const ordertotal = useSelector((state: any) => state.cart.ordertotal);

  const formSchema = z.object({
    emails: z
      .array(
        z.object({
          address: z.string().email("Enter a valid email address."),
        })
      )
      .min(1, "Add at least one email address.")
      .max(5, "You can add up to 5 email addresses."),
  });

  const form = useForm({
    defaultValues: {
      emails: [{ address: "" }],
    },
    validators: {
      onBlur: formSchema,
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
    <div className="flex flex-col gap-6">
      {/* Contact Info */}
      <Card className="w-full">
        <CardHeader className="border-b">
          <CardTitle className="text-gray-600">CONTACT INFO</CardTitle>
        </CardHeader>
        <CardContent>
          <form>
            <div className="w-full flex flex-row gap-6">
              <div className="flex-1 grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="phone">Your phone number</Label>
                </div>
                <Input id="phone" type="text" required />
              </div>
              <div className="flex-1 grid gap-2">
                <Label htmlFor="email">Email address</Label>
                <Input id="email" type="email" required />
              </div>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Shipping Address */}
      <Card className="w-full">
        <CardHeader className="border-b">
          <CardTitle className="text-gray-600">SHIPPING ADDRESS</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-4">
            <div className="w-full flex flex-row gap-4">
              <div className="flex-1 grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="fname">First name</Label>
                </div>
                <Input id="fname" type="text" required />
              </div>
              <div className="flex-1 grid gap-2">
                <Label htmlFor="lname">Last name</Label>
                <Input id="lname" type="text" required />
              </div>
            </div>

            <div className="w-full flex flex-row gap-4">
              <div className="w-[70%] flex-auto grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="address1">Address line 1</Label>
                </div>
                <Input id="address1" type="text" required />
              </div>
              <div className="w-[30%] flex-auto grid gap-2">
                <Label htmlFor="apt">Apt, Suite</Label>
                <Input id="apt" type="text" required />
              </div>
            </div>

            <div className="w-full">
              <div className="w-full flex-auto grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="address1">Address line 2</Label>
                </div>
                <Input id="address2" type="text" required />
              </div>
            </div>

            <div className="w-full flex flex-row gap-6">
              <div className="flex-1 grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="city">City</Label>
                </div>
                <Input id="city" type="text" required />
              </div>
              <div className="flex-1 grid gap-2">
                <Label htmlFor="country">Country</Label>
                <Input id="country" type="text" required />
              </div>
            </div>

            <div className="w-full flex flex-row gap-6">
              <div className="flex-1 grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="state">State/Province</Label>
                </div>
                <Input id="state" type="text" required />
              </div>
              <div className="flex-1 grid gap-2">
                <Label htmlFor="postal">Postal code</Label>
                <Input id="postal" type="text" required />
              </div>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Payment */}
      <Card className="w-full">
        <CardHeader className="border-b">
          <CardTitle className="text-gray-600">PAYMENT</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-4">
            <div className="w-full grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="card">Card number</Label>
              </div>
              <Input id="card" type="text" required />
            </div>

            <div className="w-full grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="nameCard">Name on the card</Label>
              </div>
              <Input id="nameCard" type="text" required />
            </div>

            <div className="w-full flex flex-row gap-4">
              <div className="w-[70%] flex-auto grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="exp_date">Expiration date (MM/YY)</Label>
                </div>
                <Input id="exp_date" type="text" required />
              </div>
              <div className="w-[30%] flex-auto grid gap-2">
                <Label htmlFor="cvc">CVC</Label>
                <Input id="cvc" type="text" required />
              </div>
            </div>
          </form>
        </CardContent>
      </Card>

      <div className="w-full md:hidden">
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight py-4">
          Confirm your order
        </h4>
        <div className="flex justify-between text-gray-500">
          <span>Subtotal</span> <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-gray-500">
          <span>Shipping estimate</span> <span>$5.00</span>
        </div>
        <div className="flex justify-between text-gray-500">
          <span>Tax estimate</span> <span>${taxtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between py-2 font-semibold">
          <span>Order total</span> <span>${ordertotal.toFixed(2)}</span>
        </div>
      </div>

      <Button type="submit" className="w-full rounded-full mb-10">
        Confirm order
      </Button>
    </div>
  );
};

export default CheckoutInfo;
