using System.Net;
using System.Runtime.Serialization;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Jobs
{
    public class UpdateApplications
    {
       public class Command : IRequest<Unit>
        {
            public string Id { get; set; }
        }

        public class Handler : IRequestHandler<Command, Unit>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            public Handler(DataContext context,IUserAccessor userAccessor)
            {
                _context = context;
                _userAccessor = userAccessor;
            }
            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var job = await _context.Jobs
                    .Include(x => x.Applicants)
                    .ThenInclude(x => x.AppUser)
                    .FirstOrDefaultAsync(x => x.Id == Guid.Parse(request.Id));

                if(job == null) return Unit.Value;

                var user = await _context.Users.FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetUsername());

                if(user == null) return Unit.Value;

                var HostUsername = job.Applicants.FirstOrDefault(x => x.IsHost)?.AppUser?.UserName;

                var applicant = job.Applicants.FirstOrDefault(x => x.AppUser.UserName == user.UserName);

                if(applicant != null && HostUsername == user.UserName)
                {
                    Console.WriteLine("Host");
                    job.IsClosed = !job.IsClosed;
                    Console.WriteLine(job.IsClosed);
                }

                if(applicant != null && HostUsername != user.UserName)
                {
                    job.Applicants.Remove(applicant);
                }

                if(applicant == null)
                {
                    applicant = new JobApplication
                    {
                        AppUser = user,
                        Job = job,
                        IsHost = false,
                        
                    };

                    job.Applicants.Add(applicant);
                }

                var result = await _context.SaveChangesAsync() > 0;

                return result ? Unit.Value : throw new Exception("Problem saving changes");



            }
        }
    }

    
}