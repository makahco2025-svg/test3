
'use client';

import Image from 'next/image';
import type { Product } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useCart } from '@/context/cart-context';
import { ShoppingCart } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const placeholder = PlaceHolderImages.find((p) => p.id === product.image);
  const price = product.discountPrice ?? product.price;

  return (
    <Card className="flex h-full flex-col overflow-hidden rounded-lg shadow-md transition-shadow hover:shadow-xl">
      <CardHeader className="p-0">
        <div className="relative aspect-square w-full">
          {placeholder && (
            <Image
              src={placeholder.imageUrl}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
              data-ai-hint={placeholder.imageHint}
            />
          )}
          {product.discountPrice && (
            <div className="absolute top-2 right-2 rounded-full bg-destructive px-2 py-0.5 text-xs font-bold text-destructive-foreground">
              خصم
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="flex-1 p-3 sm:p-4">
        <CardTitle className="font-headline text-sm sm:text-base leading-tight">{product.name}</CardTitle>
        <CardDescription className="mt-1 text-xs sm:text-sm">
          {product.description}
        </CardDescription>
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-2 p-3 sm:p-4">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-baseline gap-1">
            <span className="text-base sm:text-lg font-bold text-primary">
              {price}
            </span>
             <span className="text-xs sm:text-sm">جنيه</span>
            {product.discountPrice && (
              <span className="text-xs text-muted-foreground line-through">
                {product.price}
              </span>
            )}
          </div>
        </div>
        <Button
          className="w-full"
          size="sm"
          onClick={() => addToCart(product)}
        >
          <ShoppingCart className="ms-2 h-4 w-4" />
          <span>أضف للسلة</span>
        </Button>
      </CardFooter>
    </Card>
  );
}
