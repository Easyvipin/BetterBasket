function isPriceLikeText(text) {
  return /(?:₹|INR|Rs\.?)?\s*\d{2,}(,\d{3})*(\.\d{1,2})?/.test(text);
}

function extractPriceFromElement(element) {
  const text = element?.innerText?.trim();
  if (text && isPriceLikeText(text)) {
    const cleaned = text.replace(/[^\d.]/g, "");
    const price = parseFloat(cleaned);
    return isNaN(price) ? null : price;
  }
  return null;
}

function notifyBackground(price) {
  chrome.runtime.sendMessage({ type: "PRICE_CAPTURED", payload: price });
}

document.addEventListener("click", (e) => {
  const clicked = e.target;

  const price = extractPriceFromElement(clicked);
  if (price) {
    console.log("[Smart Cart] Price clicked:", price);
    notifyBackground(price);
  }
});
