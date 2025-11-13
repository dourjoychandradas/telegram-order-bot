import fetch from "node-fetch";

// Permanent Bot Token
const BOT_TOKEN = "8247408967:AAF7ivv97f8eRC9IKwW_cdJ5zrZ05STC1LY";

// Seller list (manual for now)
const sellerBots = {
  "seller1": { chat_id: "6840076102" },
  "seller2": { chat_id: "1275817732" },
  "seller3": { chat_id: "8179923107" }, 
};

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { name, product } = req.body;

    const message = `🛍️ New Order!\n\n👤 Name: ${name}\n📦 Product: ${product}`;

    try {
      // Loop through all sellers
      for (const key in sellerBots) {
        const seller = sellerBots[key];
        const telegramUrl = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

        await fetch(telegramUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: seller.chat_id,
            text: message,
          }),
        });
      }

      return res.status(200).json({ success: true, message: "Sent to all sellers on Telegram" });
    } catch (err) {
      console.error("❌ Telegram API error:", err);
      return res.status(500).json({ success: false, error: "Failed to send Telegram messages" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
