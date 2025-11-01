'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { products as initialProducts } from '@/lib/data';
import type { Product } from '@/lib/types';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Edit, PlusCircle, Trash2 } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function AdminDashboard() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [isClient, setIsClient] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const isAuthenticated = localStorage.getItem('isAdminAuthenticated');
    if (!isAuthenticated) {
      router.push('/admin/login');
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('isAdminAuthenticated');
    router.push('/admin/login');
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedProduct) return;

    const formData = new FormData(e.currentTarget);
    const updatedProduct: Product = {
      ...selectedProduct,
      name: formData.get('name') as string,
      description: formData.get('description') as string,
      price: parseFloat(formData.get('price') as string),
      discountPrice: formData.get('discountPrice')
        ? parseFloat(formData.get('discountPrice') as string)
        : undefined,
      category: formData.get('category') as string,
      image: formData.get('image') as string,
    };

    if (selectedProduct.id === 0) { // New product
        updatedProduct.id = Date.now(); // Simple ID generation
        setProducts(prev => [...prev, updatedProduct]);
    } else { // Existing product
        setProducts(prev => prev.map(p => p.id === updatedProduct.id ? updatedProduct : p));
    }
    
    setIsDialogOpen(false);
    setSelectedProduct(null);
  };

  const handleAddNew = () => {
    setSelectedProduct({
        id: 0, // Placeholder for new product
        name: '',
        description: '',
        price: 0,
        category: '',
        image: 'product-1',
    });
    setIsDialogOpen(true);
  };

  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    setIsDialogOpen(true);
  };

  const handleDelete = (productId: number) => {
    if (confirm('هل أنت متأكد من رغبتك في حذف هذا المنتج؟')) {
      setProducts((prev) => prev.filter((p) => p.id !== productId));
    }
  };


  if (!isClient) {
    return null; // Render nothing on the server
  }

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold font-headline">لوحة التحكم</h1>
        <Button onClick={handleLogout} variant="destructive">
          تسجيل الخروج
        </Button>
      </div>
      
      <div className="mb-4 text-left">
          <Button onClick={handleAddNew}>
              <PlusCircle className="ms-2 h-4 w-4" />
              إضافة منتج جديد
          </Button>
      </div>

      <div className="rounded-lg border shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>الاسم</TableHead>
              <TableHead>السعر</TableHead>
              <TableHead>السعر بعد الخصم</TableHead>
              <TableHead>الفئة</TableHead>
              <TableHead>الإجراءات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>{product.price.toFixed(2)}</TableCell>
                <TableCell>
                  {product.discountPrice?.toFixed(2) || '-'}
                </TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell className="flex gap-2">
                  <Button variant="outline" size="icon" onClick={() => handleEdit(product)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => handleDelete(product.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                  <DialogTitle>{selectedProduct?.id === 0 ? 'إضافة منتج جديد' : 'تعديل المنتج'}</DialogTitle>
              </DialogHeader>
              {selectedProduct && (
                  <form onSubmit={handleFormSubmit}>
                      <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="name" className="text-right">الاسم</Label>
                              <Input id="name" name="name" defaultValue={selectedProduct.name} className="col-span-3" required />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="description" className="text-right">الوصف</Label>
                              <Textarea id="description" name="description" defaultValue={selectedProduct.description} className="col-span-3" required />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="price" className="text-right">السعر</Label>
                              <Input id="price" name="price" type="number" step="0.01" defaultValue={selectedProduct.price} className="col-span-3" required />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="discountPrice" className="text-right">سعر الخصم</Label>
                              <Input id="discountPrice" name="discountPrice" type="number" step="0.01" defaultValue={selectedProduct.discountPrice} className="col-span-3" />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="category" className="text-right">الفئة</Label>
                              <Input id="category" name="category" defaultValue={selectedProduct.category} className="col-span-3" required />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="image" className="text-right">الصورة</Label>
                            <Select name="image" defaultValue={selectedProduct.image}>
                                <SelectTrigger className="col-span-3">
                                    <SelectValue placeholder="اختر صورة" />
                                </SelectTrigger>
                                <SelectContent>
                                    {PlaceHolderImages.filter(p => p.id.startsWith('product-')).map((image) => (
                                        <SelectItem key={image.id} value={image.id}>
                                            {image.description}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                          </div>
                      </div>
                      <DialogFooter>
                          <DialogClose asChild>
                            <Button type="button" variant="secondary">إلغاء</Button>
                          </DialogClose>
                          <Button type="submit">حفظ التغييرات</Button>
                      </DialogFooter>
                  </form>
              )}
          </DialogContent>
      </Dialog>
    </div>
  );
}
