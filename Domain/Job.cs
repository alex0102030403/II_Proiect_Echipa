namespace Domain
{
    public class Job
    {
        public Job()
        {
            Applicants = new List<JobApplication>();
        }
        public Guid Id { get; set; }

        public string Title { get; set; }

        public DateTime Date { get; set; }

        public string Description { get; set; }

        public string Category { get; set; }

        public string City { get; set; }

        public string Country { get; set; }

        public string Company { get; set; }

        public bool IsClosed { get; set; }

        public ICollection<JobApplication> Applicants { get; set; } = new List<JobApplication>();
        
    }
}