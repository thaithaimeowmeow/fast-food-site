using APIApp.Models;

namespace APIApp.Dtos
{
    public class CartDTO
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public string? Address { get; set; }
        public string? Note { get; set; }
        public string? Status { get; set; }
        public int Total {  get; set; }
        public User User { get; set; }
        public List<CartItemDTO> cart_Items { get; set; }

    }
}
