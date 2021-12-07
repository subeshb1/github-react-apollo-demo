import React from 'react';
import { Switch as HeadlessSwitch } from '@headlessui/react';
import SpinIcon from '../SpinIcon/SpinIcon';

export default function Switch({
  label,
  checked,
  loading,
  setChecked,
}: {
  label?: string;
  checked: boolean;
  loading?: boolean;
  setChecked: (checked: boolean) => void | Promise<unknown>;
}) {
  return (
    <HeadlessSwitch.Group as="div" className="flex items-center">
      <HeadlessSwitch
        checked={checked}
        onChange={(value) => {
          if (!loading) {
            setChecked(value);
          }
        }}
        className={
          (checked ? 'bg-br-primary' : 'bg-gray-200') +
          (loading ? ' cursor-wait ' : '') +
          ' relative inline-flex flex-shrink-0  h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-br-primary'
        }
      >
        <span className="sr-only">Use setting</span>
        <span
          aria-hidden="true"
          className={
            (checked ? 'translate-x-5' : 'translate-x-0') +
            ' pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200'
          }
        />
      </HeadlessSwitch>
      {label && (
        <HeadlessSwitch.Label as="span" className="ml-3">
          <span className="text-sm font-medium text-gray-900">{label}</span>
        </HeadlessSwitch.Label>
      )}
      {loading && <SpinIcon className="h-5 2-5 ml-3" />}
    </HeadlessSwitch.Group>
  );
}
