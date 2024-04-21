using Domain;
using MediatR;
using Persistence;
using AutoMapper.QueryableExtensions;
using AutoMapper;
using System.Security.Cryptography.X509Certificates;
using Microsoft.EntityFrameworkCore;

namespace Application.Companys
{
    public class GetCompany
    {
        public class Query : IRequest<Company> {

            public Guid Id { get; set; }


        }

        public class Handler : IRequestHandler<Query, Company>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Company> Handle(Query request, CancellationToken cancellationToken)
            {
                var company = await _context.Companies
                    .ProjectTo<Company>(_mapper.ConfigurationProvider)
                    .FirstOrDefaultAsync(x => x.Id == request.Id, cancellationToken);

                return company;
            }
        }
    }
}