// apiUtil.ts
export const generateImage = async (searchQuery: string) => {
  try {
    const response = await fetch("http://localhost:5000/generate-image", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt: searchQuery }),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data.image_url;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const fetchProducts = async (searchQuery: string) => {
  try { 
    const response = await fetch("http://localhost:5000/relevant-products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ product_idea: searchQuery }),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return response.json();
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
    throw error;
  }
};
