import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Check, X, SlidersHorizontal } from 'lucide-react';
import { productsData, productCategories } from '../data/products.js';
import { businessInfo } from '../data/business.js';
import { apiService } from '../services/api.js';
import Container from '../components/common/Container.jsx';
import ProductCard from '../components/cards/ProductCard.jsx';
import CategoryFilter from '../components/gallery/CategoryFilter.jsx';
import Button from '../components/common/Button.jsx';

export const ProductsPage = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState(productsData);

  React.useEffect(() => {
    const fetchProducts = async () => {
      try {
        const live = await apiService.getProducts(activeCategory);
        if (live && live.length > 0) {
          setProducts(live);
        } else if (activeCategory === 'All') {
          setProducts(productsData);
        } else {
          setProducts(productsData.filter((p) => p.category.toLowerCase() === activeCategory.toLowerCase()));
        }
      } catch {
        setProducts(
          activeCategory === 'All'
            ? productsData
            : productsData.filter((p) => p.category.toLowerCase() === activeCategory.toLowerCase())
        );
      }
    };
    fetchProducts();
  }, [activeCategory]);

  const filteredProducts = products;

  return (
    <div className="min-h-screen bg-[#0f0f11] text-[#e8e6e1] pt-28 pb-24">
      {/* Header */}
      <section className="py-12 md:py-20 border-b border-white/10 bg-[#141417]/50">
        <Container size="lg">
          <div className="max-w-3xl">
            <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#c5a880] mb-3 block">
              Showcase Catalog
            </span>
            <h1 className="font-editorial text-4xl sm:text-5xl md:text-6xl font-normal text-white leading-[1.1] mb-6">
              Bespoke Furniture, Doors & Architectural Elements.
            </h1>
            <p className="text-stone-300 text-base sm:text-lg font-light leading-relaxed">
              Explore custom components fabricated in our workshop. Each item is custom-sized and tailored to your space upon order. For custom dimensions, finishes, or custom designs, consult our team directly.
            </p>
          </div>
        </Container>
      </section>

      {/* Product Catalog & Filter */}
      <section className="py-16 md:py-20">
        <Container size="lg">
          <CategoryFilter
            categories={productCategories}
            activeCategory={activeCategory}
            onSelectCategory={setActiveCategory}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product, idx) => (
              <ProductCard
                key={product.id}
                product={product}
                index={idx}
                onSelect={(prod) => setSelectedProduct(prod)}
              />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-20 text-stone-500">
              <p className="text-base">No products found in this category.</p>
            </div>
          )}
        </Container>
      </section>

      {/* Quick Specs Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProduct(null)}
              className="fixed inset-0 bg-black/85 backdrop-blur-md z-40"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative z-50 bg-[#17171a] border border-white/20 p-6 sm:p-8 max-w-xl w-full shadow-2xl"
            >
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 text-stone-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              <span className="text-[10px] uppercase tracking-[0.25em] text-[#c5a880] font-semibold">
                {selectedProduct.category}
              </span>

              <h3 className="font-editorial text-2xl sm:text-3xl font-normal text-white mt-1 mb-4">
                {selectedProduct.name}
              </h3>

              <p className="text-stone-300 text-sm font-light leading-relaxed mb-6">
                {selectedProduct.description}
              </p>

              <div className="mb-6">
                <h4 className="text-xs uppercase tracking-wider text-[#c5a880] font-semibold mb-3">
                  Technical Specifications
                </h4>
                <ul className="space-y-2">
                  {selectedProduct.features.map((feat, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-stone-300">
                      <Check className="w-4 h-4 text-[#c5a880] shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row gap-3">
                <a
                  href={`https://wa.me/91${businessInfo.whatsappPrimary}?text=${encodeURIComponent(
                    `Hello Prem A to Z Interior Design, I am interested in custom-sizing this product: ${selectedProduct.name} (${selectedProduct.category}).`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-3 bg-[#25D366] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#22bf5b] transition-colors"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>Custom Quote on WhatsApp</span>
                </a>

                <button
                  onClick={() => setSelectedProduct(null)}
                  className="px-5 py-3 bg-white/5 hover:bg-white/10 text-xs uppercase tracking-wider text-stone-300 hover:text-white transition-colors"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductsPage;
