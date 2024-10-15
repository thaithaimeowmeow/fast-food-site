using Microsoft.Identity.Client;

namespace APIApp.Models
{
    public class Cart
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public string? Address { get; set; }
        public string? Note { get; set; }
        public string? Status { get; set; }
        public int Total { get; set; }
        public User User { get; set; }
        public List<Cart_item> cart_Items { get; set; } = new List<Cart_item>();

    }
}
