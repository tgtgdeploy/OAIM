import type { LucideIcon } from "lucide-react";
import type { IconType } from "react-icons";
import { useTranslation } from "react-i18next";

interface StepItem {
  step: string;
  icon: LucideIcon | IconType;
  title: string;
  desc: string;
}

interface StepProcessProps {
  title: string;
  subtitle: string;
  steps: StepItem[];
}

export function StepProcess({ title, subtitle, steps }: StepProcessProps) {
  const { t } = useTranslation("storefront");

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-20" data-testid="section-steps">
      <div className="text-center mb-10">
        <h2 className="text-2xl md:text-3xl font-bold mb-3" data-testid="text-steps-title">{title}</h2>
        <p className="text-muted-foreground max-w-xl mx-auto">{subtitle}</p>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {steps.map((item) => (
          <div key={item.step} className="text-center" data-testid={`step-${item.step}`}>
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground mx-auto mb-4">
              <item.icon className="h-6 w-6" />
            </div>
            <div className="text-xs text-muted-foreground mb-1">{t("step.step", { number: item.step })}</div>
            <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
            <p className="text-sm text-muted-foreground">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
