using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query;
using Persistence;

namespace Application.Users
{
    public class ListUsers
    {
        public class Query : IRequest<List<Domain.AppUser>> { }

        public class Handler : IRequestHandler<Query, List<Domain.AppUser>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<List<AppUser>> Handle(Query request, CancellationToken cancellationToken)
            {
                var users = await _context.Users
                .ProjectTo<AppUser>(_mapper.ConfigurationProvider)
                .ToListAsync(cancellationToken);
                
                
               
                
                return users;
            }
        }
    }
}