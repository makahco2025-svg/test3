
'use client';

import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';

export function HeroCarousel() {
  const heroImages = PlaceHolderImages.filter((img) =>
    img.id.startsWith('hero-')
  );

  const heroContent = [
    {
      title: 'زيوت طبيعية لنضارة بشرتك',
      description: 'اكتشفي سر الجمال الطبيعي مع تشكيلتنا الفريدة.',
      buttonText: 'تسوقي الآن',
      action: () => {
        const productGrid = document.getElementById('product-grid');
        if (productGrid) {
            productGrid.scrollIntoView({ behavior: 'smooth' });
        }
      },
    },
    {
      title: 'عروض حصرية لفترة محدودة',
      description: 'خصومات تصل إلى 30% على منتجات مختارة.',
      buttonText: 'اكتشف العروض',
      action: () => {
          const offersSection = document.getElementById('offers');
          if (offersSection) {
              offersSection.scrollIntoView({ behavior: 'smooth' });
          }
      },
    },
    {
      title: 'الجودة التي تستحقينها',
      description: 'منتجاتنا معصورة على البارد للحفاظ على كافة فوائدها.',
      buttonText: 'اعرفي المزيد',
      action: () => {
        const siteFooter = document.querySelector('footer');
        if (siteFooter) {
            siteFooter.scrollIntoView({ behavior: 'smooth' });
        }
      },
    },
  ];

  return (
    <section className="w-full">
      <Carousel
        className="w-full"
        plugins={[Autoplay({ delay: 5000, stopOnInteraction: true })]}
        opts={{ loop: true, direction: 'rtl' }}
      >
        <CarouselContent>
          {heroImages.map((img, index) => (
            <CarouselItem key={img.id}>
              <Card className="border-0 p-0 shadow-none rounded-none">
                <CardContent className="relative flex aspect-[2/1] md:aspect-[3/1] items-center justify-center p-0">
                  <Image
                    src={img.imageUrl}
                    alt={img.description}
                    fill
                    className="object-cover brightness-50"
                    data-ai-hint={img.imageHint}
                    priority={index === 0}
                  />
                  <div className="relative z-10 flex flex-col items-center text-center text-white p-4">
                    <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold font-headline">
                      {heroContent[index % heroContent.length].title}
                    </h2>
                    <p className="mt-2 max-w-lg text-base sm:text-lg md:text-xl">
                      {heroContent[index % heroContent.length].description}
                    </p>
                    <Button
                      size="lg"
                      className="mt-4 sm:mt-6 bg-primary hover:bg-primary/90 text-primary-foreground"
                      onClick={heroContent[index % heroContent.length].action}
                    >
                      {heroContent[index % heroContent.length].buttonText}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute start-2 sm:start-4 text-white" />
        <CarouselNext className="absolute end-2 sm:end-4 text-white" />
      </Carousel>
    </section>
  );
}
