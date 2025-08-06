chrome.storage.local.get("smartSuggestions", ({ smartSuggestions }) => {
  const output = document.getElementById("output");
  if (smartSuggestions) {
    output.innerHTML = `<pre>${smartSuggestions}</pre>`;
  } else {
    output.textContent = "No suggestions yet. Add an item to cart!";
  }
});