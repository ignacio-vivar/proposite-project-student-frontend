"use client";
import GradesTable from "@/components/Tables/GradesTable";
import { Tabs, TabsTrigger, TabsContent, TabsList } from "@/components/ui/tabs";
import { useApi } from "@/hooks/useApi";
import { Assignature } from "@/models/assignatures.model";
import { getAssignatures } from "@/services/assignaturesServices";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const { data: dataAssignatures, loading } = useApi(getAssignatures, {
    autoFetch: true,
  });

  const [assignatures, setAssignatures] = useState<Assignature[]>([]);

  useEffect(() => {
    if (
      dataAssignatures &&
      Array.isArray(dataAssignatures) &&
      dataAssignatures.length > 0
    ) {
      setAssignatures(dataAssignatures);
    }
  }, [dataAssignatures]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Cargando contenido...</p>
      </div>
    );
  }
  if (!loading && assignatures.length === 0) {
    return (
      <div className="flex justify-center min-h-scren py-20">
        Usted no dispone de ninguna calificación
      </div>
    );
  }
  return (
    <div className="flex justify-center min-h-scren py-20">
      <Tabs
        defaultValue={assignatures[0]?.tag || "cnc"}
        className="max-w-[90vw] w-full sm:max-w-[320px]"
      >
        <TabsList className="w-full">
          {assignatures?.map((u) => (
            <TabsTrigger key={u.tag} value={u.tag}>
              {u.tag}
            </TabsTrigger>
          ))}
        </TabsList>

        {assignatures?.map((u) => (
          <TabsContent key={`${u.tag}` + `${u.name}`} value={u.tag}>
            <div className="max-h-[80vh] overflow-y-auto">
              <GradesTable id={u.id} />
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
