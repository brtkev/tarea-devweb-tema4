"use client";
import React from "react";

export interface Column {
  key: string;
  header: string;
}

export interface Data {
  id: number;
  name: string;
  author: string;
  year: string;
  genre: string;
}

interface TableProps {
  data: Data[];
  columns: Column[];
  onDelete: (id: number) => void;
  onUpdate: (book: Data) => void;
}

function Table({ data, columns, onDelete, onUpdate }: TableProps) {
  return (
    <div>
      <table>
        {/* Table Header */}
        <thead>
          <tr>
            {columns.map((column: Column) => (
              <th key={column.key}>{column.header}</th>
            ))}
            <th className="border border-slate-300 p-2 text-left">Acciones</th>
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          {data.map((row: Data) => (
            <tr key={row.id}>
              {/* Book Data */}
              {columns.map((column: Column) => (
                <td key={column.key}>{row[column.key as keyof Data]}</td>
              ))}
              {/* Actions */}
              <td className="border border-slate-300 p-2 space-x-2">
                <button
                  onClick={() => onUpdate(row)}
                  className="px-3 py-1 text-sm bg-blue-500 hover:bg-blue-600 text-white rounded"
                >
                  Actualizar
                </button>
                <button
                  onClick={() => onDelete(row.id)}
                  className="px-3 py-1 text-sm bg-red-500 hover:bg-red-600 text-white rounded"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
