using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query;
using Persistence;

namespace Application.Jobs
{
    public class List
    {
        public class Query : IRequest<List<Job>> {}

        public class Handler : IRequestHandler<Query, List<Job>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<List<Job>> Handle(Query request, CancellationToken cancellationToken)
            {
                var jobs = await _context.Jobs
                .ProjectTo<Job>(_mapper.ConfigurationProvider)
                .ToListAsync(cancellationToken);
                
                
               
                
                return jobs;
            }
        }
    }
}