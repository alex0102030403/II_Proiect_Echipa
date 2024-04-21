using Application.Jobs;
using AutoMapper;
using Domain;

namespace Application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<AppUser, AppUser>();

            CreateMap<Job, Job>();

            CreateMap<Domain.Company, Domain.Company>();

            CreateMap<Company,CompanyEmployee>();
            CreateMap<CompanyEmployee,Company>();

            

            CreateMap<CompanyJobs,CompanyJobs>();

            CreateMap<Company,CompanyJobs>();
            CreateMap<CompanyJobs,Company>();

            CreateMap<CompanyEmployee,CompanyEmployee>();

            CreateMap<Job,CompanyJobs>();
            CreateMap<CompanyJobs,Job>();

            

            CreateMap<Job, JobDto>()
            .ForMember(d => d.HostUsername, o => o.MapFrom(s => s.Applicants
            .FirstOrDefault(x => x.IsHost).AppUser.UserName))
            .ForMember(d => d.Aplicants, o => o.MapFrom(s => s.Applicants));

            CreateMap<JobApplication, Profiles.Profile>()
            .ForMember(d => d.DisplayName, o => o.MapFrom(s => s.AppUser.DisplayName))
            .ForMember(d => d.Username, o => o.MapFrom(s => s.AppUser.UserName))
            .ForMember(d => d.Bio, o => o.MapFrom(s => s.AppUser.Bio));

            



            

            
            
        }
    }
}