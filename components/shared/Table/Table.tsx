import {
  ChevronDownIcon,
  ChevronRightIcon,
  SortAscendingIcon,
  SortDescendingIcon,
} from '@heroicons/react/outline';
import React from 'react';
import {
  useTable,
  Column,
  useGroupBy,
  useExpanded,
  useSortBy,
  TableOptions,
} from 'react-table';

export default function Table<T extends Record<string, unknown>>({
  columns,
  data,
  insidePanel = false,
  ...reactTableProps
}: {
  columns: Column<T>[];
  data: T[];
  insidePanel?: boolean;
} & TableOptions<T>) {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns,
        data,
        ...reactTableProps,
      },
      useGroupBy,
      useSortBy,
      useExpanded
    );
  return (
    <div
      className={`overflow-x-auto  ${
        !insidePanel
          ? 'shadow border-b border-gray-200 sm:rounded-lg'
          : 'rounded-b-lg'
      }`}
    >
      <div className="align-middle inline-block min-w-full">
        <div className="overflow-hidden">
          <table
            className="min-w-full divide-y divide-gray-200"
            {...getTableProps()}
          >
            <thead className="bg-white">
              {headerGroups.map((headerGroup, index) => (
                <tr {...headerGroup.getHeaderGroupProps()} key={index}>
                  {headerGroup.headers.map((column, index) => (
                    <th
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                      scope="col"
                      key={index}
                      className="px-6 py-3 text-left text-xs bg-gray-50 font-medium text-gray-500 uppercase tracking-wider"
                    >
                      <div className="flex gap-x-4 items-center">
                        {column.render('Header')}
                        <span>
                          {column.isSorted ? (
                            column.isSortedDesc ? (
                              <SortAscendingIcon className="h-4 w-4" />
                            ) : (
                              <SortDescendingIcon className="h-4 w-4" />
                            )
                          ) : (
                            ''
                          )}
                        </span>
                      </div>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps}>
              {rows.length === 0 && (
                <tr>
                  <td colSpan={columns.length} className="text-center p-5">
                    No data found
                  </td>
                </tr>
              )}
              {rows.map((row, i) => {
                prepareRow(row);
                return (
                  <tr
                    {...row.getRowProps()}
                    key={i}
                    className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                  >
                    {row.cells.map((cell, index) => {
                      return (
                        <td
                          {...cell.getCellProps()}
                          className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
                          key={index}
                        >
                          {cell.isGrouped ? (
                            <>
                              <span
                                {...row.getToggleRowExpandedProps({
                                  className: 'flex items-center',
                                })}
                              >
                                {row.isExpanded ? (
                                  <ChevronDownIcon className="h-4 w-4 mr-2" />
                                ) : (
                                  <ChevronRightIcon className="h-4 w-4 mr-2" />
                                )}{' '}
                                {cell.render('Cell')} ({row.subRows.length})
                              </span>{' '}
                            </>
                          ) : cell.isAggregated ? (
                            cell.render('Aggregated')
                          ) : cell.isPlaceholder ? null : (
                            cell.render('Cell')
                          )}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
