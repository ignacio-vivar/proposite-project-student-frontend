import { StudentCalifications } from "@/models";
import { Row } from "@tanstack/react-table";
import React from "react";
import { Badge } from "../ui/badge";

type Props = {
  row: Row<StudentCalifications>;
};

export default function StatusPear({ row }: Props) {
  const status = row.original.status;

  switch (status) {
    case "aprobado":
      return <Badge className="bg-green-300">Aprobado</Badge>;
    case "entregado":
      return <Badge className="bg-blue-300">Entregado</Badge>;
    case "desaprobado":
      return <Badge variant="destructive">Desaprobado</Badge>;
    case "sin-entregar":
      return <Badge className="bg-gray-100">Sin Entregar</Badge>;
    case "rehacer":
      return <Badge className="bg-yellow-300">Rehacer</Badge>;
    default:
      return <Badge variant="outline">Sin Definir</Badge>;
  }
}
