"use client";

import { useRef } from "react";
import { useServerInsertedHTML } from "next/navigation";
import { createCache, extractStyle, StyleProvider } from "@ant-design/cssinjs";

/**
 * SSR style registry for Ant Design's CSS-in-JS engine under the Next.js
 * App Router. Collects styles generated during the server render and
 * injects them into the HTML `<head>` before hydration, preventing a
 * flash-of-unstyled-content / style mismatch on first paint.
 *
 * This is Ant Design's documented manual setup for the App Router
 * (equivalent to what `@ant-design/nextjs-registry` provides), built on
 * `@ant-design/cssinjs` which already ships as an antd dependency —
 * no extra package install required.
 */
export function AntdStyleRegistry({ children }: { children: React.ReactNode }) {
  const cacheRef = useRef(createCache());
  const insertedRef = useRef(false);

  useServerInsertedHTML(() => {
    if (insertedRef.current) return null;
    insertedRef.current = true;
    return (
      <style
        id="antd-cssinjs"
        dangerouslySetInnerHTML={{ __html: extractStyle(cacheRef.current, true) }}
      />
    );
  });

  return <StyleProvider cache={cacheRef.current}>{children}</StyleProvider>;
}
