using Microsoft.AspNetCore.Mvc;
using project.data;
using project.dtos;
using project.webapi.Utilities.Extensions;
using project.workers;

namespace project.webapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly IWorker<Order> _worker;
        public OrderController(IWorker<Order> worker)
        {
            this._worker = worker;
        }

        //GET: api/Orders
        [HttpGet]
        public async Task<ActionResult<OrderDTO>> Get()
        {
            var data = await _worker.GetAsync();

            if (data == null)
            {
                return NotFound();
            }
            return Ok(data.ToModelDTO());
        }

        //GETbyId: api/Orders/5
        [HttpGet("{Id}")]
        public async Task<ActionResult<OrderDTO>> FindById(int Id)
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
        public async Task<ActionResult<OrderDTO>> Create(OrderDTO Order)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var data = await _worker.CreateAsync(Order.ToModelDB());

            if (data == null)
            {
                return Problem("Entity set 'BikeStoresContext.Orders' is null.");
            }
            return Created("Pagina di conferma creazione", data.ToModelDTO());
        }

        //DELETE
        [HttpDelete("{Id}")]
        public async Task<ActionResult<OrderDTO>> Delete(int Id)
        {
            var data = await _worker.DeleteAsync(Id);

            if (data == null)
            {
                return Problem("Entity set 'BikeStoresContext.Orders' is null.");
            }
            return NoContent();
        }

        //UPDATE
        [HttpPut]
        public async Task<ActionResult<OrderDTO>> Update(OrderDTO Order)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var data = await _worker.UpdateAsync(Order.ToModelDB());
            return Ok(data.ToModelDTO());
        }
    }
}
