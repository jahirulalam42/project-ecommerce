"use client";
import React from "react";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentOrder } from "@/features/order/orderSlice";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { submitOrder } from "@/lib/api";
import { removeAllCartItem, removeCartItem } from "@/features/cart/cartSlice";

const CheckoutInfo = () => {
  const { data: session } = useSession();
  const subtotal = useSelector((state: any) => state.cart.subtotal);
  const taxtotal = useSelector((state: any) => state.cart.taxtotal);
  const ordertotal = useSelector((state: any) => state.cart.ordertotal);
  const cartItem = useSelector((state: any) => state.cart.summaryProducts);
  console.log("Session", session);
  const dispatch = useDispatch();
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      orderId: "ORD-" + Math.random().toString(36).substr(2, 9).toUpperCase(),
      date: new Date().toLocaleDateString(),
      userId: session?.user?.id,
      phone: "",
      email: "",
      fname: "",
      lname: "",
      address1: "",
      address2: "",
      apt: "",
      city: "",
      country: "",
      state: "",
      postal: "",
      card: "",
      nameCard: "",
      exp_date: "",
      cvc: "",
      status: "",
    },
    onSubmit: async ({ value }) => {
      const {
        phone,
        email,
        fname,
        lname,
        address1,
        address2,
        apt,
        city,
        country,
        state,
        postal,
        status,
      } = value;
      const Order = {
        userId: session?.user?.id,
        orderId: "ORD-" + Math.random().toString(36).substr(2, 9).toUpperCase(),
        date: new Date().toLocaleDateString(),
        contact: {
          phone: phone,
          email: email,
        },
        shipping: {
          firstName: fname,
          lastName: lname,
          address1: address1,
          city: city,
          country: country,
          state: state,
          postal: postal,
        },
        payment: { last4: "4242" },
        items: cartItem,
        subtotal,
        shippingCost: 5.0,
        tax: taxtotal,
        total: ordertotal,
        estimatedDelivery: "March 15, 2025",
        status: "pending",
      };
      const orderResult = await submitOrder(Order);
      if (orderResult.status === 200 || orderResult.status === 201) {
        dispatch(removeAllCartItem());
        router.push(`/order-confirmation`);
        // console.log("Order Result", orderResult);
        sessionStorage.setItem("orderId", Order?.orderId);
        toast.success(orderResult?.data?.message, {
          position: "top-right",
          style: {
            backgroundColor: "#4ade80",
          } as React.CSSProperties,
        });
      }
    },
  });
  // console.log("CartItem", cartItem);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
      className="flex flex-col gap-6"
    >
      {/* Contact Info */}
      <Card className="w-full">
        <CardHeader className="border-b">
          <CardTitle className="text-gray-600">CONTACT INFO</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="w-full flex flex-row gap-6">
            <form.Field name="phone">
              {(field) => (
                <div className="flex-1 grid gap-2">
                  <Label htmlFor={field.name}>Your phone number</Label>
                  <Input
                    id={field.name}
                    type="text"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    required
                  />
                </div>
              )}
            </form.Field>
            <form.Field name="email">
              {(field) => (
                <div className="flex-1 grid gap-2">
                  <Label htmlFor={field.name}>Email address</Label>
                  <Input
                    id={field.name}
                    type="email"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    required
                  />
                </div>
              )}
            </form.Field>
          </div>
        </CardContent>
      </Card>

      {/* Shipping Address */}
      <Card className="w-full">
        <CardHeader className="border-b">
          <CardTitle className="text-gray-600">SHIPPING ADDRESS</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <div className="w-full flex flex-row gap-4">
              <form.Field name="fname">
                {(field) => (
                  <div className="flex-1 grid gap-2">
                    <Label htmlFor={field.name}>First name</Label>
                    <Input
                      id={field.name}
                      type="text"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      required
                    />
                  </div>
                )}
              </form.Field>
              <form.Field name="lname">
                {(field) => (
                  <div className="flex-1 grid gap-2">
                    <Label htmlFor={field.name}>Last name</Label>
                    <Input
                      id={field.name}
                      type="text"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      required
                    />
                  </div>
                )}
              </form.Field>
            </div>

            <div className="w-full flex flex-row gap-4">
              <form.Field name="address1">
                {(field) => (
                  <div className="w-[70%] flex-auto grid gap-2">
                    <Label htmlFor={field.name}>Address line 1</Label>
                    <Input
                      id={field.name}
                      type="text"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      required
                    />
                  </div>
                )}
              </form.Field>
              <form.Field name="apt">
                {(field) => (
                  <div className="w-[30%] flex-auto grid gap-2">
                    <Label htmlFor={field.name}>Apt, Suite</Label>
                    <Input
                      id={field.name}
                      type="text"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      required
                    />
                  </div>
                )}
              </form.Field>
            </div>

            <div className="w-full">
              <form.Field name="address2">
                {(field) => (
                  <div className="w-full flex-auto grid gap-2">
                    <Label htmlFor={field.name}>Address line 2</Label>
                    <Input
                      id={field.name}
                      type="text"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                  </div>
                )}
              </form.Field>
            </div>

            <div className="w-full flex flex-row gap-6">
              <form.Field name="city">
                {(field) => (
                  <div className="flex-1 grid gap-2">
                    <Label htmlFor={field.name}>City</Label>
                    <Input
                      id={field.name}
                      type="text"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      required
                    />
                  </div>
                )}
              </form.Field>
              <form.Field name="country">
                {(field) => (
                  <div className="flex-1 grid gap-2">
                    <Label htmlFor={field.name}>Country</Label>
                    <Input
                      id={field.name}
                      type="text"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      required
                    />
                  </div>
                )}
              </form.Field>
            </div>

            <div className="w-full flex flex-row gap-6">
              <form.Field name="state">
                {(field) => (
                  <div className="flex-1 grid gap-2">
                    <Label htmlFor={field.name}>State/Province</Label>
                    <Input
                      id={field.name}
                      type="text"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      required
                    />
                  </div>
                )}
              </form.Field>
              <form.Field name="postal">
                {(field) => (
                  <div className="flex-1 grid gap-2">
                    <Label htmlFor={field.name}>Postal code</Label>
                    <Input
                      id={field.name}
                      type="text"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      required
                    />
                  </div>
                )}
              </form.Field>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment */}
      <Card className="w-full">
        <CardHeader className="border-b">
          <CardTitle className="text-gray-600">PAYMENT</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <form.Field name="card">
              {(field) => (
                <div className="w-full grid gap-2">
                  <Label htmlFor={field.name}>Card number</Label>
                  <Input
                    id={field.name}
                    type="text"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    required
                  />
                </div>
              )}
            </form.Field>

            <form.Field name="nameCard">
              {(field) => (
                <div className="w-full grid gap-2">
                  <Label htmlFor={field.name}>Name on the card</Label>
                  <Input
                    id={field.name}
                    type="text"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    required
                  />
                </div>
              )}
            </form.Field>

            <div className="w-full flex flex-row gap-4">
              <form.Field name="exp_date">
                {(field) => (
                  <div className="w-[70%] flex-auto grid gap-2">
                    <Label htmlFor={field.name}>Expiration date (MM/YY)</Label>
                    <Input
                      id={field.name}
                      type="text"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      required
                    />
                  </div>
                )}
              </form.Field>
              <form.Field name="cvc">
                {(field) => (
                  <div className="w-[30%] flex-auto grid gap-2">
                    <Label htmlFor={field.name}>CVC</Label>
                    <Input
                      id={field.name}
                      type="text"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      required
                    />
                  </div>
                )}
              </form.Field>
            </div>
          </div>
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
    </form>
  );
};

export default CheckoutInfo;
