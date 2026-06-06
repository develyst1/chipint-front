"use client";

import { useState } from "react";
import RobotCatalogHeader from "./RobotCatalogHeader";
import RobotCatalogGrid from "./RobotCatalogGrid";
import { DEFAULT_ROBOT_FILTERS } from "./RobotCatalog.config";
import type { RobotTier } from "@/types/app/product";

interface RobotCatalogContentProps {
  initialTier?: RobotTier;
}

export default function RobotCatalogContent({ initialTier }: RobotCatalogContentProps) {
  const [filters, setFilters] = useState({
    ...DEFAULT_ROBOT_FILTERS,
    tier: initialTier ?? "",
  });

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <RobotCatalogHeader filters={filters} onFilterChange={handleFilterChange} />
      <RobotCatalogGrid filters={filters} />
    </div>
  );
}
