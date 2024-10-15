using APIApp.Data;
using APIApp.Dtos;
using APIApp.Dtos.ProductRequestDTOs;
using APIApp.Interfaces;
using APIApp.Mappers;
using APIApp.Models;
using APIApp.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace APIApp.Controllers
{
    [ApiController]
    [Route("api/product")]
    public class ProductController : ControllerBase
    {
        private readonly ApplicationDBContext _context;
        private readonly IPhotoService _photoService;
        public ProductController(ApplicationDBContext context, IPhotoService photoService)
        {
            _context = context;
            _photoService = photoService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var products = await _context.products.ToListAsync();
            //var products = await _context.product.ToList();

            var productsDTO = products.Select(s => s.toProductDTO());

            return Ok(productsDTO);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            var product = await _context.products.FindAsync(id);
            //var product = await _context.product.Find(id);
            if (product == null)
            {
                return NotFound();
            }
            return Ok(product.toProductDTO());
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> Create([FromForm] ProductRequestDTO productDTO)
        {

            var result = await _photoService.AddPhotoAsync(productDTO.ImageFile);

            var productModel = new Product
            {
                Name = productDTO.Name,
                Quantity = productDTO.Quantity,
                Price = productDTO.Price,
                Description = productDTO.Description,
                Image = result.Url.ToString()

            };
            await _context.products.AddAsync(productModel);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetById), new { id = productModel.Id }, productModel.toProductDTO());

        }

        [HttpPut]
        [Route("{id}")]
        [Authorize]
        public async Task<IActionResult> Update([FromRoute] int id, [FromForm] ProductRequestDTO updateDTO)
        {
            var productModel =  await _context.products.FindAsync(id);

            if(productModel == null)
            {
                return NotFound();
            }

            if (updateDTO.ImageFile == null)
            {
                productModel.Image = productModel.Image;
            }
            else
            {
                var result = await _photoService.AddPhotoAsync(updateDTO.ImageFile);
                productModel.Image = result.Url.ToString();

            }


            productModel.Name = updateDTO.Name;
            productModel.Quantity = updateDTO.Quantity;
            productModel.Price  = updateDTO.Price;
            productModel.Description  = updateDTO.Description;

            await _context.SaveChangesAsync();

            return Ok( productModel.toProductDTO() );
        }

        [HttpDelete]
        [Route("{id}")]
        [Authorize]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            var productModel = await _context.products.FirstOrDefaultAsync(x => x.Id == id );
            if( productModel == null)
            {
                return NotFound();
            }
            _context.products.Remove(productModel);
            //Dont add async

            await _context.SaveChangesAsync();
            return NoContent();
        }

    }
}
