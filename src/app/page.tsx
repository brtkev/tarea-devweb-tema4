"use client";
import Image from "next/image";

import { useState } from "react";
import BookForm, { FormData } from "./BookForm";
import Table, { Data, Column } from "./Table";

export default function Home() {
  // Sample Data
  const books: Data[] = [
    {
      id: 101,
      name: "Alice in Wonderland",
      author: "Lewis Carroll",
      year: "1865",
      genre: "Fantasía",
    },
  ];

  // Column Definitions
  const columns: Column[] = [
    { key: "name", header: "Nombre" },
    { key: "author", header: "Autor" },
    { key: "year", header: "Año" },
    { key: "genre", header: "Género" },
  ];

  // State to manage the table data
  const [tableData, setTableData] = useState<Data[]>(books);

  // Add a new book to the table
  const addBook = (book: FormData) => {
    const newBook: Data = { ...book, id: Math.random() };
    setTableData((tableData) => [...tableData, newBook]);
  };

  // Delete a book from the table
  const deleteBook = (id: number) => {
    setTableData((tableData) => {
      return tableData.filter((item) => item.id !== id);
    });
  };

  const [updateData, setUpdateData] = useState<Data | null>(null);
  const onUpdateBook = (book: Data) => {
    setUpdateData(book);
  };

  // Update a book in the table
  const updateBook = (book: Data) => {
    setTableData((tableData) => {
      return tableData.map((item) => {
        if (item.id === book.id) {
          return { ...item, ...book };
        }
        return item;
      });
    });
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center p-8 pb-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col row-start-2 items-center">
        <h1 className="text-4xl font-bold text-center mb-5">Manejo de Libros</h1>
        <div>
          <BookForm
            onAdd={addBook}
            onUpdate={updateBook}
            updateData={updateData}
            setUpdateData={setUpdateData}
          />
        </div>

        <h1 className="text-4xl font-bold text-center mt-8">Lista de Libros</h1>
        <div>
          <Table
            data={tableData}
            columns={columns}
            onUpdate={onUpdateBook}
            onDelete={deleteBook}
          />
        </div>
      </main>
    </div>
  );
}
