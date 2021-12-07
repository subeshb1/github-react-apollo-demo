import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { DotsHorizontalIcon } from '@heroicons/react/outline';
import { Menu, Transition } from '@headlessui/react';
import { classNames, IBreadcrumbItem } from './Breadcrumbs';

export function MobileBreadCrumb({
  navigation,
}: {
  navigation: IBreadcrumbItem[];
}) {
  return (
    <Menu as="div" className="ml-4">
      <div>
        <Menu.Button className="p-0  flex items-center flex-shrink-0 focus:ring-2 focus:ring-br-primary focus:ring-offset-2 focus:outline-none rounded-full">
          <DotsHorizontalIcon className="h-5 w-5 rounded-full flex-shrink-0" />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="origin-top-left absolute left-0 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          {navigation.map((item) => (
            <Menu.Item key={item.name}>
              {({ active }) => (
                <Link
                  to={item.to || ''}
                  className={classNames(
                    active
                      ? 'bg-br-primary bg-opacity-10 text-br-primary'
                      : 'text-gray-700',
                    'block px-4 py-2 text-sm '
                  )}
                >
                  {item.name}
                </Link>
              )}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
