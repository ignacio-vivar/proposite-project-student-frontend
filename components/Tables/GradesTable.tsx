"use client";

import { useEffect, useState, useCallback, useRef, useMemo } from "react";
import {
  Column,
  Table,
  ColumnDef,
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
  RowData,
} from "@tanstack/react-table";
import { Input } from "../ui/input";
import { useApi } from "@/hooks/useApi";
import { StudentCalifications } from "@/models/grades.model";
import { CorrectionCell } from "../Specials/CorrectionCell";
import { getStudentCalificationsByAssignature } from "@/services/gradesServices";
import StatusPear from "../Stylers/StatusPear";

declare module "@tanstack/react-table" {
  interface TableMeta<TData extends RowData> {
    updateData: (rowIndex: number, columnId: string, value: unknown) => void;
  }
}

// Hook personalizado para evitar reset de paginación
function useSkipper() {
  const shouldSkipRef = useRef(true);
  const shouldSkip = shouldSkipRef.current;

  const skip = useCallback(() => {
    shouldSkipRef.current = false;
  }, []);

  useEffect(() => {
    shouldSkipRef.current = true;
  });

  return [shouldSkip, skip] as const;
}

type Props = {
  id: number;
};
// Componente principal
export default function GradesTable({ id }: Props) {
  const requestFn = useCallback(
    () => getStudentCalificationsByAssignature(id),
    [id],
  );
  const { data: dataAssigments, fetch: refetchAssigments } = useApi(requestFn, {
    autoFetch: true,
  });

  // Definición de columnas

  const columns = useMemo<ColumnDef<StudentCalifications>[]>(
    () => [
      { header: "Trabajo", accessorFn: (row) => row.task.description },
      {
        header: "Nota",
        accessorKey: "grade",
      },
      {
        header: "Obs.",
        accessorKey: "observation",
        cell: ({ row }) => <CorrectionCell row={row} />,
      },

      {
        header: "Estado",
        accessorKey: "status",
        cell: ({ row }) => <StatusPear row={row} />,
      },
    ],
    [],
  );

  const [data, setData] = useState(dataAssigments || []);

  useEffect(() => {
    if (dataAssigments) {
      setData(dataAssigments);
    }
  }, [dataAssigments, refetchAssigments]);

  const [autoResetPageIndex, skipAutoResetPageIndex] = useSkipper();

  const table = useReactTable({
    data,
    columns,
    //defaultColumn,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    autoResetPageIndex,
    initialState: {
      pagination: { pageSize: 3, pageIndex: 0 },
    },
    meta: {
      updateData: (rowIndex, columnId, value) => {
        skipAutoResetPageIndex();
        setData((old) =>
          old.map((row, index) => {
            if (index === rowIndex) {
              return {
                ...old[rowIndex]!,
                [columnId]: value,
              };
            }
            return row;
          }),
        );
      },
    },
  });

  return (
    <div className="mx-auto">
      <div className="border rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    colSpan={header.colSpan}
                    className="px-2 py-2 text-center border-b"
                  >
                    {header.isPlaceholder ? null : (
                      <div className="space-y-3">
                        <div className="font-semibold">
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                        </div>
                      </div>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="overflow-auto">
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="hover:bg-gray-50 border-2 border-gray-200 overflow-hidden "
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="px-2 py-2 border-b text-center text-sm h-[100px]"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-2 text-xs text-gray-500 text-center">
        <span className="font-medium">Referencias:</span>
        <span className="ml-2">Obs. = Observaciones</span>
        {/* Puedes agregar más si necesitas */}
      </div>
      <div className="mt-4 flex flex-row justify-around items-center gap-2">
        <button
          className="px-3 py-1 border rounded hover:bg-gray-100 disabled:opacity-50"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {"<"}
        </button>
        <button
          className="px-3 py-1 border rounded hover:bg-gray-100 disabled:opacity-50"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          {">"}
        </button>

        <span className="flex items-center gap-1">
          <strong>
            Página {table.getState().pagination.pageIndex + 1} de{" "}
            {table.getPageCount()}
          </strong>
        </span>
      </div>
    </div>
  );
}
