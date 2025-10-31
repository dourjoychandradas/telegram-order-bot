import fetch from "node-fetch";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { name, product } = req.body;

    // Seller Telegram info
    const sellerBots = {
      seller1: { chat_id: "6840076102", bot_token: "8247408967:AAF7ivv97f8eRC9IKwW_cdJ5zrZ05STC1LY" },
      seller2: { chat_id: "1275817732", bot_token: "8247408967:AAF7ivv97f8eRC9IKwW_cdJ5zrZ05STC1LY" },
    };

    const message = `🛍️ New Order!\n\n👤 Name: ${name}\n📦 Product: ${product}`;

    // Loop through all sellers
    for (const key in sellerBots) {
      const seller = sellerBots[key];
      const telegramUrl = `https://api.telegram.org/bot${seller.bot_token}/sendMessage`;

      await fetch(telegramUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: seller.chat_id,
          text: message,
        }),
      });
    }

    return res.status(200).json({ success: true, message: "Sent to all Telegram sellers" });
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
