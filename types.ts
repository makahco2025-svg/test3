export interface Product {
  id: number;
  name: string;
  description: string;
  image: string;
  price: number;
  discountPrice?: number;
  category: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
