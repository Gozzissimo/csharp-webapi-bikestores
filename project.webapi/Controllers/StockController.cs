using Microsoft.AspNetCore.Mvc;
using project.data;
using project.dtos;
using project.webapi.Utilities.Extensions;
using project.workers;

namespace project.webapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StockController : ControllerBase
    {
        private readonly IWorker<Stock> _worker;
        public StockController(IWorker<Stock> worker)
        {
            this._worker = worker;
        }

        //GET: api/Stocks
        [HttpGet]
        public async Task<ActionResult<StockDTO>> Get()
        {
            var data = await _worker.GetAsync();

            if (data == null)
            {
                return NotFound();
            }
            return Ok(data.ToModelDTO());
        }

        //GETbyId: api/Stocks/5
        [HttpGet("{storeId:int}/{productId:int}")]
        public async Task<ActionResult<StockDTO>> FindById(int storeId, int productId)
        {
            var data = await _worker.FindByIdAsync(storeId, productId);

            if (data == null)
            {
                return NotFound();
            }
            return Ok(data.ToModelDTO());
        }

        //CREATE
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult<StockDTO>> Create(StockDTO Stock)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var data = await _worker.CreateAsync(Stock.ToModelDB());

            if (data == null)
            {
                return Problem("Entity set 'BikeStoresContext.Stocks' is null.");
            }
            return Created("Pagina di conferma creazione", data.ToModelDTO());
        }

        //DELETE
        [HttpDelete]
        public async Task<ActionResult<StockDTO>> Delete(StockDTO stock)
        {
            var data = await _worker.DeleteAsync(stock.ToModelDB());

            if (data == null)
            {
                return NotFound();
            }
            return NoContent();
        }

        //UPDATE
        [HttpPut]
        public async Task<ActionResult<StockDTO>> Update(StockDTO Stock)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var data = await _worker.UpdateAsync(Stock.ToModelDB());
            return Ok(data.ToModelDTO());
        }
    }
}
