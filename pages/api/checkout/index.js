import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const CURRENCY = "inr";
import { formatAmountForStripe } from "../../../Utils/stripe-helpers";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const amount = req.body.amount;
    console.log(typeof(req.body.line_items))
    try {
      const params = {
        submit_type: "pay",
        payment_method_types: ["card"],
        line_items: req.body.line_items,
        success_url: `${req.headers.origin}/result?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}/result?session_id={CHECKOUT_SESSION_ID}`,
      };

      const checkoutSession = await stripe.checkout.sessions.create(params);

      res.status(200).json(checkoutSession);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Internal server error";
      res.status(500).json({ statusCode: 500, message: errorMessage });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
