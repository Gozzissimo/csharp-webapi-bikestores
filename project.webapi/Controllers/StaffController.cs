using Microsoft.AspNetCore.Mvc;
using project.data;
using project.dtos;
using project.webapi.Utilities.Extensions;
using project.workers;

namespace project.webapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StaffController : ControllerBase
    {
        private readonly IWorker<Staff> _worker;
        public StaffController(IWorker<Staff> worker)
        {
            this._worker = worker;
        }

        //GET: api/Staffs
        [HttpGet]
        public async Task<ActionResult<StaffDTO>> Get()
        {
            var data = await _worker.GetAsync();

            if (data == null)
            {
                return NotFound();
            }
            return Ok(data.ToModelDTO());
        }

        //GETbyId: api/Staffs/5
        [HttpGet("{Id}")]
        public async Task<ActionResult<StaffDTO>> FindById(int Id)
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
        public async Task<ActionResult<StaffDTO>> Create(StaffDTO Staff)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var data = await _worker.CreateAsync(Staff.ToModelDB());

            if (data == null)
            {
                return Problem("Entity set 'BikeStoresContext.Staffs' is null.");
            }
            return Created("Pagina di conferma creazione", data.ToModelDTO());
        }

        //DELETE
        [HttpDelete("{Id}")]
        public async Task<ActionResult<StaffDTO>> Delete(int Id)
        {
            var data = await _worker.DeleteAsync(Id);

            if (data == null)
            {
                return Problem("Entity set 'BikeStoresContext.Staffs' is null.");
            }
            return NoContent();
        }

        //UPDATE
        [HttpPut]
        public async Task<ActionResult<StaffDTO>> Update(StaffDTO Staff)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var data = await _worker.UpdateAsync(Staff.ToModelDB());
            return Ok(data.ToModelDTO());
        }
    }
}
