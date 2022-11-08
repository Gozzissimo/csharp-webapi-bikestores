using Microsoft.AspNetCore.Mvc;
using project.data;
using project.dtos;
using project.webapi.Utilities.Extensions;
using project.workers;

namespace project.webapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomerController : ControllerBase
    {
        private readonly IWorker<Customer> _worker;
        public CustomerController(IWorker<Customer> worker)
        {
            this._worker = worker;
        }

        //GET: api/Customers
        [HttpGet]
        public async Task<ActionResult<CustomerDTO>> Get()
        {
            var data = await _worker.GetAsync();

            if (data == null)
            {
                return NotFound();
            }
            return Ok(data.ToModelDTO());
        }

        //GETbyId: api/Customers/5
        [HttpGet("{Id}")]
        public async Task<ActionResult<CustomerDTO>> FindById(int Id)
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
        public async Task<ActionResult<CustomerDTO>> Create(CustomerDTO Customer)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var data = await _worker.CreateAsync(Customer.ToModelDB());

            if (data == null)
            {
                return Problem("Entity set 'BikeStoresContext.Customers' is null.");
            }
            return Created("Pagina di conferma creazione", data.ToModelDTO());
        }

        //DELETE
        [HttpDelete("{Id}")]
        public async Task<ActionResult<CustomerDTO>> Delete(int Id)
        {
            var data = await _worker.DeleteAsync(Id);

            if (data == null)
            {
                return Problem("Entity set 'BikeStoresContext.Customers' is null.");
            }
            return NoContent();
        }

        //UPDATE
        [HttpPut]
        public async Task<ActionResult<CustomerDTO>> Update(CustomerDTO Customer)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var data = await _worker.UpdateAsync(Customer.ToModelDB());
            return Ok(data.ToModelDTO());
        }
    }
}
