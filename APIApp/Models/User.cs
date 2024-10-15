using Microsoft.AspNetCore.Identity;

namespace APIApp.Models
{
    public class User : IdentityUser
    {
        public List<Cart> Carts { get; set; } = new List<Cart>();
    }
}
