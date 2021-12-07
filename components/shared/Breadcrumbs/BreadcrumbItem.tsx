import Link from "next/link";
import React from "react";
import { IBreadcrumbItem } from "./Breadcrumbs";

export const BreadcrumbItem = ({ name, to, icon: Icon }: IBreadcrumbItem) => {
  const className = "ml-4 text-sm font-medium  flex";
  if (!to) {
    return (
      <a className={`${className} text-gray-500 hover:text-gray-700`}>
        {Icon && <Icon className="h-5 w-5 flex-shrink-0 mr-3" />}
        {name}
      </a>
    );
  }
  return (
    <Link href={to}>
      <a className={`${className} text-br-primary hover:underline`}>
        {Icon && <Icon className="h-5 w-5 flex-shrink-0 mr-3" />}
        {name}
      </a>
    </Link>
  );
};
