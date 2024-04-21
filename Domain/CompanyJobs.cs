namespace Domain
{
    public class CompanyJobs
    {
        
        public string CompanyId { get; set; }

        public Company Company { get; set; }

        public Guid CompanyJobId { get; set; } 

        public Job Job { get; set; }
        
        public bool IsOwner { get; set; }
        
    }
}