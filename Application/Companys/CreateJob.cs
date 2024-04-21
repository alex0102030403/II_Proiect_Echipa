using System.Diagnostics;
using Application.Interfaces;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System.Linq;

namespace Application.Companys
{

public class CreateJob
{
    
    public class Command : IRequest
    {
        public Company Company { get; set; }
        public Job Job { get; set; }
        public Guid Id { get; set; }

        public CompanyJobs CompanyJobs { get; set; }
       
    }

    class Handler : IRequestHandler<Command>
    {
        private readonly DataContext _context;

        private readonly IUserAccessor _userAccessor;

        private readonly IMapper _mapper;   
        public Handler(DataContext context, IUserAccessor userAccessor, IMapper mapper)
        {
            _mapper = mapper;
            _userAccessor = userAccessor;
            _context = context;
        }

        public async Task Handle(Command request, CancellationToken cancellationToken)
        {

            //Here we create a new CompanyJob object and assign the company and job to it

            //get the User that owns the company
            
            

            var company = await _context.Companies.SingleOrDefaultAsync(x => x.Id == request.Id);
           
            


            var companyJob = new CompanyJobs
            {
                CompanyId = request.Job.Id.ToString(),
                Company = company,
                
                Job = request.Job,
                IsOwner = true
            };

            _context.CompanyJobs.Add(companyJob);

            var result = await _context.SaveChangesAsync() > 0;

            if (!result) throw new Exception("Problem creating job");

            await _context.SaveChangesAsync();




            
            
            
        }


}
}
}