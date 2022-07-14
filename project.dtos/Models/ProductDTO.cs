namespace project.dtos
{
    public partial class ProductDTO
    {
        public int ProductId { get; set; }
        public string ProductName { get; set; } = null!;
        public int BrandId { get; set; }
        public string BrandName { get; set; } = null!;
        public int CategoryId { get; set; }
        public string CategoryName { get; set; } = null!;
        public short ModelYear { get; set; }
        public decimal ListPrice { get; set; }
    }
}
