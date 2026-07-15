using System.Text.Json.Serialization;

namespace Portfolio.Api.Models;

public class ApiError
{
    [JsonPropertyName("error_message")]
    public string ErrorMessage { get; set; } = string.Empty;

    [JsonPropertyName("error_code")]
    public string ErrorCode { get; set; } = string.Empty;
}
