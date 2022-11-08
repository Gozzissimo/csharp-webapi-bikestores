using Microsoft.AspNetCore.Mvc;
using project.data;
using project.dtos;
using project.webapi.Utilities.Extensions;
using project.workers;

namespace project.webapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StoreController : ControllerBase
    {
        private readonly IWorker<Store> _worker;
        public StoreController(IWorker<Store> worker)
        {
            this._worker = worker;
        }

        //GET: api/Stores
        [HttpGet]
        public async Task<ActionResult<StoreDTO>> Get()
        {
            var data = await _worker.GetAsync();

            if (data == null)
            {
                return NotFound();
            }
            return Ok(data.ToModelDTO());
        }

        //GETbyId: api/Stores/5
        [HttpGet("{Id}")]
        public async Task<ActionResult<StoreDTO>> FindByIdAsync(int Id)
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
        [ValidateAntiForgeryToken]
        public async Task<ActionResult<StoreDTO>> Create(StoreDTO Store)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var data = await _worker.CreateAsync(Store.ToModelDB());

            if (data == null)
            {
                return Problem("Entity set 'BikeStoresContext.Stores' is null.");
            }
            return Created("Pagina di conferma creazione", data.ToModelDTO());
        }

        //DELETE
        [HttpDelete("{Id}")]
        public async Task<ActionResult<StoreDTO>> Delete(int Id)
        {
            var data = await _worker.DeleteAsync(Id);

            if (data == null)
            {
                return Problem("Entity set 'BikeStoresContext.Stores' is null.");
            }
            return NoContent();
        }

        //UPDATE
        [HttpPut]
        public async Task<ActionResult<StoreDTO>> Update(StoreDTO Store)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var data = await _worker.UpdateAsync(Store.ToModelDB());
            return Ok(data.ToModelDTO());
        }
    }
}
