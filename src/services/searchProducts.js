const PRODUCTS_URL = "https://fakes.piecioshka.io/products/";

async function makeRequest(url) {
  const response = await fetch(url);
  return response.json();
}

export async function searchProducts(phrase) {
  console.log("searchProducts", phrase);
  const url = `${PRODUCTS_URL}?q=${phrase}`;
  return makeRequest(url);
}
