export interface CartItem {
  id: string;
  productId: string;
  productName: string;
  productNameTh: string;
  productSlug: string;
  imageUrl: string;
  sku: string;
  quantity: number;
  unitPrice: number;
  selectedSkinId?: string;
  selectedSkinName?: string;
  selectedAiProvider?: string;
  subtotal: number;
}

export interface Cart {
  items: CartItem[];
  subtotal: number;
  shippingFee: number;
  discount: number;
  total: number;
  itemCount: number;
}

export interface AddToCartPayload {
  productId: string;
  quantity: number;
  selectedSkinId?: string;
  selectedAiProvider?: string;
}
