"use client";

import { useQuery } from "@tanstack/react-query";
import { getChipList } from "@/services/product.service";
import type { ProductListParams } from "@/types/app/product";

export const CHIP_LIST_QUERY_KEY = ["chipList"] as const;

export const useChipList = (params?: ProductListParams) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: [...CHIP_LIST_QUERY_KEY, params],
    queryFn: () => getChipList(params),
  });

  return {
    chips: data?.items ?? [],
    total: data?.total ?? 0,
    totalPages: data?.totalPages ?? 0,
    isLoading,
    isError,
  };
};
