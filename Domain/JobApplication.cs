namespace Domain
{
    public class JobApplication
    {
        
        public string AppUserId { get; set; }

        public AppUser AppUser { get; set; }

        public Guid JobId { get; set; }

        public Job Job { get; set; }
        
        public bool IsHost { get; set; }


    }
}