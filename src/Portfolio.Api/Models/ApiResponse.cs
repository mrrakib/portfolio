using System.Text.Json.Serialization;

namespace Portfolio.Api.Models;

public class ApiResponse<T>
{
    [JsonPropertyName("status_code")]
    public int StatusCode { get; set; }

    [JsonPropertyName("is_success")]
    public bool IsSuccess { get; set; }

    [JsonPropertyName("errors")]
    public List<ApiError>? Errors { get; set; }

    [JsonPropertyName("data")]
    public T? Data { get; set; }

    public static ApiResponse<T> Success(T data, int statusCode = 200)
    {
        return new ApiResponse<T>
        {
            StatusCode = statusCode,
            IsSuccess = true,
            Data = data
        };
    }

    public static ApiResponse<T> Fail(string errorMessage, string? errorCode = null, int statusCode = 400)
    {
        return new ApiResponse<T>
        {
            StatusCode = statusCode,
            IsSuccess = false,
            Errors = new List<ApiError>
            {
                new() { ErrorMessage = errorMessage, ErrorCode = errorCode ?? "BAD_REQUEST" }
            }
        };
    }

    public static ApiResponse<T> Fail(List<ApiError> errors, int statusCode = 400)
    {
        return new ApiResponse<T>
        {
            StatusCode = statusCode,
            IsSuccess = false,
            Errors = errors
        };
    }
}
