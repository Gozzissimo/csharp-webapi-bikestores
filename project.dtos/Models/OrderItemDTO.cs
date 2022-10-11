using System.ComponentModel.DataAnnotations;

namespace project.dtos
{
    public partial class OrderItemDTO
    {
        [Required]
        public int OrderId { get; set; }
        [Required]
        public int ItemId { get; set; }
        [Required]
        public int ProductId { get; set; }
        public string? ProductName { get; set; } //DA TOGLIERE SE USO ProductDTORequest
        [Required]
        public int Quantity { get; set; }
        [Required]
        public decimal ListPrice { get; set; }
        [Required]
        public decimal Discount { get; set; }
    }
}
