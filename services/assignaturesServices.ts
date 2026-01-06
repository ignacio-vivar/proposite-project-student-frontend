import { UseApiCall } from "@/models";
import { loadAbort } from "@/utilities";
import api from "./token.interceptor";
import { Assignature } from "@/models/assignatures.model";
import { GET_MY_ASSIGNS } from "@/config";

export const getAssignatures = (): UseApiCall<Assignature[]> => {
  const controller = loadAbort();
  return {
    call: api.get<Assignature[]>(GET_MY_ASSIGNS, {
      signal: controller.signal,
    }),
    controller,
  };
};
