using APIApp.Dtos;
using APIApp.Models;

namespace APIApp.Mappers
{
    public static class CartMappers
    {
        public static CartDTO toCartDTO(this Cart model)
        {
            return new CartDTO
            {
               Id = model.Id,
               Address = model.Address,
               Status = model.Status,
               Note = model.Note,
               UserId = model.UserId,
               Total = model.Total,
               cart_Items = model.cart_Items.Select(c => c.toItemDTO()).ToList()

            };
        }

        

    }
}
