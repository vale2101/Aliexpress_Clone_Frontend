import React from "react";
import { ChevronRight, Home } from "lucide-react";
import { useRouter } from "next/navigation";

interface BreadcrumbItem {
  label: string;
  href?: string;
}


interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  const router = useRouter();

  const handleClick = (href?: string) => {
    if (href) {
      router.push(href);
    }
  };

  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-4">
      <button
        onClick={() => router.push("/")}
        className="hover:text-orange-600 transition-colors"
      >
        Inicio
      </button>
      
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <span className="text-gray-400">&gt;</span>
          {item.href ? (
            <button
              onClick={() => handleClick(item.href)}
              className="hover:text-orange-600 transition-colors"
            >
              {item.label}
            </button>
          ) : (
            <span className="text-gray-900 font-medium">{item.label}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumb;
