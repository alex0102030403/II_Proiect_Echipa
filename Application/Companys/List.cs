using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query;
using Persistence;

namespace Application.Companys
{
    public class List
    {
       public class Query : IRequest<List<Company>> {}

       public class Handler : IRequestHandler<Query, List<Company>>
       {
           private readonly DataContext _context;
           private readonly IMapper _mapper;
           public Handler(DataContext context, IMapper mapper)
           {
               _mapper = mapper;
               _context = context;
           }

           public async Task<List<Company>> Handle(Query request, CancellationToken cancellationToken)
           {
               var companys = await _context.Companies
               .ProjectTo<Company>(_mapper.ConfigurationProvider)
               .ToListAsync(cancellationToken);
               
               
              
               
               return companys;
           }
    }
}
}