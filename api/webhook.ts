
/**
 * THE CONFIRM: Webhook Handler
 * The Gateway calls this when money is received.
 */
import { unlockUserAccess } from '../services/access_manager';

export default async function handler(req: any, res: any) {
  // 1. Get the secret signature from the header
  const signature = req.headers['verif-hash'];
  const SECRET_HASH = process.env.PAYMENT_WEBHOOK_SECRET;

  // 2. Verify the Handshake
  if (!signature || signature !== SECRET_HASH) {
    return res.status(401).send('UNAUTHORIZED_HANDSHAKE');
  }

  const { status, tx_ref, customer } = req.body.data || req.body;

  // 3. If money is there, unlock the system
  if (status === 'successful' || status === 'success') {
    const userId = customer.name || customer.email;
    
    await unlockUserAccess(userId, tx_ref);
    
    console.log(`[LEDGER_SETTLED] User ${userId} is now Sovereign.`);
    return res.status(200).send('SUCCESS');
  }

  return res.status(200).send('PENDING');
}
