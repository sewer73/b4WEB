import { useState, useMemo, lazy, Suspense } from "react";
import { Header } from "@/components/Header";
import { SearchBar } from "@/components/SearchBar";
import { StickySearchBar } from "@/components/StickySearchBar";
import { ProductGrid } from "@/components/ProductGrid";
import { Product, useProducts } from "@/hooks/useProducts";

const ProductDetail = lazy(() =>
  import("@/components/ProductDetail").then((module) => ({
    default: module.ProductDetail,
  }))
);

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const { data: products = [], isLoading, error } = useProducts();

  // Filter products based on search query
  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) return products;
    
    return products.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [products, searchQuery]);

  const handleLikeToggle = (productId: number) => {
    // This could be implemented to save to localStorage or send to backend
    console.log(`Toggled like for product ${productId}`);
  };

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-destructive">Error loading products. Please try again.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <StickySearchBar value={searchQuery} onChange={setSearchQuery} />
      
      {/* Hero Section */}
      <section className="px-4 py-12 bg-gradient-to-b from-muted/20 to-background">
        <div className="max-w-7xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground">
              Discover Amazing Products
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Explore our collection of premium products and experiences
            </p>
          </div>
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
        </div>
      </section>

      {/* Filters and Results */}
      <section className="px-4 pb-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold">
              {filteredProducts.length} products found
            </h2>
          </div>
          
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="aspect-[16/9] bg-muted rounded-2xl mb-4" />
                  <div className="space-y-2">
                    <div className="h-4 bg-muted rounded w-3/4" />
                    <div className="h-4 bg-muted rounded w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <ProductGrid
              products={filteredProducts}
              onProductClick={setSelectedProduct}
              onLikeToggle={handleLikeToggle}
            />
          )}
        </div>
      </section>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <Suspense fallback={<div>Loading...</div>}>
          <ProductDetail
            product={selectedProduct}
            isOpen={!!selectedProduct}
            onClose={() => setSelectedProduct(null)}
          />
        </Suspense>
      )}
    </div>
  );
};

export default Index;
