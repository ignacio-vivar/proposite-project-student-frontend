import { GET_STUDENT_CALIF_BY_ASSING } from "@/config";
import { UseApiCall } from "@/models";
import { StudentCalifications } from "@/models/grades.model";
import { loadAbort } from "@/utilities";
import api from "./token.interceptor";

export const getStudentCalificationsByAssignature = (
  id: number,
): UseApiCall<StudentCalifications[]> => {
  const controller = loadAbort();
  return {
    call: api.get<StudentCalifications[]>(GET_STUDENT_CALIF_BY_ASSING(id), {
      signal: controller.signal,
    }),
    controller,
  };
};
