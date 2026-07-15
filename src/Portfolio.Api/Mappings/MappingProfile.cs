using AutoMapper;
using Portfolio.Api.Data.Entities;
using Portfolio.Api.DTOs;

namespace Portfolio.Api.Mappings;

public class MappingProfile : AutoMapper.Profile
{
    public MappingProfile()
    {
        CreateMap<Data.Entities.Profile, ProfileDto>();

        CreateMap<Project, ProjectDto>()
            .ForMember(d => d.Technologies,
                opt => opt.MapFrom(s => s.Technologies.OrderBy(t => t.SortOrder).Select(t => t.TechnologyName).ToList()));

        CreateMap<Project, ProjectDetailDto>()
            .ForMember(d => d.Technologies,
                opt => opt.MapFrom(s => s.Technologies.OrderBy(t => t.SortOrder).Select(t => t.TechnologyName).ToList()));

        CreateMap<Experience, ExperienceDto>();

        CreateMap<SkillCategory, SkillCategoryDto>()
            .ForMember(d => d.Skills,
                opt => opt.MapFrom(s => s.Skills.OrderBy(sk => sk.SortOrder)));

        CreateMap<Skill, SkillDto>();

        CreateMap<Education, EducationDto>();

        CreateMap<Certification, CertificationDto>();

        CreateMap<SocialLink, SocialLinkDto>();

        CreateMap<ContactRequestDto, ContactMessage>()
            .ForMember(d => d.Id, opt => opt.Ignore())
            .ForMember(d => d.IsRead, opt => opt.Ignore())
            .ForMember(d => d.CreatedAt, opt => opt.Ignore());
    }
}
