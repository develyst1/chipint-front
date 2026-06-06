"use client";

import { useQuery } from "@tanstack/react-query";
import { getRobotDetail } from "@/services/product.service";

export const ROBOT_DETAIL_QUERY_KEY = ["robotDetail"] as const;

export const useRobotDetail = (slug: string) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: [...ROBOT_DETAIL_QUERY_KEY, slug],
    queryFn: () => getRobotDetail(slug),
    enabled: !!slug,
  });

  return { robot: data ?? null, isLoading, isError, error };
};
