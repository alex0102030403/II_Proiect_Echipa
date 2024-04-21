using Application.Profiles;
using Domain;
using Persistence.Migrations;


namespace Application.Jobs
{
    public class JobDto
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Category { get; set; }
        public string City { get; set; }
        public string Venue { get; set; }
        public DateTime Date { get; set; }
        public string HostUsername { get; set; }
        public bool IsClosed { get; set; }
        public ICollection<Profile> Aplicants { get; set; }

    }
}