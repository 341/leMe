"use client";

import { useLayoutEffect } from "react";
import { registerPortfolioWebMcpTools } from "@/lib/webmcp/register";

export function WebMcpProvider() {
  useLayoutEffect(() => {
    const controller = new AbortController();
    void registerPortfolioWebMcpTools(controller.signal);
    return () => controller.abort();
  }, []);

  return null;
}
