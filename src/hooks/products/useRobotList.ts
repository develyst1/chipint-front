"use client";

import { useQuery } from "@tanstack/react-query";
import { getRobotList } from "@/services/product.service";
import type { ProductListParams } from "@/types/app/product";

export const ROBOT_LIST_QUERY_KEY = ["robotList"] as const;

export const useRobotList = (params?: ProductListParams) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: [...ROBOT_LIST_QUERY_KEY, params],
    queryFn: () => getRobotList(params),
  });

  return {
    robots: data?.items ?? [],
    total: data?.total ?? 0,
    totalPages: data?.totalPages ?? 0,
    isLoading,
    isError,
    error,
  };
};
