// ─────────────────────────────────────────────
// foodService.js — Mock API Service
// Menggunakan dummyjson.com sebagai sumber data
// dengan fallback ke data lokal jika API gagal
// ─────────────────────────────────────────────

const MOCK_API_URL = 'https://dummyjson.com/recipes?limit=8';

// Daftar harga dalam Rupiah (rotasi)
const PRICE_LIST = [
  'Rp 65.000', 'Rp 55.000', 'Rp 75.000', 'Rp 35.000',
  'Rp 85.000', 'Rp 45.000', 'Rp 70.000', 'Rp 50.000',
];

// Status pesanan (rotasi)
const STATUS_LIST = [
  'Siap Diantar',
  'Sedang Diproses',
  'Dalam Pengiriman',
  'Siap Diambil',
];

/**
 * Mengambil data makanan dari Mock API (dummyjson.com/recipes)
 * Jika gagal, fallback ke data lokal statis.
 * @returns {Promise<Array>} Array of food items
 */
export async function getFoods() {
  try {
    const response = await fetch(MOCK_API_URL);
    if (!response.ok) throw new Error(`HTTP error: ${response.status}`);

    const data = await response.json();

    // Map response API ke format yang digunakan aplikasi
    return data.recipes.map((recipe, index) => ({
      id: String(recipe.id),
      name: recipe.name,
      description: Array.isArray(recipe.instructions) && recipe.instructions.length > 0
        ? recipe.instructions[0].substring(0, 90) + '...'
        : `Hidangan lezat dari ${recipe.cuisine || 'dapur'} kami.`,
      price: PRICE_LIST[index % PRICE_LIST.length],
      image: recipe.image
        || 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80',
      quantity: recipe.servings || 1,
      status: STATUS_LIST[index % STATUS_LIST.length],
      cuisine: recipe.cuisine || 'International',
    }));
  } catch (error) {
    console.log('[foodService] API fetch failed, using local fallback:', error.message);
    return getLocalFallback();
  }
}

/**
 * Data lokal sebagai fallback apabila API tidak dapat diakses
 */
function getLocalFallback() {
  return [
    {
      id: '1',
      name: 'Pizza Margherita',
      description: 'Pizza klasik Italia dengan saus tomat segar, keju mozzarella, dan daun basil harum.',
      price: 'Rp 65.000',
      image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80',
      quantity: 1,
      status: 'Siap Diantar',
      cuisine: 'Italian',
    },
    {
      id: '2',
      name: 'Spaghetti Carbonara',
      description: 'Pasta spaghetti dengan saus creamy dari telur, keju parmesan, dan beef bacon pilihan.',
      price: 'Rp 55.000',
      image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?auto=format&fit=crop&w=800&q=80',
      quantity: 1,
      status: 'Sedang Diproses',
      cuisine: 'Italian',
    },
    {
      id: '3',
      name: 'Lasagna El Zesty',
      description: 'Lasagna berlapis dengan saus khas chef Zesty yang kaya rasa dan keju mozzarella lembut.',
      price: 'Rp 75.000',
      image: 'https://images.unsplash.com/photo-1574894709920-11b28e7367e3?auto=format&fit=crop&w=800&q=80',
      quantity: 1,
      status: 'Dalam Pengiriman',
      cuisine: 'Italian',
    },
    {
      id: '4',
      name: 'Tiramisu Dessert',
      description: 'Kue penutup Italia rasa kopi dengan lapisan krim mascarpone yang lembut dan lezat.',
      price: 'Rp 35.000',
      image: 'https://images.unsplash.com/photo-1571115177098-24ec42ed204d?auto=format&fit=crop&w=800&q=80',
      quantity: 1,
      status: 'Siap Diambil',
      cuisine: 'Italian',
    },
    {
      id: '5',
      name: 'Ayam Bakar Kalasan',
      description: 'Ayam bakar khas Kalasan dengan bumbu rempah tradisional, disajikan dengan lalapan segar.',
      price: 'Rp 45.000',
      image: 'https://images.unsplash.com/photo-1598514983318-2f64f8f4796c?auto=format&fit=crop&w=800&q=80',
      quantity: 1,
      status: 'Siap Diantar',
      cuisine: 'Indonesian',
    },
  ];
}
