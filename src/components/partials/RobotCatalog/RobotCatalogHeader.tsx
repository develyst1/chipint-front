"use client";

import { Search } from "lucide-react";
import { TIER_OPTIONS, SORT_OPTIONS } from "./RobotCatalog.config";

interface Filters {
  tier: string;
  aiProvider: string;
  search: string;
}

interface RobotCatalogHeaderProps {
  filters: Filters;
  onFilterChange: (key: string, value: string) => void;
}

export default function RobotCatalogHeader({ filters, onFilterChange }: RobotCatalogHeaderProps) {
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-extrabold text-white mb-2">
        หุ่นยนต์ <span className="gradient-text">AI</span>
      </h1>
      <p className="text-slate-400 mb-6">เลือกหุ่นยนต์ที่ใช่สำหรับคุณ</p>

      <div className="flex flex-col sm:flex-row gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            value={filters.search}
            onChange={(e) => onFilterChange("search", e.target.value)}
            placeholder="ค้นหาหุ่นยนต์..."
            className="w-full rounded-lg border border-slate-700 bg-slate-800 pl-9 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none transition-colors"
          />
        </div>

        {/* Tier filter */}
        <select
          value={filters.tier}
          onChange={(e) => onFilterChange("tier", e.target.value)}
          className="rounded-lg border border-slate-700 bg-slate-800 px-4 py-2.5 text-sm text-white focus:border-indigo-500 focus:outline-none"
        >
          {TIER_OPTIONS.map(({ value, label }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>

        {/* Sort */}
        <select
          onChange={(e) => onFilterChange("sort", e.target.value)}
          className="rounded-lg border border-slate-700 bg-slate-800 px-4 py-2.5 text-sm text-white focus:border-indigo-500 focus:outline-none"
        >
          {SORT_OPTIONS.map(({ value, label }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
