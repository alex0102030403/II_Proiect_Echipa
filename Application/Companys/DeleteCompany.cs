using MediatR;
using Persistence;

namespace Application.Companys
{
    public class DeleteCompany
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }
            public async Task Handle(Command request, CancellationToken cancellationToken)
            {
                var company = await _context.Companies.FindAsync(request.Id);

                _context.Remove(company);

                await _context.SaveChangesAsync();
            }
        }
    }
}