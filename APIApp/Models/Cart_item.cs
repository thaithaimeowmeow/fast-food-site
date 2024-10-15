namespace APIApp.Models
{
    public class Cart_item
    {
        public int id { get; set; }
        public int? CartId { get; set; }
        public int? ProductID { get; set; }
        public int quantity { get; set; }
        public int priceTotal {  get; set; }
        public Cart? Cart { get; set; }
        public Product? Product { get; set; }
    }
}
