using Microsoft.AspNetCore.Mvc;
using project.data;
using project.dtos;
using project.webapi.Utilities.Extensions;
using project.workers;

namespace project.webapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BrandController : ControllerBase
    {
        private readonly IWorker<Brand> _worker;
        public BrandController(IWorker<Brand> worker)
        {
            this._worker = worker;
        }

        //GET: api/Brands
        [HttpGet]
        public async Task<ActionResult<BrandDTO>> Get()
        {
            var data = await _worker.GetAsync();

            if (data == null)
            {
                return NotFound();
            }
            return Ok(data.ToModelDTO());
        }

        //GETbyId: api/Brands/5
        [HttpGet("{Id}")]
        public async Task<ActionResult<BrandDTO>> FindById(int Id)
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
        public async Task<ActionResult<BrandDTO>> Create(BrandDTO Brand)
        {
            var data = await _worker.CreateAsync(Brand.ToModelDB());

            if (data == null)
            {
                return Problem("Entity set 'BikeStoresContext.Brands' is null.");
            }
            return Created("Pagina di conferma creazione", data.ToModelDTO());
        }

        //DELETE
        [HttpDelete("{Id}")]
        public async Task<ActionResult<BrandDTO>> Delete(int Id)
        {
            var data = await _worker.DeleteAsync(Id);

            if (data == null)
            {
                return Problem("Entity set 'BikeStoresContext.Brands' is null.");
            }
            return NoContent();
        }

        //UPDATE
        [HttpPut]
        public async Task<ActionResult<BrandDTO>> Update(BrandDTO Brand)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var data = await _worker.UpdateAsync(Brand.ToModelDB());
            return Ok(data.ToModelDTO());
        }
    }
}
