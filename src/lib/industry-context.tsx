import { createContext, useContext, useState, useCallback } from "react";
import { useTranslation } from "react-i18next";

export type Industry = "ecommerce" | "fnb" | "beauty" | "service" | "quant";

interface IndustryContextType {
  industry: Industry;
  setIndustry: (industry: Industry) => void;
  templatePath: string;
  industryLabel: string;
}

const VALID_INDUSTRIES: Industry[] = ["ecommerce", "fnb", "beauty", "service", "quant"];

const industryTemplateMap: Record<Industry, string> = {
  ecommerce: "/templates/ecommerce",
  fnb: "/templates/fnb",
  beauty: "/templates/beauty",
  service: "/templates/service",
  quant: "/templates/quant",
};

const industryLabelKeys: Record<Industry, string> = {
  ecommerce: "sidebar.industry.ecommerceGroup",
  fnb: "sidebar.industry.fnbGroup",
  beauty: "sidebar.industry.beautyGroup",
  service: "sidebar.industry.serviceGroup",
  quant: "sidebar.industry.quantGroup",
};

const IndustryContext = createContext<IndustryContextType | null>(null);

export function IndustryProvider({ children }: { children: React.ReactNode }) {
  const { t } = useTranslation("app");
  const [industry, setIndustryState] = useState<Industry>(() => {
    try {
      const stored = localStorage.getItem("oaim-industry");
      if (stored && VALID_INDUSTRIES.includes(stored as Industry)) {
        return stored as Industry;
      }
    } catch {}
    return "ecommerce";
  });

  const setIndustry = useCallback((ind: Industry) => {
    setIndustryState(ind);
    try {
      localStorage.setItem("oaim-industry", ind);
    } catch {}
  }, []);

  return (
    <IndustryContext.Provider
      value={{
        industry,
        setIndustry,
        templatePath: industryTemplateMap[industry],
        industryLabel: t(industryLabelKeys[industry]),
      }}
    >
      {children}
    </IndustryContext.Provider>
  );
}

export function useIndustry() {
  const ctx = useContext(IndustryContext);
  if (!ctx) {
    return {
      industry: "ecommerce" as Industry,
      setIndustry: () => {},
      templatePath: "/templates/ecommerce",
      industryLabel: "E-Commerce",
    };
  }
  return ctx;
}
