using APIApp.Data;
using APIApp.Dtos;
using APIApp.Dtos.CartRequestDTOs;
using APIApp.Dtos.ProductRequestDTOs;
using APIApp.Mappers;
using APIApp.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace APIApp.Controllers
{
    [ApiController]
    [Route("api/cart")]
    [Authorize]
    public class CartController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly ApplicationDBContext _context;
        public CartController(ApplicationDBContext context, UserManager<User> userManager)
        {
            _context = context;
            _userManager = userManager;
        }


        [HttpGet("admin/orders")]
        [Authorize]
        public async Task<IActionResult> GetAllOrders()
        {
            var nonOrderingCarts = await _context.carts
                .Include(c => c.cart_Items)
                .Where(c => c.Status != "Ordering") 
                .ToListAsync();

            var cartDTO = nonOrderingCarts.Select(s => s.toCartDTO());

            return Ok(cartDTO);
        }


        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetAll()
        {

            var USERNAME = User.GetUsername();
            var user = await _userManager.FindByNameAsync(USERNAME);

            var carts = await _context.carts
                             .Where(c => c.UserId == user.Id)  // Filter by UserId
                             .Include(c => c.cart_Items)       // Include related items
                             .ToListAsync();

            // Convert carts to DTO
            var cartDTO = carts.Select(s => s.toCartDTO()).ToList();

            return Ok(cartDTO);
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> Create([FromForm] CartRequestDTO createDTO)
        {

            var USERNAME = User.GetUsername();
            var user = await _userManager.FindByNameAsync(USERNAME);

            var cartModel = await CreateCart(createDTO, user.Id);
            return CreatedAtAction(nameof(GetById), new { id = cartModel.Id }, cartModel.toCartDTO());

        }

        [HttpGet("{id}")]
        [Authorize]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            var cart = await _context.carts.Include(c => c.cart_Items).FirstOrDefaultAsync(i => i.Id == id);
            if (cart == null)
            {
                return NotFound();
            }
            return Ok(cart.toCartDTO());
        }

        [HttpPut("checkout")]
        [Authorize]
        public async Task<IActionResult> CheckOut([FromBody] CartRequestDTO checkoutRequestDTO)
        {
            var USERNAME = User.GetUsername();
            var user = await _userManager.FindByNameAsync(USERNAME);

            var cart = await _context.carts
                .Include(c => c.cart_Items) 
                .FirstOrDefaultAsync(c => c.Status == "Ordering" && c.UserId == user.Id);

            if (cart == null)
            {
                return NotFound();
            }

            cart.Total = cart.cart_Items.Sum(item => item.priceTotal); 
            cart.Address = checkoutRequestDTO.Address;
            cart.Note = checkoutRequestDTO.Note;
            cart.Status = "Pending";

            // Save changes to the database
            await _context.SaveChangesAsync();

            return Ok(cart.toCartDTO());
        }

        [HttpPut("edit/{id}")]
        [Authorize]
        public async Task<IActionResult> EditOrder ([FromRoute] int id, [FromBody] OrderStatusRequestDTO requestDTO)
        {
  
            var cart = await _context.carts
                .FirstOrDefaultAsync(x => x.Id == id);

            if (cart == null)
            {
                return NotFound();
            }

            cart.Status = requestDTO.Status;

            await _context.SaveChangesAsync();

            return Ok(cart.toCartDTO());
        }



        [HttpGet("/api/cart/items")]
        [Authorize]
        public async Task<IActionResult> GetAllItems()
        {
            

            var USERNAME = User.GetUsername();
            var user = await _userManager.FindByNameAsync(USERNAME);


            var cart = await _context.carts.Include(c => c.cart_Items)
                  .FirstOrDefaultAsync(c => c.Status == "Ordering" && c.UserId == user.Id);


            if (cart == null)
            {
                return NotFound("Cart not found.");
            }

            //var cartItems = await _context.cart_items
            //                         .Where(ci => ci.CartId == cart.Id)
            //                         .ToListAsync();

            //var cartDTO = cartItems.Select(s => s.toItemDTO()).ToList();
            var cartDTO = cart.toCartDTO();

            return Ok(cartDTO);
        }


        [HttpDelete]
        [Route("{id}")]
        [Authorize]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            var cartModel = await _context.carts
                .Include(c => c.cart_Items) 
                .FirstOrDefaultAsync(x => x.Id == id);

            if (cartModel == null)
            {
                return NotFound();
            }

            _context.cart_items.RemoveRange(cartModel.cart_Items);

            _context.carts.Remove(cartModel);

            await _context.SaveChangesAsync();

            return NoContent();
        }






        [HttpPost("/api/item")]
        [Authorize]
        public async Task<IActionResult> addToCart([FromBody] ItemRequestDTO requestDTO)
        {
            var USERNAME = User.GetUsername();
            var user = await _userManager.FindByNameAsync(USERNAME);

            // Find or create an ordering cart for the user
            var cart = await _context.carts
                .Include(c => c.cart_Items) // Include cart items
                .FirstOrDefaultAsync(c => c.Status == "Ordering" && c.UserId == user.Id);

            if (cart == null)
            {
                var createDTO = new CartRequestDTO
                {
                    Address = string.Empty,
                    Note = string.Empty
                };
                cart = await CreateCart(createDTO, user.Id);
            }

            // Find the product being added to the cart
            var product = await _context.products.FindAsync(requestDTO.ProductID);
            if (product == null)
            {
                return NotFound();
            }

            // Check if the product is already in the cart
            var existingItem = cart.cart_Items.FirstOrDefault(item => item.ProductID == product.Id);

            if (existingItem != null)
            {
                // If the product is already in the cart, increment the quantity
                existingItem.quantity += requestDTO.quantity;
                existingItem.priceTotal += product.Price * requestDTO.quantity;

                // Update the cart item
                _context.cart_items.Update(existingItem);
            }
            else
            {
                // If the product is not in the cart, create a new cart item
                var newItem = new Cart_item
                {
                    CartId = cart.Id,
                    ProductID = product.Id,
                    quantity = requestDTO.quantity,
                    priceTotal = product.Price * requestDTO.quantity
                };

                await _context.cart_items.AddAsync(newItem);
            }

            // Save changes to the cart and cart items
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetById), new { id = cart.Id }, cart.toCartDTO());
        }



        [HttpDelete]
        [Route("/api/item/{id}")]
        [Authorize]
        public async Task<IActionResult> DeleteFromCart([FromRoute] int id)
        {
            var itemModel = await _context.cart_items.FirstOrDefaultAsync(x => x.id == id);
            if (itemModel == null)
            {
                return NotFound();
            }
            _context.cart_items.Remove(itemModel);
            //Dont add async

            await _context.SaveChangesAsync();
            return NoContent();
        }





        private async Task<Cart> CreateCart(CartRequestDTO createDTO, string userId)
        {
            var cartModel = new Cart
            {
                UserId = userId,
                Address = createDTO.Address,
                Note = createDTO.Note,
                Status = "Ordering",
                Total = 0
            };

            await _context.carts.AddAsync(cartModel);
            await _context.SaveChangesAsync();
            return cartModel;
        }



    }
}
