const FALLBACK_IMAGE =
  "https://via.placeholder.com/600x800/F5F5F5/757575?text=No+Image";

const DUMMYJSON_URL =
  import.meta.env.VITE_DUMMYJSON_URL ||
  "https://dummyjson.com/products/category/beauty";
const MAKEUP_API_URL =
  import.meta.env.VITE_MAKEUP_API_URL ||
  "http://makeup-api.herokuapp.com/api/v1/products.json";
const FAKESTORE_MEN_URL =
  import.meta.env.VITE_FAKESTORE_MEN_URL ||
  "https://fakestoreapi.com/products/category/men's clothing";
const FAKESTORE_WOMEN_URL =
  import.meta.env.VITE_FAKESTORE_WOMEN_URL ||
  "https://fakestoreapi.com/products/category/women's clothing";
const FAKESTORE_JEWELRY_URL =
  import.meta.env.VITE_FAKESTORE_JEWELRY_URL ||
  "https://fakestoreapi.com/products/category/jewelery";
const ESCUELAJS_URL =
  import.meta.env.VITE_ESCUELAJS_URL ||
  "https://api.escuelajs.co/api/v1/products";

void FAKESTORE_MEN_URL;
void FAKESTORE_WOMEN_URL;
void FAKESTORE_JEWELRY_URL;
void ESCUELAJS_URL;

const normalizeMakeup = (p) => ({
  id: `makeup-${p.id}`,
  title: p.name,
  price: Number.parseFloat(p.price) || 9.99,
  image: p.image_link || FALLBACK_IMAGE,
  images: [p.image_link || FALLBACK_IMAGE],
  category:
    p.product_type === "lipstick" || p.product_type === "foundation"
      ? "beauty"
      : "grooming",
  source: "makeup",
});

const normalizeDummyJson = (p) => ({
  id: `dummyjson-${p.id}`,
  title: p.title,
  price: Number(p.price),
  image: p.thumbnail || FALLBACK_IMAGE,
  images: [p.thumbnail || FALLBACK_IMAGE],
  category: "beauty",
  source: "dummyjson",
  discountPercentage: p.discountPercentage,
  rating: p.rating,
});

const hasValidImage = (image) =>
  typeof image === "string" &&
  /^https?:\/\//i.test(image.trim()) &&
  image.trim().length > 10;

const titleKey = (title) =>
  String(title || "")
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .replace(/\s+/g, " ")
    .trim();

export const fetchUnifiedProducts = async () => {
  const calls = [
    {
      apiName: "makeup",
      run: async () => {
        const res = await fetch(MAKEUP_API_URL);
        if (!res.ok) throw new Error(`Makeup API ${res.status}`);
        const data = await res.json();
        return (Array.isArray(data) ? data : [])
          .slice(0, 80)
          .map(normalizeMakeup);
      },
    },
    {
      apiName: "dummyjson-beauty",
      run: async () => {
        const res = await fetch(DUMMYJSON_URL);
        if (!res.ok) throw new Error(`DummyJSON ${res.status}`);
        const data = await res.json();
        return (Array.isArray(data.products) ? data.products : []).map(
          normalizeDummyJson,
        );
      },
    },
  ];

  const results = await Promise.allSettled(calls.map((item) => item.run()));

  const successful = [];
  let failures = 0;

  results.forEach((result, index) => {
    if (result.status === "fulfilled") {
      successful.push(...result.value);
      return;
    }
    failures += 1;
    console.warn("API failed:", calls[index].apiName, result.reason);
  });

  if (failures === calls.length) {
    throw new Error("ALL_APIS_FAILED");
  }

  const dedupe = new Set();
  const unified = successful
    .filter((p) => Boolean(p.title))
    .filter((p) => hasValidImage(p.image))
    .filter((p) => Number(p.price) > 0)
    .filter((p) => {
      const key = titleKey(p.title);
      if (!key || dedupe.has(key)) {
        return false;
      }
      dedupe.add(key);
      return true;
    })
    .sort((a, b) => a.id.localeCompare(b.id));

  return unified;
};
