import { useQuery } from "@tanstack/react-query";

export interface Product {
  id: number;
  name: string;
  list_price: number;
  compare_list_price: number;
  x_studio_catalogofoto2: string | false;
}

const fetchProducts = async (): Promise<Product[]> => {
  // Replace with your actual n8n webhook URL
  const webhookUrl = "YOUR_N8N_WEBHOOK_URL/getProductos";
  
  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  return response.json();
};

export const useProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  });
};