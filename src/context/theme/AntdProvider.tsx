"use client";

import { ConfigProvider, theme } from "antd";

const { darkAlgorithm } = theme;

/**
 * Project-wide Ant Design theme — dark, neon, tech-forward palette
 * matching the Tailwind tokens defined in `globals.css` (@theme).
 *
 * Add `locale={thLocale}` (from "antd/locale/th_TH") here if/when
 * Ant Design components that render localized text (DatePicker,
 * Pagination, Table, etc.) are introduced.
 */
export function AntdProvider({ children }: { children: React.ReactNode }) {
  return (
    <ConfigProvider
      theme={{
        algorithm: darkAlgorithm,
        token: {
          colorPrimary: "#6366f1",
          colorInfo: "#6366f1",
          colorLink: "#22d3ee",
          colorLinkHover: "#67e8f9",
          colorBgBase: "#0f172a",
          colorBgContainer: "#1e293b",
          colorBgElevated: "#1e293b",
          colorBgLayout: "#0f172a",
          colorBorder: "#334155",
          colorBorderSecondary: "#1e293b",
          colorTextBase: "#f1f5f9",
          borderRadius: 10,
          fontFamily: "var(--font-sans)",
        },
        components: {
          Button: {
            controlHeight: 40,
            borderRadius: 8,
            fontWeight: 600,
          },
          Tag: {
            borderRadiusSM: 999,
          },
          Modal: {
            contentBg: "#1e293b",
            headerBg: "#1e293b",
          },
          Card: {
            colorBgContainer: "#1e293b",
          },
          Input: {
            colorBgContainer: "#1e293b",
            activeBorderColor: "#6366f1",
            hoverBorderColor: "#6366f1",
          },
          Select: {
            colorBgContainer: "#1e293b",
            optionSelectedBg: "rgba(99, 102, 241, 0.2)",
          },
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
}
