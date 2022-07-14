namespace project.dtos
{
    internal interface IGeneric
    {
        long Id { get; set; }
        DateTime CreationDate { get; set; }
        DateTime UpdateDate { get; set; }
    }
}
