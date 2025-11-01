
import type { Product } from '@/lib/types';
import { ProductCard } from './product-card';

interface OffersSectionProps {
  products: Product[];
}

export function OffersSection({ products }: OffersSectionProps) {
  return (
    <section id="offers" className="bg-secondary py-8 sm:py-12 md:py-16">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 md:mb-10">
          <h2 className="font-headline text-2xl sm:text-3xl font-bold text-accent md:text-4xl">
            عروض لا تفوت
          </h2>
          <p className="mx-auto mt-2 sm:mt-4 max-w-2xl text-md sm:text-lg text-secondary-foreground">
            استفد من خصوماتنا الحصرية على أفضل المنتجات لفترة محدودة.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
