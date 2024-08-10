"use client";

import Script from "next/script";
import { Subscriptions } from "razorpay/dist/types/subscriptions";
export default function YourBillingComponent() {
  const makePayment = async (productId: string) => {
    // Make API call to the serverless API
    const data = await fetch("/api/razorpay", {
      method: "POST",
      headers: {
        // Authorization: 'YOUR_AUTH_HERE'
      },
      body: JSON.stringify({ productId }),
    }).then((t) => {
      console.log(t);
      return t.json();
    });
    const response: Subscriptions.RazorpaySubscription = data;
    // const options = {
    //   name: data.name,
    //   currency: data.currency,
    //   amount: data.amount,
    //   order_id: data.id,
    //   description: data.amountDesc,
    //   // image: logoBase64,
    //   handler: function (response: any) {
    //     // Validate payment at server - using webhooks is a better idea.
    //     alert(response.razorpay_payment_id);
    //     alert(response.razorpay_order_id);
    //     alert(response.razorpay_signature);
    //   },
    //   prefill: {
    //     name: "John Doe",
    //     email: "jdoe@example.com",
    //     contact: "8219416633",
    //   },
    // };
    console.log({ response });
    const options = {
      key: process.env.RAZORPAY_ID ?? "rzp_test_XymAEFb8u1qGoE",
      subscription_id: response.id,
      name: "Acme Corp.",
      description: "Monthly Test Plan",
      image: "/your_logo.jpg",
      //   callback_url: "https://localhost:3000/",
      handler: function (response: any) {
        console.log({ response });
        alert(response.razorpay_payment_id);
      },
      prefill: {
        name: "Gaurav Kumar",
        email: "gaurav.kumar@gmail.com",
        contact: "+918219416633",
      },
      notes: {
        note_key_1: "Tea. Earl Grey. Hot",
        note_key_2: "Make it so.",
      },
      theme: {
        color: "#F37254",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();

    paymentObject.on("payment.failed", function (response: any) {
      alert("Payment failed. Please try again. Contact support for help");
    });
  };

  return (
    <>
      <Script
        id="razorpay-checkout-js"
        src="https://checkout.razorpay.com/v1/checkout.js"
      />

      <button
        onClick={() => {
          makePayment("example_ebook");
        }}
      >
        Buy
      </button>
    </>
  );
}


