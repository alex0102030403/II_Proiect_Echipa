using AutoMapper;
using AutoMapper.Internal.Mappers;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query;
using Persistence;

namespace Application.Users
{
    public class GetUser
    {
        public class Query : IRequest<AppUser> { 

            public Guid Id { get; set; }
            
        }

        public class Handler : IRequestHandler<Query,AppUser>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<AppUser> Handle(Query request, CancellationToken cancellationToken)
            {
                var user = await _context.Users
                .ProjectTo<AppUser>(_mapper.ConfigurationProvider)
                .FirstOrDefaultAsync(x => x.Id.ToString() == request.Id.ToString(), cancellationToken);

                return user;
            }
        }
    }
}