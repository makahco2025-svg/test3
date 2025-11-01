
import Link from 'next/link';
import Image from 'next/image';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ChevronRight } from 'lucide-react';
import { Button } from './ui/button';

interface CategorySectionProps {
  categories: { name: string; image: string; imageHint: string }[];
}

export function CategorySection({ categories }: CategorySectionProps) {
  return (
    <section className="py-8 sm:py-12 md:py-16">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 md:mb-10">
          <h2 className="font-headline text-2xl sm:text-3xl font-bold text-foreground md:text-4xl">
            تسوق حسب الفئة
          </h2>
          <p className="mx-auto mt-2 sm:mt-4 max-w-2xl text-md sm:text-lg text-muted-foreground">
            تصفح مجموعتنا الواسعة من الزيوت الطبيعية حسب احتياجك.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:gap-6">
          {categories.map((category) => (
            <Card
              key={category.name}
              className="group overflow-hidden rounded-lg shadow-md transition-all hover:shadow-xl"
            >
              <CardContent className="p-0">
                <div className="relative aspect-square w-full">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    data-ai-hint={category.imageHint}
                  />
                </div>
              </CardContent>
              <CardHeader className="p-3 sm:p-4">
                <CardTitle className="font-headline text-base sm:text-lg">
                  {category.name}
                </CardTitle>
              </CardHeader>
            </Card>
          ))}
        </div>
        <div className="mt-8 sm:mt-10 text-center">
            <Button asChild variant="outline">
                <Link href="#">
                    <span>عرض كل الفئات</span>
                    <ChevronRight className="h-4 w-4" />
                </Link>
            </Button>
        </div>
      </div>
    </section>
  );
}
