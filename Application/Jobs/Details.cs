using Domain;
using MediatR;
using Persistence;
using AutoMapper.QueryableExtensions;
using AutoMapper;
using System.Security.Cryptography.X509Certificates;
using Microsoft.EntityFrameworkCore;

namespace Application.Jobs
{
    public class Details
    {
        public class Query : IRequest<JobDto> {

            public Guid Id { get; set; }


        }

        public class Handler : IRequestHandler<Query, JobDto>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<JobDto> Handle(Query request, CancellationToken cancellationToken)
            {
                var job = await _context.Jobs
                    .ProjectTo<JobDto>(_mapper.ConfigurationProvider)
                    .FirstOrDefaultAsync(x => x.Id == request.Id, cancellationToken);

                return job;
            }
        }
    }
}