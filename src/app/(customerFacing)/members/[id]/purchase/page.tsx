import db from "@/src/db/db";
import { notFound } from "next/navigation";
import Stripe from "stripe";
import CheckoutForm from "./_components/CheckoutForm";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

type PurchasePageProps = {
  params: { id: string };
};

const PurchasePage = async ({ params: { id } }: PurchasePageProps) => {
  const member = await db.member.findUnique({ where: { id } });

  if (member == null) return notFound();

  const paymentIntent = await stripe.paymentIntents.create({
    amount: 1000,
    currency: "USD",
    metadata: { memberId: member.id },
  });

  if (paymentIntent.client_secret == null) {
    throw Error("Stripe falied to create payment intent");
  }

  return (
    <CheckoutForm member={member} clientSecret={paymentIntent.client_secret} />
  );
};

export default PurchasePage;
