const OPENAI_API_KEY = ""

chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  if (message.type === "PRICE_CAPTURED") {
    console.log("Price captured:");
    const price = message.payload;
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You're a shopping assistant suggesting bundles."
          },
          {
            role: "user",
            content: `Suggest 5 combinations of daily-use items (with name and price) that together sum up to ₹${price}`
          }
        ]
      })
    });

    const data = await response.json();
    console.log(data)
    const text = data.choices?.[0]?.message?.content;
    chrome.storage.local.set({ smartSuggestions: text });
  }
});