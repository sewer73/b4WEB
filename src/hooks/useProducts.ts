import { useQuery } from "@tanstack/react-query";

export interface Product {
  id: number;
  name: string;
  list_price: number;
  compare_list_price: number;
  x_studio_catalogofoto2: string | false;
  x_studio_enlace_web?: string;
}

const fetchProducts = async (): Promise<Product[]> => {
  const response = await fetch("https://b4experience.odoo.com/jsonrpc", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      "jsonrpc": "2.0",
      "method": "call",
      "params": {
        "service": "object",
        "method": "execute_kw",
        "args": [
          "b4experience",
          11,
          "619890328c7e",
          "product.template",
          "search_read",
          [],
          {
            "fields": ["name", "list_price", "compare_list_price", "x_studio_catalogofoto2", "x_studio_enlace_web"],
            "context": {}
          }
        ]
      },
      "id": 2
    })
  });

  if (!response.ok) {
    throw new Error("Failed to fetch products from Odoo");
  }

  const data = await response.json();
  return data.result || [];
};

export const useProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  });
};
