import { Product } from "@/hooks/useProducts";
import { ProductCard } from "./ProductCard";

interface ProductGridProps {
  products: Product[];
  onProductClick: (product: Product) => void;
  onLikeToggle: (productId: number) => void;
}

export const ProductGrid = ({
  products,
  onProductClick,
  onLikeToggle,
}: ProductGridProps) => {
  return (
    <div className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-6 p-2 space-y-0">
      {products.map((product) => (
        <div key={product.id} className="break-inside-avoid mb-6">
          <ProductCard
            product={product}
            onProductClick={onProductClick}
            onLikeToggle={onLikeToggle}
          />
        </div>
      ))}
    </div>
  );
};