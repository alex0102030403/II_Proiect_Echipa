using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Jobs
{
    public class Create
    {
        public class Command : IRequest
        {
            public Job Job { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;

            

            private readonly IUserAccessor _userAccessor;
            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _context = context;
            }

            public async Task Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await _context.Users.SingleOrDefaultAsync(x => 
                    x.UserName == _userAccessor.GetUsername());

                var applicant = new JobApplication
                {
                    AppUser = user,
                    Job = request.Job,
                    IsHost = true
                };

                request.Job.Applicants.Add(applicant);

                _context.Jobs.Add(request.Job);

                var result = await _context.SaveChangesAsync() > 0;

                if (!result) throw new Exception("Problem creating job");
                
                await _context.SaveChangesAsync();
                
            }


        }
    }
}