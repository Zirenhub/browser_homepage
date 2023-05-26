import { Quote } from "../types/quote";

const API = import.meta.env.VITE_QUOTE_API;

async function getQuote() {
  const response = await fetch("https://api.api-ninjas.com/v1/quotes", {
    headers: {
      "X-Api-Key": API,
    },
  });
  const data: Quote[] = await response.json();
  return data[0];
}

export { getQuote };
