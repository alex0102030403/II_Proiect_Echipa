using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Companys
{

public class Create
{
    public class Command : IRequest
        {
            public Company Company { get; set; }
           
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

            var companyEmployee = new CompanyEmployee
            {
                AppUser = user,
                Company = request.Company,
                IsOwner = true
            };
            _context.CompanyEmployees.Add(companyEmployee);

            _context.Companies.Add(request.Company);

            var result = await _context.SaveChangesAsync() > 0;

            if (!result) throw new Exception("Problem creating company");
            
            await _context.SaveChangesAsync();

            
            
        }
}

}
}