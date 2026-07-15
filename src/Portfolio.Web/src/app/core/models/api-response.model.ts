export interface ApiResponse<T> {
  status_code: number;
  is_success: boolean;
  errors: ApiError[] | null;
  data: T | null;
}

export interface ApiError {
  error_message: string;
  error_code: string;
}
