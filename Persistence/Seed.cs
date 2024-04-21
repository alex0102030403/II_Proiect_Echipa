using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Identity;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context, UserManager<AppUser> userManager)
        {
            if (!userManager.Users.Any())
            {
                var users = new List<AppUser>
                {
                    new AppUser
                    {
                        DisplayName = "Bob",
                        UserName = "bob",
                        Email = "bob@test.com"
                    },
                    new AppUser
                    {
                        DisplayName = "Tom",
                        UserName = "tom",
                        Email = "tom@test.com"
                    },
                    new AppUser
                    {
                        DisplayName = "Jane",
                        UserName = "jane",
                        Email = "jane@test.com"
                    }
                };

                foreach (var user in users)
                {
                    await userManager.CreateAsync(user, "Pa$$w0rd");
                }
            }
            
            //if (context.Companies.Any()) return;

            var companies = new List<Company>
            {
                
                new Company
                {
                    Name = "Company 2",
                    Description = "Company 2 description",
                    Category = "drinks",
                    City = "London",
                    Country = "UK",
                    Image = "null",
                    Jobs = new List<CompanyJobs>
                    {   
                        
                    },
                    Employees = new List<CompanyEmployee>
                    {
                        new CompanyEmployee
                        {
                            AppUser = userManager.Users.First(),
                            Position = "Owner",
                            IsOwner = true
                        }
                    }
                },
                
            };
            context.Companies.AddRange(companies);
            await context.SaveChangesAsync();

            

            


            if (context.Jobs.Any()) return;
            
            var jobs = new List<Job>
            {
                new Job
                {
                    Title = "Past Job 1",
                    Date = DateTime.UtcNow.AddMonths(-2),
                    Description = "Job 2 months ago",
                    Category = "drinks",
                    City = "London",
                    Country = "UK",
                    Company = "Pub",
                    Applicants = new List<JobApplication>
                    {
                        new JobApplication
                        {
                            AppUser = userManager.Users.First(),
                            IsHost = true,
                            
                        }
                    }
                },
                new Job
                {
                    Title = "Past Job 2",
                    Date = DateTime.UtcNow.AddMonths(-1),
                    Description = "Job 1 month ago",
                    Category = "culture",
                    City = "Paris",
                    Country = "France",
                    Company = "Louvre",
                },
                new Job
                {
                    Title = "Future Job 1",
                    Date = DateTime.UtcNow.AddMonths(1),
                    Description = "Job 1 month in future",
                    Category = "culture",
                    City = "London",
                    Country = "UK",
                    Company = "British Museum",
                },
                new Job
                {
                    Title = "Future Job 2",
                    Date = DateTime.UtcNow.AddMonths(2),
                    Description = "Job 2 months in future",
                    Category = "music",
                    City = "London",
                    Country = "UK",
                    Company = "O2 Arena",
                },
                new Job
                {
                    Title = "Future Job 3",
                    Date = DateTime.UtcNow.AddMonths(3),
                    Description = "Job 3 months in future",
                    Category = "drinks",
                    City = "London",
                    Country = "UK",
                    Company = "Pub",
                },
                new Job
                {
                    Title = "Future Job 4",
                    Date = DateTime.UtcNow.AddMonths(4),
                    Description = "Job 4 months in future",
                    Category = "drinks",
                    City = "London",
                    Country = "UK",
                    Company = "Pub",
                },
                new Job
                {
                    Title = "Future Job 5",
                    Date = DateTime.UtcNow.AddMonths(5),
                    Description = "Job 5 months in future",
                    Category = "drinks",
                    City = "London",
                    Country = "UK",
                    Company = "Pub",
                },
                new Job
                {
                    Title = "Future Job 6",
                    Date = DateTime.UtcNow.AddMonths(6),
                    Description = "Job 6 months in future",
                    Category = "music",
                    City = "London",
                    Country = "UK",
                    Company = "Pub",

                },
                new Job
                {
                    Title = "Future Job 7",
                    Date = DateTime.UtcNow.AddMonths(7),
                    Description = "Job 2 months ago",
                    Category = "travel",
                    City = "London",
                    Country = "UK",
                    Company = "Pub",
                },
                new Job
                {
                    Title = "Future Job 8",
                    Date = DateTime.UtcNow.AddMonths(8),
                    Description = "Job 8 months in future",
                    Category = "film",
                    City = "London",
                    Country = "UK",
                    Company = "Pub",
                }
            };

            await context.Jobs.AddRangeAsync(jobs);
            await context.SaveChangesAsync();

            if (context.CompanyJobs.Any()) return;

            var company = new List<CompanyJobs>
            {
                new CompanyJobs
                {
                    Company = companies.First(),
                    Job = jobs.Last(),
                    IsOwner = true
                }
            };

            await context.CompanyJobs.AddRangeAsync(company);
            await context.SaveChangesAsync(); 
        }
    }
}