
/**
 * THE BOOK: Ledger Logger
 * Every step of the money is written here.
 */

export function logTransaction(msg: string) {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${msg}`);
}

export async function recordPayment(userId: string, amount: number, status: string) {
  logTransaction(`LEDGER_ENTRY: User ${userId} | Amount ${amount} | Status ${status}`);
  // Save to your database here
}
