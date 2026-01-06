export const API_BASE_URL = "http://localhost:8000";

export const LOGIN_URL = `${API_BASE_URL}/auth`;

export const GET_MY_ASSIGNS = `${API_BASE_URL}/assignature/getMyCurrentsAssignatures/`;

export const GET_STUDENT_CALIF_BY_ASSING = (assignature_id: number) =>
  `${API_BASE_URL}/student/getStudentCalificationsByAssignature/${assignature_id}`;
