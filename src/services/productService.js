const FALLBACK_IMAGE =
  "https://via.placeholder.com/600x800/F5F5F5/757575?text=No+Image";

const FASHION_CATEGORY_KEYWORDS = [
  "cloth",
  "shirt",
  "dress",
  "jean",
  "shoe",
  "boot",
  "sneaker",
  "jacket",
  "top",
  "pant",
  "skirt",
  "fashion",
  "wear",
  "apparel",
];

const EXCLUDED_CATEGORY_KEYWORDS = [
  "food",
  "vegetable",
  "fruit",
  "grocery",
  "electronic",
  "furniture",
  "technology",
  "computer",
  "phone",
  "appliance",
  "kitchen",
  "car",
  "book",
  "toy",
  "sport",
];

export const detectClothingCategory = (name = "") => {
  const normalized = String(name).toLowerCase();
  return "clothing";
};

const shouldKeepEscuelaCategory = (categoryName = "") => {
  const normalized = String(categoryName).toLowerCase();
  return FASHION_CATEGORY_KEYWORDS.some((keyword) =>
    normalized.includes(keyword),
  );
};

const isGarbageFashionData = (product) => {
  const categoryName = String(
    product.categoryName || product.category || "",
  ).toLowerCase();
  const image = String(product.image || "").toLowerCase();

  if (Number(product.price) < 5) return true;
  if (image.includes("500x400") || image.includes("placeimg")) return true;
  return EXCLUDED_CATEGORY_KEYWORDS.some((keyword) =>
    categoryName.includes(keyword),
  );
};

const normalizeEscuelaJs = (p) => ({
  id: `escuelajs-${p.id}`,
  title: p.title,
  price: Number(p.price),
  image: p.images?.[0]?.replace(/["\[\]]/g, "") || FALLBACK_IMAGE,
  images: Array.isArray(p.images)
    ? p.images.map((img) => String(img).replace(/["\[\]]/g, "")).filter(Boolean)
    : [p.images?.[0]?.replace(/["\[\]]/g, "") || FALLBACK_IMAGE],
  category: detectClothingCategory(p.category?.name),
  categoryName: p.category?.name || "",
  subCategory: "unisex",
  source: "escuelajs",
});

const normalizeFakeStore = (p, subCategory) => ({
  id: `fakestore-${subCategory}-${p.id}`,
  title: p.title,
  price: Number(p.price),
  image: p.image || FALLBACK_IMAGE,
  images: [p.image || FALLBACK_IMAGE],
  category: "clothing",
  subCategory,
  rating: p.rating?.rate,
  source: "fakestore",
});

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

const isValidClothingItem = (product) => {
  const categoryName = String(
    product.categoryName || product.category || "",
  ).toLowerCase();
  const image = String(product.image || "").toLowerCase();

  if (Number(product.price) < 5) return false;
  if (image.includes("500x400") || image.includes("placeimg")) return false;

  if (!categoryName) return true;

  const allowed = [
    "cloth",
    "shirt",
    "dress",
    "jean",
    "jacket",
    "top",
    "fashion",
    "wear",
  ];
  const blocked = [
    "electronic",
    "food",
    "vegetable",
    "furniture",
    "grocery",
    "phone",
  ];

  if (blocked.some((keyword) => categoryName.includes(keyword))) {
    return false;
  }

  return allowed.some((keyword) => categoryName.includes(keyword));
};

const fetchEscuelaJsProducts = async () => {
  const res = await fetch(
    "https://api.escuelajs.co/api/v1/products?limit=100&offset=0",
  );
  if (!res.ok) throw new Error(`EscuelaJS ${res.status}`);
  const data = await res.json();
  return (Array.isArray(data) ? data : [])
    .map((product) => ({
      ...normalizeEscuelaJs(product),
      categoryName: product.category?.name || "",
    }))
    .filter(
      (product) =>
        isValidClothingItem(product) && !isGarbageFashionData(product),
    );
};

const fetchFakeStoreClothing = async (categoryPath, subCategory) => {
  const response = await fetch(
    `https://fakestoreapi.com/products/category/${categoryPath}`,
  );
  if (!response.ok) {
    throw new Error(`FakeStore ${subCategory} ${response.status}`);
  }
  const data = await response.json();
  return (Array.isArray(data) ? data : []).map((product) =>
    normalizeFakeStore(product, subCategory),
  );
};

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
      apiName: "fakestore-men",
      run: () => fetchFakeStoreClothing("men's clothing", "men"),
    },
    {
      apiName: "fakestore-women",
      run: () => fetchFakeStoreClothing("women's clothing", "women"),
    },
    {
      apiName: "fakestore-jewelry",
      run: () => fetchFakeStoreClothing("jewelery", "accessories"),
    },
    {
      apiName: "escuelajs-clothing",
      run: fetchEscuelaJsProducts,
    },
    {
      apiName: "makeup",
      run: async () => {
        const res = await fetch(
          "http://makeup-api.herokuapp.com/api/v1/products.json",
        );
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
        const res = await fetch(
          "https://dummyjson.com/products/category/beauty",
        );
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
    .filter((p) => !isGarbageFashionData(p))
    .filter((p) => p.category !== "clothing" || p.subCategory)
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
