using APIApp.Models;

namespace APIApp.Interfaces
{
    public interface ITokenService
    {
        string CreateToken(User user);
    }
}
