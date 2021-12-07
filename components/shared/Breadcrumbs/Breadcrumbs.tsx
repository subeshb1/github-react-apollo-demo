import { ChevronRightIcon } from '@heroicons/react/solid';
import React from 'react';
import { BreadcrumbItem } from './BreadcrumbItem';

import { MobileBreadCrumb } from './MobileBreadCrumb';

export interface IBreadcrumbItem {
  name: string;
  to?: string;
  icon?: React.ComponentType<{ className: string }>;
}

export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function BreadCrumbs({ items }: { items: IBreadcrumbItem[] }) {
  console.log(items.slice(1));
  return (
    <nav className="flex overflow-y-visible relative" aria-label="Breadcrumb">
      <ol
        role="list"
        className="flex items-center space-x-4 overflow-x-auto py-2"
      >
        {items[0] && (
          <li>
            <div>
              <BreadcrumbItem {...items[0]} />
            </div>
          </li>
        )}
        {items.slice(1).map((item) => (
          <li key={item.name} className="md:block hidden flex-shrink-0">
            <div className="flex items-center">
              <ChevronRightIcon
                className="flex-shrink-0 h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
              <BreadcrumbItem {...item} />
            </div>
          </li>
        ))}

        {items.length >= 3 && (
          <>
            <li className="md:hidden flex-shrink-0">
              <div className="flex items-center">
                <ChevronRightIcon
                  className="flex-shrink-0 h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
                <MobileBreadCrumb
                  navigation={items.slice(1, items.length - 1)}
                />
              </div>
            </li>
          </>
        )}
        <li
          key={items[items.length - 1].name}
          className="md:hidden flex-shrink-0"
        >
          <div className="flex items-center ">
            <ChevronRightIcon
              className="flex-shrink-0 h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
            <BreadcrumbItem {...items[items.length - 1]} />
          </div>
        </li>
      </ol>
    </nav>
  );
}
