"use client";

import { useMemo, useState } from "react";
import Dexie from "dexie";

import type { ColumnDef } from "@tanstack/react-table";
import Table from "./components/Table";
import { useLiveQuery } from "dexie-react-hooks";
import { TCustomer } from "./registration/types";

const db = new Dexie("customerTb");
db.version(1).stores({
  customer: "++id,fullName,nrc,phoneNo,email,region, state, township,address",
});

// @ts-ignore
const { customer } = db;

const cols: ColumnDef<TCustomer>[] = [
  {
    header: "ID",
    cell: (row) => row.renderValue(),
    accessorKey: "id",
  },
  {
    header: "NAME",
    cell: (row) => row.renderValue(),
    accessorKey: "fullName",
  },
  {
    header: "ADDRESS",
    cell: (row) => row.renderValue(),
    accessorKey: "address",
  },
  {
    header: "NRC",
    cell: (row) => row.renderValue(),
    accessorKey: "nrc",
  },
  {
    header: "EMAIL",
    cell: (row) => row.renderValue(),
    accessorKey: "email",
  },
  {
    header: "MOBILE NUMBER",
    cell: (row) => row.renderValue(),
    accessorKey: "phoneNo",
  },
];

export default function Home() {
  const customers = useLiveQuery(() => customer.toArray(), []);
  console.log(customers);
  const colList = useMemo(() => cols, []);

  return (
    <div className="w-auto space-y-8 px-2 md:px-5 lg:px-10 py-4 md:py-8 lg:py-10">
      <Table columns={colList} data={customers || []} />
    </div>
  );
}
