import type { ApiResponse, PageObject, PageParams } from "@/types/api/main/common";
import type {
  ProductResponse,
  RobotProductResponse,
  ChipProductResponse,
} from "@/types/api/main/product";
import type { CartResponse } from "@/types/api/main/cart";
import { mainClient } from "./client";

// Products
export const getRobotListApi = (params?: PageParams & Record<string, unknown>) =>
  mainClient.get<ApiResponse<PageObject<RobotProductResponse>>>("/api/v1/products/robots", { params });

export const getRobotDetailApi = (slug: string) =>
  mainClient.get<ApiResponse<RobotProductResponse>>(`/api/v1/products/robots/${slug}`);

export const getChipListApi = (params?: PageParams & Record<string, unknown>) =>
  mainClient.get<ApiResponse<PageObject<ChipProductResponse>>>("/api/v1/products/chips", { params });

export const getChipDetailApi = (slug: string) =>
  mainClient.get<ApiResponse<ChipProductResponse>>(`/api/v1/products/chips/${slug}`);

export const getFeaturedProductsApi = () =>
  mainClient.get<ApiResponse<ProductResponse[]>>("/api/v1/products/featured");

// Cart
export const getCartApi = () =>
  mainClient.get<ApiResponse<CartResponse>>("/api/v1/cart");

export const addToCartApi = (payload: unknown) =>
  mainClient.post<ApiResponse<CartResponse>>("/api/v1/cart/items", payload);

export const updateCartItemApi = (itemId: string, quantity: number) =>
  mainClient.patch<ApiResponse<CartResponse>>(`/api/v1/cart/items/${itemId}`, { quantity });

export const removeCartItemApi = (itemId: string) =>
  mainClient.delete<ApiResponse<CartResponse>>(`/api/v1/cart/items/${itemId}`);

export const clearCartApi = () =>
  mainClient.delete<ApiResponse<CartResponse>>("/api/v1/cart");
