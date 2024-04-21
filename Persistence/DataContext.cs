using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : IdentityDbContext<Domain.AppUser>
    {
        
        public DataContext(DbContextOptions options) : base(options)
        {
        }

        //Job
        public DbSet<Domain.Job> Jobs { get; set; }

        public DbSet<Domain.JobApplication> JobApplications { get; set; }

        public DbSet<Domain.CompanyJobs> CompanyJobs { get; set; }

        //Company
        public DbSet<Domain.Company> Companies { get; set; }

        public DbSet<Domain.CompanyEmployee> CompanyEmployees { get; set; }

        public DbSet<Domain.AppUser> AppUsers { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            

            
            base.OnModelCreating(builder);

            builder.Entity<Domain.JobApplication>(x => x.HasKey(aa => new {aa.AppUserId, aa.JobId}));

            builder.Entity<Domain.JobApplication>()
                .HasOne(u => u.AppUser)
                .WithMany(j => j.Applications)
                .HasForeignKey(u => u.AppUserId);

            builder.Entity<Domain.JobApplication>()
                .HasOne(j => j.Job)
                .WithMany(u => u.Applicants)
                .HasForeignKey(j => j.JobId);

            //Company

            builder.Entity<Domain.CompanyEmployee>(x => x.HasKey(aa => new {aa.AppUserId, aa.CompanyId}));

            builder.Entity<Domain.CompanyJobs>(x => x.HasKey(aa => new {aa.CompanyId, aa.CompanyJobId}));

            builder.Entity<Domain.CompanyJobs>()
                .HasOne(j => j.Company)
                .WithMany(u => u.Jobs)
                .HasForeignKey(j => j.CompanyJobId);

            

            
                

                builder.Entity<Domain.CompanyEmployee>()
                .HasOne(j => j.Company)
                .WithMany(u => u.Employees)
                .HasForeignKey(j => j.CompanyId);
                        
                builder.Entity<Domain.Company>()
                .HasMany(c => c.Employees)
                .WithOne(e => e.Company)
                .OnDelete(DeleteBehavior.Cascade);

                builder.Entity<Domain.Company>()
                .HasMany(c => c.Jobs)
                .WithOne(e => e.Company)
                .OnDelete(DeleteBehavior.Cascade);


               
                



        }

        

    }
}