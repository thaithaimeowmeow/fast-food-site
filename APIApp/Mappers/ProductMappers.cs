using APIApp.Dtos;
using APIApp.Dtos.ProductRequestDTOs;
using APIApp.Models;

namespace APIApp.Mappers
{
    public static class ProductMappers
    {
        public static ProductDTO toProductDTO(this Product productModel)
        {
            return new ProductDTO
            {
                Id = productModel.Id,
                Name = productModel.Name,
                Quantity = productModel.Quantity,
                Price = productModel.Price,
                Description = productModel.Description,
                Image = productModel.Image
            };
        }

        public static Product toProductFromDTO( this ProductRequestDTO productDTO)
        {

            return new Product
            {
                Name = productDTO.Name,
                Quantity = productDTO.Quantity,
                Price = productDTO.Price,
                Description = productDTO.Description,
                Image = ""
            };
        }

    }
}
