using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Portfolio.Api.Data.Entities;

namespace Portfolio.Api.Data.Configurations;

public class ProfileConfiguration : IEntityTypeConfiguration<Profile>
{
    public void Configure(EntityTypeBuilder<Profile> builder)
    {
        builder.ToTable("profile");
        builder.HasKey(e => e.Id);
        builder.Property(e => e.FullName).IsRequired().HasMaxLength(200);
        builder.Property(e => e.Title).IsRequired().HasMaxLength(200);
        builder.Property(e => e.Subtitle).HasMaxLength(300);
        builder.Property(e => e.Bio).HasColumnType("text");
        builder.Property(e => e.AvatarUrl).HasMaxLength(500);
        builder.Property(e => e.Tagline).HasMaxLength(500);
        builder.Property(e => e.Location).HasMaxLength(200);
        builder.Property(e => e.Email).HasMaxLength(200);
        builder.Property(e => e.Phone).HasMaxLength(50);
        builder.Property(e => e.ResumeUrl).HasMaxLength(500);
    }
}

public class ExperienceConfiguration : IEntityTypeConfiguration<Experience>
{
    public void Configure(EntityTypeBuilder<Experience> builder)
    {
        builder.ToTable("experience");
        builder.HasKey(e => e.Id);
        builder.Property(e => e.CompanyName).IsRequired().HasMaxLength(200);
        builder.Property(e => e.Position).IsRequired().HasMaxLength(200);
        builder.Property(e => e.Description).HasColumnType("text");
        builder.Property(e => e.CompanyUrl).HasMaxLength(500);
        builder.Property(e => e.CompanyLogoUrl).HasMaxLength(500);
        builder.Property(e => e.Location).HasMaxLength(200);
    }
}

public class SkillCategoryConfiguration : IEntityTypeConfiguration<SkillCategory>
{
    public void Configure(EntityTypeBuilder<SkillCategory> builder)
    {
        builder.ToTable("skill_category");
        builder.HasKey(e => e.Id);
        builder.Property(e => e.Name).IsRequired().HasMaxLength(100);
        builder.Property(e => e.Icon).HasMaxLength(100);
        builder.HasMany(e => e.Skills).WithOne(s => s.SkillCategory).HasForeignKey(s => s.SkillCategoryId);
    }
}

public class SkillConfiguration : IEntityTypeConfiguration<Skill>
{
    public void Configure(EntityTypeBuilder<Skill> builder)
    {
        builder.ToTable("skill");
        builder.HasKey(e => e.Id);
        builder.Property(e => e.Name).IsRequired().HasMaxLength(100);
        builder.Property(e => e.Icon).HasMaxLength(100);
    }
}

public class ProjectConfiguration : IEntityTypeConfiguration<Project>
{
    public void Configure(EntityTypeBuilder<Project> builder)
    {
        builder.ToTable("project");
        builder.HasKey(e => e.Id);
        builder.Property(e => e.Title).IsRequired().HasMaxLength(200);
        builder.Property(e => e.Slug).IsRequired().HasMaxLength(200);
        builder.HasIndex(e => e.Slug).IsUnique();
        builder.Property(e => e.ShortDescription).HasMaxLength(500);
        builder.Property(e => e.Description).HasColumnType("text");
        builder.Property(e => e.ImageUrl).HasMaxLength(500);
        builder.Property(e => e.LiveUrl).HasMaxLength(500);
        builder.Property(e => e.GithubUrl).HasMaxLength(500);
        builder.HasMany(e => e.Technologies).WithOne(t => t.Project).HasForeignKey(t => t.ProjectId);
    }
}

public class ProjectTechnologyConfiguration : IEntityTypeConfiguration<ProjectTechnology>
{
    public void Configure(EntityTypeBuilder<ProjectTechnology> builder)
    {
        builder.ToTable("project_technology");
        builder.HasKey(e => e.Id);
        builder.Property(e => e.TechnologyName).IsRequired().HasMaxLength(100);
    }
}

public class EducationConfiguration : IEntityTypeConfiguration<Education>
{
    public void Configure(EntityTypeBuilder<Education> builder)
    {
        builder.ToTable("education");
        builder.HasKey(e => e.Id);
        builder.Property(e => e.Institution).IsRequired().HasMaxLength(200);
        builder.Property(e => e.Degree).IsRequired().HasMaxLength(200);
        builder.Property(e => e.FieldOfStudy).HasMaxLength(200);
        builder.Property(e => e.Description).HasColumnType("text");
        builder.Property(e => e.LogoUrl).HasMaxLength(500);
    }
}

public class CertificationConfiguration : IEntityTypeConfiguration<Certification>
{
    public void Configure(EntityTypeBuilder<Certification> builder)
    {
        builder.ToTable("certification");
        builder.HasKey(e => e.Id);
        builder.Property(e => e.Name).IsRequired().HasMaxLength(200);
        builder.Property(e => e.IssuingOrganization).IsRequired().HasMaxLength(200);
        builder.Property(e => e.CredentialId).HasMaxLength(200);
        builder.Property(e => e.CredentialUrl).HasMaxLength(500);
        builder.Property(e => e.LogoUrl).HasMaxLength(500);
    }
}

public class SocialLinkConfiguration : IEntityTypeConfiguration<SocialLink>
{
    public void Configure(EntityTypeBuilder<SocialLink> builder)
    {
        builder.ToTable("social_link");
        builder.HasKey(e => e.Id);
        builder.Property(e => e.Platform).IsRequired().HasMaxLength(100);
        builder.Property(e => e.Url).IsRequired().HasMaxLength(500);
        builder.Property(e => e.Icon).HasMaxLength(100);
    }
}

public class ContactMessageConfiguration : IEntityTypeConfiguration<ContactMessage>
{
    public void Configure(EntityTypeBuilder<ContactMessage> builder)
    {
        builder.ToTable("contact_message");
        builder.HasKey(e => e.Id);
        builder.Property(e => e.Name).IsRequired().HasMaxLength(200);
        builder.Property(e => e.Email).IsRequired().HasMaxLength(200);
        builder.Property(e => e.Subject).HasMaxLength(300);
        builder.Property(e => e.Message).IsRequired().HasColumnType("text");
    }
}
