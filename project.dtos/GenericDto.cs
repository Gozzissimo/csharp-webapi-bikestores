namespace project.dtos
{
    public class GenericDto : IGeneric
    {
        public long Id { get; set; }
        public DateTime CreationDate { get; set; }
        public DateTime UpdateDate { get; set; }
    }
}
