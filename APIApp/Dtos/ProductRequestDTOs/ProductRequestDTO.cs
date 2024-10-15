namespace APIApp.Dtos.ProductRequestDTOs
{
    public class ProductRequestDTO
    {
        public string Name { get; set; }
        public int Quantity { get; set; }
        public int Price { get; set; }
        public string Description { get; set; }
        //public string Image { get; set; }
        public IFormFile? ImageFile { get; set; }
    }
}
