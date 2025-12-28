
/**
 * THE START: Create Payment Link
 * This function talks to the Gateway (Flutterwave or Paystack).
 * It sends the price and the user ID.
 */

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') return res.status(405).send('Use POST');

  const { userId, amount, email } = req.body;

  // Use your Secret Key from Environment Variables
  const SECRET_KEY = process.env.PAYMENT_GATEWAY_SECRET;

  try {
    // 1. Ask the Gateway for a link
    const response = await fetch('https://api.flutterwave.com/v3/payments', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${SECRET_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        tx_ref: `EMW-L-${Date.now()}`,
        amount: amount,
        currency: 'ZMW', // Zambia Kwacha
        redirect_url: 'https://your-site.vercel.app/success',
        customer: { email, name: userId },
        customizations: { title: "OMEGA // UNITY Access" }
      }),
    });

    const data = await response.json();
    
    // 2. Send the link back to the UI
    return res.status(200).json({ url: data.data.link });
  } catch (error) {
    return res.status(500).json({ error: 'FAILED_TO_CREATE_PAY_LINK' });
  }
}
