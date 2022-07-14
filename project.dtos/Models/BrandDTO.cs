namespace project.dtos
{
    public partial class BrandDTO
    {
        public int BrandId { get; set; }
        public string BrandName { get; set; } = null!;
    }

    public partial class BrandDTOTotalOrder : BrandDTO
    {
        public double TotalOrderValue { get; set; }
        public int TotalOrderQnt { get; set; }
    }
}
