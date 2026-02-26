import Stripe from "https://esm.sh/stripe@14.21.0?target=deno";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const stripeSecretKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeSecretKey) {
      throw new Error("STRIPE_SECRET_KEY is not configured");
    }

    const stripe = new Stripe(stripeSecretKey, {
      apiVersion: "2023-10-16",
      httpClient: Stripe.createFetchHttpClient(),
    });

    const {
      tenantId,
      planId,
      planTier,
      amount,
      productName,
      successUrl,
      cancelUrl,
    } = await req.json();

    if (!tenantId || !planId || !amount) {
      throw new Error("Missing required fields: tenantId, planId, amount");
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card", "fpx", "grabpay"],
      mode: "subscription",
      line_items: [
        {
          price_data: {
            currency: "myr",
            product_data: {
              name: productName || "OAIM Subscription",
              description: `${planTier} plan — monthly subscription`,
            },
            unit_amount: amount,
            recurring: { interval: "month" },
          },
          quantity: 1,
        },
      ],
      metadata: {
        tenantId,
        planId,
        planTier,
        subscriptionType: "monthly",
      },
      success_url:
        successUrl ||
        `${req.headers.get("origin")}/app/settings?payment=success`,
      cancel_url:
        cancelUrl ||
        `${req.headers.get("origin")}/app/settings?payment=cancelled`,
    });

    return new Response(
      JSON.stringify({ sessionId: session.id, url: session.url }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    console.error("Stripe checkout error:", error);
    return new Response(
      JSON.stringify({ error: (error as Error).message }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      }
    );
  }
});
