import Link from "next/link";
import { ChevronRight } from "@/components/ui/icons";

export function Breadcrumbs({
  category,
  productName,
  className = "",
}: {
  category: string;
  productName: string;
  className?: string;
}) {
  return (
    <nav aria-label="Breadcrumb" className={`py-3 lg:py-3.5 ${className}`}>
      <ol className="flex items-center gap-1.5 text-[11px] lg:text-xs text-muted">
        <li>
          <Link href="/" className="hover:text-ink transition-colors no-underline text-muted">
            Home
          </Link>
        </li>
        <li className="flex items-center">
          <ChevronRight size={10} />
        </li>
        <li>
          <span className="hover:text-ink transition-colors cursor-default">
            {category}
          </span>
        </li>
        <li className="flex items-center">
          <ChevronRight size={10} />
        </li>
        <li className="text-ink font-medium truncate max-w-[200px] lg:max-w-none">
          {productName}
        </li>
      </ol>
    </nav>
  );
}
