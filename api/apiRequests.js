export async function getAllProducts() {
  try {
    const response = await fetch(
      `https://649b5496bf7c145d023a3abb.mockapi.io/cards`
    );
    const data = await response.json();
    return data;
  } catch (e) {
    return { error: `${e.name}: ${e.message}` };
  }
}

export async function getProductById(id) {
  try {
    const response = await fetch(
      `https://649b5496bf7c145d023a3abb.mockapi.io/cards/${id}`
    );
    const data = await response.json();
    return data;
  } catch (e) {
    return { error: `${e.name}: ${e.message}` };
  }
}

export async function toggleIsFavoriteProductById(id, isFavorite) {
  fetch(`https://649b5496bf7c145d023a3abb.mockapi.io/cards/${id}`, {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ isFavorite }),
  });
}
