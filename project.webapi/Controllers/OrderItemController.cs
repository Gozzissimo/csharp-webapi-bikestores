using Microsoft.AspNetCore.Mvc;
using project.data;
using project.dtos;
using project.webapi.Utilities.Extensions;
using project.workers;

namespace project.webapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderItemController : ControllerBase
    {
        private readonly IWorker<OrderItem> _worker;
        public OrderItemController(IWorker<OrderItem> worker)
        {
            this._worker = worker;
        }

        //GET: api/OrderItems
        [HttpGet]
        public async Task<ActionResult<OrderItemDTO>> Get()
        {
            var data = await _worker.GetAsync();

            if (data == null)
            {
                return NotFound();
            }
            return Ok(data.ToModelDTO());
        }

        //GETbyId: api/OrderItems/5
        [HttpGet("{orderId:int}/{itemId:int}")]
        public async Task<ActionResult<StockDTO>> FindById(int orderId, int itemId)
        {
            var data = await _worker.FindByIdAsync(orderId, itemId);

            if (data == null)
            {
                return NotFound();
            }
            return Ok(data.ToModelDTO());
        }

        //CREATE
        [HttpPost]
        //[ValidateAntiForgeryToken]
        public async Task<ActionResult<OrderItemDTO>> Create(OrderItemDTO OrderItem)
        {
            var data = await _worker.CreateAsync(OrderItem.ToModelDB());

            if (data == null)
            {
                return Problem("Entity set 'BikeOrderItemsContext.OrderItems' is null.");
            }
            return Created("Pagina di conferma creazione", data.ToModelDTO());
        }

        //DELETE
        [HttpDelete]
        public async Task<ActionResult<OrderItemDTO>> Delete(OrderItemDTO orderItem)
        {
            var data = await _worker.DeleteAsync(orderItem.ToModelDB());

            if (data == null)
            {
                return Problem("Entity set 'BikeOrderItemsContext.OrderItems' is null.");
            }
            return NoContent();
        }

        //UPDATE
        [HttpPut]
        public async Task<ActionResult<OrderItemDTO>> Update(OrderItemDTO OrderItem)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var data = await _worker.UpdateAsync(OrderItem.ToModelDB());
            return Ok(data.ToModelDTO());
        }
    }
}
