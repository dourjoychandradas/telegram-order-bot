// api.js
import fetch from "node-fetch";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { name, product, sellerId } = req.body;

    // প্রতিটা সেলার-এর জন্য টেলিগ্রাম chat_id এবং bot token রাখতে হবে
    const sellerBots = {
      "seller1": { chat_id: "123456789", bot_token: "YOUR_BOT_TOKEN" },
      "seller2": { chat_id: "987654321", bot_token: "YOUR_BOT_TOKEN" },
    };

    const seller = sellerBots[sellerId];
    if (!seller) {
      return res.status(400).json({ error: "Seller not found" });
    }

    const message = `🛍️ New Order!\n\n👤 Name: ${name}\n📦 Product: ${product}`;
    const telegramUrl = `https://api.telegram.org/bot${seller.bot_token}/sendMessage`;

    await fetch(telegramUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: seller.chat_id,
        text: message,
      }),
    });

    return res.status(200).json({ success: true, message: "Sent to Telegram" });
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
