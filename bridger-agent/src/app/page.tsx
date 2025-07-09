"use client";

import { apolloClient } from "@/client/graphql/apollo-client";
import { DataTable } from "@/components/data-table/DataTable.component";
import { GreetButton } from "@/components/GreetButton/GreetButton";
import { createColumnHelper } from "@tanstack/react-table";
import { ApolloProvider } from "@apollo/client";
import { Button } from "@chakra-ui/react";

type ClassifiedReviewColumn = {
  date: string;
  description: string;
  spent: number;
  received: number;
  category: string;
  payee: string;
};

const columnHelper = createColumnHelper<ClassifiedReviewColumn>();

const columns = [
  columnHelper.display({
    id: "approve",
    header: "Approve",
    cell: (info) => {
      return <Button variant="solid" onClick={() => {
        // Handle approve action
        console.log("Approved:", info.row.original);

      }}> Approve </Button>;
    }
  }),
  columnHelper.display({
    id: "reject",
    header: "Reject",
    cell: (info) => {
      return <Button
        variant="outline"
        onClick={() => {
          // Handle reject action
          console.log("Rejected:", info.row.original);
        }}
      >
        Reject
      </Button>;
    }
  }),
  columnHelper.accessor("date", {
    header: "Date",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("description", {
    header: "Description",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("spent", {
    header: "Spent",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("received", {
    header: "Received",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("category", {
    header: "Category",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("payee", {
    header: "Payee",
    cell: (info) => info.getValue(),
  }),
];

const data: ClassifiedReviewColumn[] = [
  {
    date: "2023-10-01",
    description: "Coffee Shop",
    spent: 5.0,
    received: 0,
    category: "Food & Drink",
    payee: "Local Cafe",
  },
  {
    date: "2023-10-02",
    description: "Grocery Store",
    spent: 50.0,
    received: 0,
    category: "Groceries",
    payee: "Supermarket",
  },
  {
    date: "2023-10-03",
    description: "Salary",
    spent: 0,
    received: 2000.0,
    category: "Income",
    payee: "Employer",
  },
];

export default function Home() {
  return (
    <ApolloProvider client={apolloClient}>
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
          <h1>Welcome to the Greeter App</h1>
          <GreetButton />
          <DataTable data={data} columns={columns}></DataTable>
        </main>
      </div>
    </ApolloProvider>
  );
}
