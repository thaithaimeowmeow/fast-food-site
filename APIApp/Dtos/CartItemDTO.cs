using APIApp.Models;

namespace APIApp.Dtos
{
    public class CartItemDTO
    {
        public int Id { get; set; }
        public int quantity { get; set; }
        public int priceTotal { get; set; }
        public int? CartId { get; set; }
        public int? ProductID { get; set; }
        //public Cart? Cart { get; set; }
        //public Product? Product { get; set; }
    }
}
