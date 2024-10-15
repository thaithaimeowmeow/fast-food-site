using APIApp.Dtos;
using APIApp.Dtos.CartRequestDTOs;
using APIApp.Dtos.ProductRequestDTOs;
using APIApp.Models;

namespace APIApp.Mappers
{
    public static class CartItemMappers
    {
        public static CartItemDTO toItemDTO(this Cart_item model)
        {
            return new CartItemDTO
            {
                Id = model.id,
                quantity = model.quantity,
                priceTotal = model.priceTotal,
                CartId = model.CartId,
                ProductID = model.ProductID
            };
        }

       
    }
    
}
