namespace Domain
{
    public class CompanyEmployee
    {
        public string AppUserId { get; set; }

        public AppUser AppUser { get; set; }

        public Guid CompanyId { get; set; }

        public Company Company { get; set; }

        public string Position { get; set; }
        
        public bool IsOwner { get; set; }
    }
}