import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/**
 * Eyegis Button
 * -------------
 * Single source of truth for every interactive CTA on the site.
 *
 * Base contract:
 *  - min-h 44px on any coarse-pointer device (WCAG 2.5.5)
 *  - visible focus-visible ring using the brand mint token
 *  - disabled state: opacity + not-allowed + no pointer events
 *  - active:scale micro-feedback + reduced-motion aware
 *  - text stays readable (no shrink) via whitespace-nowrap
 */
const buttonVariants = cva(
  [
    "group relative inline-flex items-center justify-center gap-2 whitespace-nowrap",
    "font-medium cursor-pointer select-none",
    "transition-[background-color,color,box-shadow,transform] duration-300 ease-out",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed",
    "aria-disabled:pointer-events-none aria-disabled:opacity-50 aria-disabled:cursor-not-allowed",
    "active:scale-[0.98] motion-reduce:transform-none motion-reduce:transition-none",
    "[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  ].join(" "),
  {
    variants: {
      variant: {
        // Brand primary — dark teal for light backgrounds.
        default:
          "bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 hover:shadow-md",
        // Editorial mint pill — Amazon CTA / high emphasis on dark surfaces.
        mint:
          "bg-mint text-ink shadow-[0_20px_60px_-20px_rgba(134,217,209,0.55)] hover:bg-paper hover:-translate-y-0.5",
        // Paper pill — on dark heroes.
        paper:
          "bg-paper text-ink shadow-[0_18px_40px_-20px_rgba(0,0,0,0.35)] hover:bg-mint hover:-translate-y-0.5",
        // Ink pill — inverse on paper/champagne surfaces.
        ink:
          "bg-ink text-paper hover:bg-teal-deep hover:-translate-y-0.5",
        // Outline for secondary actions on light hero.
        outline:
          "border border-ink/20 bg-transparent text-ink hover:bg-ink hover:text-paper",
        // Outline for dark heroes.
        "outline-paper":
          "border border-paper/40 bg-transparent text-paper hover:bg-paper hover:text-ink",
        // Ghost — tertiary/nav-adjacent actions.
        ghost:
          "bg-transparent text-ink hover:bg-ink/5",
        "ghost-paper":
          "bg-transparent text-paper hover:bg-paper/10",
        // Text link (legal, footer).
        link:
          "bg-transparent text-primary underline-offset-4 hover:underline p-0 h-auto",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
      },
      size: {
        // Rounded rectangle sizes (forms, admin, in-flow).
        default: "h-11 rounded-md px-5 text-sm",
        sm: "h-9 rounded-md px-3.5 text-xs",
        lg: "h-12 rounded-md px-8 text-base",
        icon: "h-11 w-11 rounded-md",
        // Editorial pill sizes (main CTAs across the site).
        pill: "h-11 rounded-full px-6 font-mono text-[11px] uppercase tracking-[0.22em]",
        pillLg: "h-14 rounded-full px-8 font-mono text-[12px] uppercase tracking-[0.24em]",
        pillSm: "h-10 rounded-full px-4 font-mono text-[10px] uppercase tracking-[0.2em]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, type, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        // Buttons default to type="button" to prevent accidental form submits.
        type={asChild ? undefined : type ?? "button"}
        data-cta=""
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
