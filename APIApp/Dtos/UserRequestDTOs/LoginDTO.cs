using System.ComponentModel.DataAnnotations;

namespace APIApp.Dtos.UserRequestDTOs
{
    public class LoginDTO
    {
        [Required]
        public string Username { get; set; }
        [Required]
        public string Password { get; set; }
    }
}
