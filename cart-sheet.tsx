
'use client';

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetDescription,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/context/cart-context';
import {
  ShoppingCart,
  Trash2,
  Minus,
  Plus,
  PackageCheck,
  Frown,
  MapPin,
  Loader2,
} from 'lucide-react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ScrollArea } from './ui/scroll-area';
import { Separator } from './ui/separator';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';

const phoneRegex = new RegExp(/^(01[0125])[0-9]{8}$/);

const formSchema = z.object({
  name: z.string().min(3, { message: 'الاسم يجب أن يكون 3 أحرف على الأقل.' }),
  phone: z.string().regex(phoneRegex, 'الرجاء إدخال رقم هاتف مصري صحيح.'),
  address: z.string().min(10, { message: 'الرجاء إدخال عنوان تفصيلي.' }),
  googleMapsUrl: z.string().url({ message: 'الرجاء تحديد موقعك أولاً.' }),
  notes: z.string().optional(),
});

export function CartSheet() {
  const {
    cartItems,
    totalItems,
    totalPrice,
    updateQuantity,
    removeFromCart,
    clearCart,
  } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [isFetchingLocation, setIsFetchingLocation] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      phone: '',
      address: '',
      googleMapsUrl: '',
      notes: '',
    },
  });

  const handleFetchLocation = () => {
    setIsFetchingLocation(true);
    setLocationError(null);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const url = `https://www.google.com/maps?q=${latitude},${longitude}`;
          form.setValue('googleMapsUrl', url, { shouldValidate: true });
          setIsFetchingLocation(false);
        },
        (error) => {
          setLocationError(
            'لا يمكن الحصول على الموقع. يرجى التأكد من تفعيل خدمة تحديد الموقع والموافقة على الطلب.'
          );
          setIsFetchingLocation(false);
        }
      );
    } else {
      setLocationError('متصفحك لا يدعم خدمة تحديد الموقع.');
      setIsFetchingLocation(false);
    }
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const cartSummary = cartItems
      .map(
        (item) =>
          `${item.product.name} - الكمية: ${
            item.quantity
          } - السعر: ${(
            (item.product.discountPrice ?? item.product.price) * item.quantity
          ).toFixed(2)} جنيه`
      )
      .join('\n');

    const message = `
*#طلب_جديد_من_المتجر* 🛒
*بيانات العميل:*
  - الاسم: ${values.name}
  - الهاتف: ${values.phone}
  - العنوان: ${values.address}
  - الموقع (GPS): ${values.googleMapsUrl}
  - ملاحظات: ${values.notes || 'لا يوجد'}

*تفاصيل الطلبات:*
${cartSummary}
*الإجمالي الكلي:* ${totalPrice.toFixed(2)} جنيه

برجاء تأكيد الطلب مع العميل. شكراً.
`.trim();

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/201030566078?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');

    form.reset();
    clearCart();
    setIsOpen(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <ShoppingCart className="h-5 w-5" />
          {totalItems > 0 && (
            <Badge className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary p-0 text-xs text-primary-foreground">
              {totalItems}
            </Badge>
          )}
          <span className="sr-only">فتح سلة التسوق</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="flex w-full flex-col sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="font-headline">سلة التسوق</SheetTitle>
          <SheetDescription>
            لديك {totalItems} منتج في سلتك.
          </SheetDescription>
        </SheetHeader>
        <Separator />
        {cartItems.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4">
            <Frown className="h-16 w-16 text-muted-foreground" />
            <p className="text-muted-foreground">سلتك فارغة حاليًا.</p>
            <Button onClick={() => setIsOpen(false)}>ابدأ التسوق</Button>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-1 pr-4">
              <div className="flex flex-col gap-4 py-4">
                {cartItems.map((item) => {
                  const placeholder = PlaceHolderImages.find(
                    (p) => p.id === item.product.image
                  );
                  const price =
                    item.product.discountPrice ?? item.product.price;
                  return (
                    <div key={item.product.id} className="flex items-start gap-4">
                      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-md sm:h-20 sm:w-20">
                        {placeholder && (
                          <Image
                            src={placeholder.imageUrl}
                            alt={item.product.name}
                            fill
                            className="object-cover"
                          />
                        )}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-sm sm:text-base">{item.product.name}</h4>
                        <p className="text-xs sm:text-sm text-muted-foreground">
                          {price.toFixed(2)} جنيه
                        </p>
                        <div className="mt-2 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-6 w-6 sm:h-7 sm:w-7"
                              onClick={() =>
                                updateQuantity(
                                  item.product.id,
                                  item.quantity - 1
                                )
                              }
                            >
                              <Minus className="h-3 w-3 sm:h-4 sm:w-4" />
                            </Button>
                            <span className="text-sm sm:text-base">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-6 w-6 sm:h-7 sm:w-7"
                              onClick={() =>
                                updateQuantity(
                                  item.product.id,
                                  item.quantity + 1
                                )
                              }
                            >
                              <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
                            </Button>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 text-destructive"
                            onClick={() => removeFromCart(item.product.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </ScrollArea>
            <Separator />
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <ScrollArea className="h-auto max-h-64 pr-4">
                  <div className="space-y-4 py-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>الاسم الكامل *</FormLabel>
                          <FormControl>
                            <Input placeholder="اسمك الكامل" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>رقم التليفون *</FormLabel>
                          <FormControl>
                            <Input placeholder="01xxxxxxxxx" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>العنوان التفصيلي *</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="المدينة، الحي، الشارع، رقم العقار"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="googleMapsUrl"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>الموقع على الخريطة *</FormLabel>
                          <FormControl>
                            <div>
                              <Button
                                type="button"
                                variant="outline"
                                className="w-full"
                                onClick={handleFetchLocation}
                                disabled={isFetchingLocation}
                              >
                                {isFetchingLocation ? (
                                  <Loader2 className="ms-2 h-4 w-4 animate-spin" />
                                ) : (
                                  <MapPin className="ms-2 h-4 w-4" />
                                )}
                                <span>
                                  {isFetchingLocation
                                    ? 'جاري تحديد الموقع...'
                                    : field.value
                                    ? 'تم تحديد الموقع بنجاح'
                                    : 'تحديد الموقع الحالي'}
                                </span>
                              </Button>
                              {field.value && (
                                <p className="mt-2 text-xs text-green-600">
                                  تم تحديد موقعك. يمكنك إتمام الطلب الآن.
                                </p>
                              )}
                            </div>
                          </FormControl>
                          <FormMessage />
                          {locationError && (
                             <Alert variant="destructive" className="mt-2">
                               <AlertDescription>{locationError}</AlertDescription>
                             </Alert>
                          )}
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="notes"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>علامة مميزة/ملحوظة للطلب</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="مثال: برجاء الاتصال قبل نصف ساعة من الوصول"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </ScrollArea>
                <SheetFooter className="mt-auto flex flex-col gap-4 pt-4">
                  <div className="flex items-center justify-between text-lg font-bold">
                    <span>الإجمالي:</span>
                    <span>{totalPrice.toFixed(2)} جنيه</span>
                  </div>
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                    disabled={!form.formState.isValid || isFetchingLocation}
                  >
                    <PackageCheck className="ms-2 h-5 w-5" />
                    إتمام الطلب عبر واتساب
                  </Button>
                </SheetFooter>
              </form>
            </Form>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
