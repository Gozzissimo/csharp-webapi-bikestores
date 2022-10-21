using Microsoft.AspNetCore.Mvc;
using project.data;
using project.dtos;
using project.webapi.Utilities.Extensions;
using project.workers;

namespace project.webapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IWorker<Product> _worker;
        public ProductController(IWorker<Product> worker)
        {
            this._worker = worker;
        }

        //GET: api/Products
        [HttpGet]
        public async Task<ActionResult<ProductDTO>> Get()
        {
            var data = await _worker.GetAsync();

            if (data == null)
            {
                return NotFound();
            }
            return Ok(data.ToModelDTO());
        }

        //GETbyId: api/Products/5
        [HttpGet("{Id}")]
        public async Task<ActionResult<ProductDTO>> FindById(int Id)
        {
            var data = await _worker.FindByIdAsync(Id);

            if (data == null)
            {
                return NotFound();
            }
            return Ok(data.ToModelDTO());
        }

        //CREATE
        [HttpPost]
        //[ValidateAntiForgeryToken]
        public async Task<ActionResult<ProductDTO>> Create(ProductDTO Product)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var data = await _worker.CreateAsync(Product.ToModelDB());

            if (data == null)
            {
                return Problem("Entity set 'BikeStoresContext.Products' is null.");
            }
            return Created("Pagina di conferma creazione", data.ToModelDTO());
        }

        //DELETE
        [HttpDelete("{Id}")]
        public async Task<ActionResult<ProductDTO>> Delete(int Id)
        {
            var data = await _worker.DeleteAsync(Id);

            if (data == null)
            {
                return Problem("Entity set 'BikeStoresContext.Products' is null.");
            }
            return NoContent();
        }

        //UPDATE
        [HttpPut]
        public async Task<ActionResult<ProductDTO>> Update(ProductDTO Product)
        {
            if (!ModelState.IsValid || Product.ProductId == 0)
            {
                return BadRequest();
            }

            var data = await _worker.UpdateAsync(Product.ToModelDB());
            return Ok(data.ToModelDTO());
        }
    }
}
