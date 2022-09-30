using System.ComponentModel.DataAnnotations;

namespace project.dtos
{
    public partial class ProductDTO
    {
        public int ProductId { get; set; }
        [Required]
        public string? ProductName { get; set; }
        [Required]
        public int BrandId { get; set; }
        public string? BrandName { get; set; } //DA TOGLIERE SE USO ProductDTORequest
        [Required]
        public int CategoryId { get; set; }
        public string? CategoryName { get; set; } //DA TOGLIERE SE USO ProductDTORequest 
        [Required]
        public short ModelYear { get; set; }
        [Required]
        public decimal ListPrice { get; set; }
    }

    public class ProductDTORequest : ProductDTO
    {

    }

    public class ProductDTOResponse : ProductDTO
    {
        public string BrandName { get; set; } = null!;
        public string CategoryName { get; set; } = null!;
    }
}
