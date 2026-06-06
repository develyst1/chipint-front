export interface CartItemResponse {
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

export interface CartResponse {
  id: string;
  items: CartItemResponse[];
  subtotal: number;
  shippingFee: number;
  discount: number;
  total: number;
  itemCount: number;
}
