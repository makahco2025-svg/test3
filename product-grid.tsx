
import type { Product } from '@/lib/types';
import { ProductCard } from './product-card';

interface ProductGridProps {
  products: Product[];
  searchQuery?: string;
}

export function ProductGrid({ products, searchQuery }: ProductGridProps) {
  return (
    <section id="product-grid" className="py-8 sm:py-12 md:py-16">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 md:mb-10">
          <h2 className="font-headline text-2xl sm:text-3xl font-bold text-foreground md:text-4xl">
            {searchQuery ? `نتائج البحث عن: "${searchQuery}"` : 'منتجاتنا'}
          </h2>
          {!searchQuery && (
            <p className="mx-auto mt-2 sm:mt-4 max-w-2xl text-md sm:text-lg text-muted-foreground">
              اكتشف مجموعتنا المختارة من الزيوت الطبيعية للعناية الفائقة.
            </p>
          )}
        </div>
        {products.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="mt-10 text-center text-muted-foreground">
            لم يتم العثور على منتجات تطابق بحثك.
          </p>
        )}
      </div>
    </section>
  );
}
