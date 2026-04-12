const FALLBACK_IMAGE =
  "https://via.placeholder.com/600x800/F5F5F5/757575?text=No+Image";

const DUMMYJSON_MENS_SHIRTS_URL =
  import.meta.env.VITE_DUMMYJSON_MENS_SHIRTS_URL ||
  "https://dummyjson.com/products/category/mens-shirts";
const DUMMYJSON_WOMENS_DRESSES_URL =
  import.meta.env.VITE_DUMMYJSON_WOMENS_DRESSES_URL ||
  "https://dummyjson.com/products/category/womens-dresses";
const DUMMYJSON_WOMENS_BAGS_URL =
  import.meta.env.VITE_DUMMYJSON_WOMENS_BAGS_URL ||
  "https://dummyjson.com/products/category/womens-bags";
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

void ESCUELAJS_URL;

const normalizeCategory = (rawCategory) => {
  const category = String(rawCategory || "").toLowerCase();
  if (category.includes("men")) return "mens";
  if (category.includes("women")) return "womens";
  if (
    category.includes("jewel") ||
    category.includes("bag") ||
    category.includes("watch") ||
    category.includes("sunglass") ||
    category.includes("accessor")
  ) {
    return "accessories";
  }
  return "fashion";
};

const normalizeDummyJson = (p) => ({
  id: `dummyjson-${p.id}`,
  title: p.title,
  price: Number(p.price),
  image: p.thumbnail || p.images?.[0] || FALLBACK_IMAGE,
  images:
    Array.isArray(p.images) && p.images.length > 0
      ? p.images
      : [p.thumbnail || FALLBACK_IMAGE],
  category: normalizeCategory(p.category),
  source: "dummyjson",
  discountPercentage: p.discountPercentage,
  rating: p.rating,
  stock: p.stock,
  brand: p.brand,
  description: p.description,
});

const normalizeFakeStore = (p) => ({
  id: `fakestore-${p.id}`,
  title: p.title,
  price: Number(p.price),
  image: p.image || FALLBACK_IMAGE,
  images: [p.image || FALLBACK_IMAGE],
  category: normalizeCategory(p.category),
  source: "fakestore",
  rating: Number(p.rating?.rate) || 0,
  description: p.description,
});

const hasValidImage = (image) =>
  typeof image === "string" &&
  /^https?:\/\//i.test(image.trim()) &&
  image.trim().length > 10;

const isFashionProduct = (product) => {
  const haystack = `${product.title || ""} ${product.description || ""} ${
    product.category || ""
  }`
    .toLowerCase()
    .trim();

  const blocked = [
    "vegetable",
    "grocer",
    "food",
    "fruit",
    "kitchen",
    "beverage",
  ];
  if (blocked.some((word) => haystack.includes(word))) {
    return false;
  }

  const allowed = [
    "shirt",
    "dress",
    "jean",
    "jacket",
    "hoodie",
    "shoe",
    "sneaker",
    "bag",
    "watch",
    "jewel",
    "fashion",
    "clothing",
    "mens",
    "women",
    "accessor",
  ];
  return allowed.some((word) => haystack.includes(word));
};

const titleKey = (title) =>
  String(title || "")
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .replace(/\s+/g, " ")
    .trim();

export const fetchUnifiedProducts = async () => {
  const calls = [
    {
      apiName: "dummyjson-mens-shirts",
      run: async () => {
        const res = await fetch(DUMMYJSON_MENS_SHIRTS_URL);
        if (!res.ok) throw new Error(`DummyJSON mens-shirts ${res.status}`);
        const data = await res.json();
        return (Array.isArray(data.products) ? data.products : []).map(
          normalizeDummyJson,
        );
      },
    },
    {
      apiName: "dummyjson-womens-dresses",
      run: async () => {
        const res = await fetch(DUMMYJSON_WOMENS_DRESSES_URL);
        if (!res.ok) {
          throw new Error(`DummyJSON womens-dresses ${res.status}`);
        }
        const data = await res.json();
        return (Array.isArray(data.products) ? data.products : []).map(
          normalizeDummyJson,
        );
      },
    },
    {
      apiName: "dummyjson-womens-bags",
      run: async () => {
        const res = await fetch(DUMMYJSON_WOMENS_BAGS_URL);
        if (!res.ok) throw new Error(`DummyJSON womens-bags ${res.status}`);
        const data = await res.json();
        return (Array.isArray(data.products) ? data.products : []).map(
          normalizeDummyJson,
        );
      },
    },
    {
      apiName: "fakestore-mens",
      run: async () => {
        const res = await fetch(FAKESTORE_MEN_URL);
        if (!res.ok) throw new Error(`FakeStore mens ${res.status}`);
        const data = await res.json();
        return (Array.isArray(data) ? data : []).map(normalizeFakeStore);
      },
    },
    {
      apiName: "fakestore-womens",
      run: async () => {
        const res = await fetch(FAKESTORE_WOMEN_URL);
        if (!res.ok) throw new Error(`FakeStore womens ${res.status}`);
        const data = await res.json();
        return (Array.isArray(data) ? data : []).map(normalizeFakeStore);
      },
    },
    {
      apiName: "fakestore-jewelry",
      run: async () => {
        const res = await fetch(FAKESTORE_JEWELRY_URL);
        if (!res.ok) throw new Error(`FakeStore jewelry ${res.status}`);
        const data = await res.json();
        return (Array.isArray(data) ? data : []).map(normalizeFakeStore);
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
    .filter((p) => isFashionProduct(p))
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
