using Microsoft.EntityFrameworkCore;
using FluentValidation;
using Portfolio.Api.Configuration;
using Portfolio.Api.Data;
using Portfolio.Api.Services.Interfaces;
using Portfolio.Api.Services.Implementations;

namespace Portfolio.Api.Extensions;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddDatabase(this IServiceCollection services, IConfiguration configuration)
    {
        var connectionString = configuration.GetConnectionString("DefaultConnection");
        services.AddDbContext<PortfolioDbContext>(options =>
        {
            options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString))
                   .UseSnakeCaseNamingConvention();
        });

        return services;
    }

    public static IServiceCollection AddGithubConfiguration(this IServiceCollection services, IConfiguration configuration)
    {
        services.Configure<GithubOptions>(configuration.GetSection(GithubOptions.SectionName));
        return services;
    }

    public static IServiceCollection AddApplicationServices(this IServiceCollection services)
    {
        services.AddScoped<IProfileService, ProfileService>();
        services.AddScoped<IProjectService, ProjectService>();
        services.AddScoped<IExperienceService, ExperienceService>();
        services.AddScoped<ISkillService, SkillService>();
        services.AddScoped<IEducationService, EducationService>();
        services.AddScoped<ICertificationService, CertificationService>();
        services.AddScoped<IGithubService, GithubService>();
        services.AddScoped<IContactService, ContactService>();
        services.AddScoped<ISocialLinkService, SocialLinkService>();

        services.AddValidatorsFromAssemblyContaining<Program>();

        return services;
    }

    public static IServiceCollection AddGithubHttpClient(this IServiceCollection services, IConfiguration configuration)
    {
        var token = configuration["Github:Token"];

        services.AddHttpClient("Github", client =>
        {
            client.BaseAddress = new Uri("https://api.github.com/");
            client.DefaultRequestHeaders.Add("Accept", "application/vnd.github.v3+json");
            client.DefaultRequestHeaders.Add("User-Agent", "PortfolioApp");

            if (!string.IsNullOrWhiteSpace(token))
            {
                client.DefaultRequestHeaders.Add("Authorization", $"Bearer {token}");
            }
        });

        return services;
    }
}
