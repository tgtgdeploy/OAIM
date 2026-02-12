import { createContext, useContext, useState, useCallback } from "react";

export type Industry = "ecommerce" | "fnb" | "beauty";

interface IndustryContextType {
  industry: Industry;
  setIndustry: (industry: Industry) => void;
  templatePath: string;
  industryLabel: string;
}

const industryTemplateMap: Record<Industry, string> = {
  ecommerce: "/templates/ecommerce",
  fnb: "/templates/fnb",
  beauty: "/templates/beauty",
};

const industryLabelMap: Record<Industry, string> = {
  ecommerce: "E-Commerce",
  fnb: "F&B / Restaurant",
  beauty: "Beauty & Wellness",
};

const IndustryContext = createContext<IndustryContextType | null>(null);

export function IndustryProvider({ children }: { children: React.ReactNode }) {
  const [industry, setIndustryState] = useState<Industry>(() => {
    try {
      const stored = localStorage.getItem("oaim-industry");
      if (stored && (stored === "ecommerce" || stored === "fnb" || stored === "beauty")) {
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
        industryLabel: industryLabelMap[industry],
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
