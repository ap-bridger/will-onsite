"use client";

import { apolloClient } from "@/client/graphql/apollo-client";
import { DataTable } from "@/components/data-table/DataTable.component";
import { GreetButton } from "@/components/GreetButton/GreetButton";
import { createColumnHelper } from "@tanstack/react-table";
import { ApolloProvider } from "@apollo/client";
import { Button, HStack, Spacer } from "@chakra-ui/react";
import { useState } from "react";
import {
  CreateMessageModal,
  Message,
} from "@/components/Transactions/CreateMessageModal";
import {
  FilterableDropdown,
  FilterableDisplayElement,
} from "@/components/dropdown/FilterableDropdown";

type ClassifiedReviewColumn = {
  date: string;
  description: string;
  spent: number;
  received: number;
  category: string;
  payee: string;
  message_id: string | null;
};

const columnHelper = createColumnHelper<ClassifiedReviewColumn>();

const initialData: ClassifiedReviewColumn[] = [
  {
    date: "2023-10-01",
    description: "Coffee Shop",
    spent: 5.0,
    received: 0,
    category: "Food & Drink",
    payee: "Local Cafe",
    message_id: null,
  },
  {
    date: "2023-10-02",
    description: "Grocery Store",
    spent: 50.0,
    received: 0,
    category: "Groceries",
    payee: "Supermarket",
    message_id: null,
  },
  {
    date: "2023-10-03",
    description: "Salary",
    spent: 0,
    received: 2000.0,
    category: "Income",
    payee: "Employer",
    message_id: null,
  },
];

export default function Home() {
  const [data, setData] = useState<ClassifiedReviewColumn[]>(initialData);
  const [messages, setMessages] = useState<Message[]>([]);

  const addMessage = (message: Message) => {
    setMessages((prev) => {
      return [...prev, message];
    });
  };

  const [createModalOpen, setCreateModalOpen] = useState(false);

  const columns = [
    columnHelper.display({
      id: "approve",
      header: "Approve",
      cell: (info) => {
        return (
          <Button
            variant="solid"
            onClick={() => {
              // Handle approve action
              console.log("Approved:", info.row.original);
            }}
          >
            {" "}
            Approve{" "}
          </Button>
        );
      },
    }),
    columnHelper.display({
      id: "reject",
      header: "Reject",
      cell: (info) => {
        return (
          <Button
            variant="outline"
            onClick={() => {
              // Handle reject action
              console.log("Rejected:", info.row.original);
            }}
          >
            Reject
          </Button>
        );
      },
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
    columnHelper.accessor("message_id", {
      header: "Message",
      cell: (info) => (
        <FilterableDropdown
          label=""
          placeholderText="Select a message"
          options={messages.map((msg) => ({
            key: msg.id,
            displayName: msg.text,
            label: "Message",
            value: msg.id,
          }))}
          selectedText={
            messages.find((msg) => msg.id === info.getValue())?.text ??
            undefined
          }
          onSelect={(newMessageId) => {
            const rowIndex = info.row.index;
            setData((currentData) => {
              const newData = [...currentData];
              newData[rowIndex].message_id = newMessageId;
              return newData;
            });
          }}
          onAddNew={() => {
            setCreateModalOpen(true);
          }}
        />
      ),
    }),
  ];

  return (
    <ApolloProvider client={apolloClient}>
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
          <h1>Welcome to the Greeter App</h1>
          <GreetButton />
          <DataTable data={data} columns={columns}></DataTable>
          <CreateMessageModal
            isOpen={createModalOpen}
            onClose={() => setCreateModalOpen(false)}
            onCreate={addMessage}
          />
        </main>
      </div>
    </ApolloProvider>
  );
}
