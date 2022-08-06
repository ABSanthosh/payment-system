import Razorpay from "razorpay";
import shortid from "shortid";

export default async function paymentHandler(req, res) {
  if (req.method !== "POST") return;

  const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_SECRET_KEY,
  });

  const options = {
    amount: JSON.parse(req.body).amount,
    currency: "INR",
    receipt: shortid.generate(),
    payment_capture: 1,
  };

  try {
    const response = await razorpay.orders.create(options);
    res.status(200).json({
      id: response.id,
      currency: response.currency,
      amount: response.amount,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
}
