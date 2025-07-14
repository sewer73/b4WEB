import { useState, useMemo } from "react";
import { Header } from "@/components/Header";
import { SearchBar } from "@/components/SearchBar";
import { StickySearchBar } from "@/components/StickySearchBar";
import { ProductGrid } from "@/components/ProductGrid";
import { useProducts, Product } from "@/hooks/useProducts";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const { data: products, isLoading, error } = useProducts();

  const filteredProducts = useMemo(() => {
    if (!products || !searchQuery.trim()) return products || [];
    
    return products.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [products, searchQuery]);

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
              Descubre Productos Increíbles
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Encuentra productos únicos de nuestra colección
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
              {filteredProducts?.length || 0} productos encontrados
            </h2>
          </div>
          
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="aspect-[4/3] bg-muted rounded-2xl mb-4" />
                  <div className="space-y-2">
                    <div className="h-4 bg-muted rounded w-3/4" />
                    <div className="h-4 bg-muted rounded w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <ProductGrid
              products={filteredProducts || []}
              onProductClick={setSelectedProduct}
            />
          )}
        </div>
      </section>

      {/* Product detail can be implemented later if needed */}
    </div>
  );
};

export default Index;
