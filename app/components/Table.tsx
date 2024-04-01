import React from "react";
import { useRouter } from "next/navigation";

import {
  getCoreRowModel,
  type ColumnDef,
  useReactTable,
  flexRender,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  PaginationState,
  Column,
  Table,
} from "@tanstack/react-table";
import InputBox from "./InputBox";
import Button from "./Button";
import {
  BiDownArrow,
  BiSolidLeftArrow,
  BiSolidRightArrow,
  BiUpArrow,
} from "react-icons/bi";
import { BsSearch } from "react-icons/bs";

interface ReactTableProps<T extends object> {
  data: T[];
  columns: ColumnDef<T>[];
}

const CustomTable = <T extends object>({
  data,
  columns,
}: ReactTableProps<T>) => {
  const router = useRouter();

  const [globalFilter, setGlobalFilter] = React.useState<string>("");
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 2,
  });

  const table = useReactTable({
    columns,
    data,
    debugTable: true,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    onGlobalFilterChange: setGlobalFilter,
    state: {
      pagination,
      globalFilter,
    },
  });

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value = "" } = e.target;

    setGlobalFilter(value);
  };

  return (
    <div className="space-y-3 border bg-slate-100 pt-5 ">
      <div className="grid grid-cols-8 px-8">
        <div className="col-span-4 relative">
          <input
            type="text"
            className="w-full h-auto pl-10 pr-4 outline-none focus:ring-1 ring-sky-500 rounded-md  border shadow-sm py-2.5 text-sm  placeholder:text-sm"
            placeholder="Search...."
            /**
             * action
             */
            onChange={handleFilterChange}
          />
          <div className="absolute top-3.5 left-3">
            <BsSearch className="text-gray-500" />
          </div>
        </div>
        <div className="col-span-3" />
        <div className="col-span-1">
          <Button
            label="Add Customer"
            handleOnClick={() => router.push("/registration")}
          />
        </div>
      </div>
      <table className="w-full h-auto shadow-sm">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              <th className="flex w-full justify-center mt-2.5">
                <input type="checkbox" className="justify-self-center" />
              </th>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="py-2.5 px-2 text-xs font-medium text-gray-900 space-y-2 "
                >
                  <div
                    {...{
                      className: header.column.getCanSort()
                        ? "cursor-pointer select-none flex justify-center"
                        : "",
                      /**
                       * action
                       */
                      onClick: header.column.getToggleSortingHandler(),
                    }}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                    {{
                      asc: <BiUpArrow />,
                      desc: <BiDownArrow />,
                    }[header.column.getIsSorted() as string] ?? null}
                  </div>
                  {/* <div>
                    {header.column.getCanFilter() ? (
                      <Filter column={header.column} table={table} />
                    ) : null}
                  </div> */}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="bg-white">
              <td className="flex w-full justify-center mt-3.5">
                <input type="checkbox" />
              </td>
              {row.getVisibleCells().map((cell) => (
                <td
                  className="whitespace-nowrap px-2 py-3 text-center text-sm font-normal text-gray-900"
                  key={cell.id}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {/* Pagination */}
      <div className="w-full h-auto px-5 pb-2 flex justify-between items-center">
        <div className="flex items-center gap-1">
          <p className="text-xs font-medium text-gray-800">
            {table.getState().pagination.pageIndex + 1}
          </p>
          <p className="text-xs font-normal text-gray-600">of</p>
          <p className="text-xs font-medium text-gray-800">{data.length}</p>
        </div>
        <div className="flex space-x-6">
          <div className="flex items-center space-x-3">
            <p className="text-xs font-normal text-gray-600">Row per page</p>
            <select
              className=" outline-none p-1 rounded w-10 text-sm text-gray-600 bg-inherit"
              value={table.getState().pagination.pageSize}
              onChange={(e) => {
                table.setPageSize(Number(e.target.value));
              }}
            >
              {[2, 4, 6, 8].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  {pageSize}
                </option>
              ))}
            </select>
          </div>
          <div className="flex space-x-2 items-center">
            <button
              className={`flex justify-center items-center p-1 border rounded-md shadow-sm ${
                !table.getCanPreviousPage() ? "text-gray-400" : "text-gray-800 "
              }`}
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <BiSolidLeftArrow className="text-sm " />
            </button>
            <p className="text-sm text-gray-800">
              {pagination.pageIndex + 1} / {table.getPageCount()}
            </p>
            <button
              className={`flex justify-center items-center p-1 border rounded-md shadow-sm ${
                !table.getCanNextPage() ? "text-gray-400" : "text-gray-800 "
              }`}
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <BiSolidRightArrow className="text-sm" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomTable;

function Filter({
  column,
  table,
}: {
  column: Column<any, any>;
  table: Table<any>;
}) {
  const firstValue = table
    .getPreFilteredRowModel()
    .flatRows[0]?.getValue(column.id);

  const columnFilterValue = column.getFilterValue();

  return typeof firstValue === "number" ? (
    <div className="flex space-x-2">
      <input
        type="number"
        value={(columnFilterValue as [number, number])?.[0] ?? ""}
        onChange={(e) =>
          column.setFilterValue((old: [number, number]) => [
            e.target.value,
            old?.[1],
          ])
        }
        placeholder={`Min`}
        className="w-24 border shadow rounded"
      />
      <input
        type="number"
        value={(columnFilterValue as [number, number])?.[1] ?? ""}
        onChange={(e) =>
          column.setFilterValue((old: [number, number]) => [
            old?.[0],
            e.target.value,
          ])
        }
        placeholder={`Max`}
        className="w-24 border shadow rounded"
      />
    </div>
  ) : (
    <input
      type="text"
      value={(columnFilterValue ?? "") as string}
      onChange={(e) => column.setFilterValue(e.target.value)}
      placeholder={`Search...`}
      className="w-full placeholder:text-sm placeholder:font-normal py-1.5 px-3 border shadow rounded"
    />
  );
}
