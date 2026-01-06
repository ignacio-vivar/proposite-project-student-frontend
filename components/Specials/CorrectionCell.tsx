"use client";

import { PopoverTrigger, Popover, PopoverContent } from "../ui/popover";
import { useState } from "react";
import { Button } from "../ui/button";
import { Row } from "@tanstack/react-table";
import { PreviewCalification } from "./PreviewCalification";
import { StudentCalifications } from "@/models";

type Props = {
  row: Row<StudentCalifications>;
};

export function CorrectionCell({ row }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button disabled={!row.original.observation} className="w-full">
          Abrir
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0 border-2 rounded-lg border-sky-500 w-[300px] max-h-[320px] overflow-hidden">
        <PreviewCalification value={row.original.observation} />
      </PopoverContent>
    </Popover>
  );
}
