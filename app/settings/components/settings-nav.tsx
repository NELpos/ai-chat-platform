"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

const examples = [
  {
    name: "Alerts",
    href: "/settings",
  },
  {
    name: "Mail",
    href: "/examples/mail",
    code: "https://github.com/shadcn/ui/tree/main/apps/www/app/(app)/examples/mail",
  },
];

interface SettingsNavProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SettingsNav({ className, ...props }: SettingsNavProps) {
  const pathname = usePathname();

  return (
    <div className="relative">
      <ScrollArea className="max-w-[600px] lg:max-w-none">
        <div className={cn("mb-4 flex items-center", className)} {...props}>
          {examples.map((example) => (
            <Link
              href={example.href}
              key={example.href}
              className={cn(
                "flex h-7 items-center justify-center rounded-full px-4 text-center text-sm transition-colors hover:text-primary",
                pathname?.startsWith(example.href)
                  ? "bg-muted font-medium text-primary"
                  : "text-muted-foreground"
              )}
            >
              {example.name}
            </Link>
          ))}
        </div>
        <ScrollBar orientation="horizontal" className="invisible" />
      </ScrollArea>
    </div>
  );
}

interface SettingsCodeLinkProps {
  pathname: string | null;
}

export function SettingsCodeLink({ pathname }: SettingsCodeLinkProps) {
  const example = examples.find((example) =>
    pathname?.startsWith(example.href)
  );

  if (!example?.code) {
    return null;
  }

  return (
    <Link
      href={example?.code}
      target="_blank"
      rel="nofollow"
      className="absolute right-0 top-0 hidden items-center rounded-[0.5rem] text-sm font-medium md:flex"
    >
      View code
      <ArrowRight className="ml-1 h-4 w-4" />
    </Link>
  );
}
