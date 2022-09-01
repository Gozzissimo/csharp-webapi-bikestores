using Microsoft.AspNetCore.Mvc;
using project.data;
using project.dtos;
using project.webapi.Utilities.Extensions;
using project.workers;

namespace project.webapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SettingController : ControllerBase
    {
        private readonly IWorker<Setting> _worker;
        public SettingController(IWorker<Setting> worker)
        {
            this._worker = worker;
        }

        //GET: api/Settings
        [HttpGet]
        public async Task<ActionResult<SettingDTO>> Get()
        {
            var data = await _worker.GetAsync();

            if (data == null)
            {
                return NotFound();
            }
            return Ok(data.ToModelDTO());
        }

        //GETbyId: api/Settings/5
        [HttpGet("{Id}")]
        public async Task<ActionResult<SettingDTO>> FindById(int Id)
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
        public async Task<ActionResult<SettingDTO>> Create(SettingDTO Setting)
        {
            var data = await _worker.CreateAsync(Setting.ToModelDB());

            if (data == null)
            {
                return Problem("Entity set 'BikeStoresContext.Settings' is null.");
            }
            return Created("Pagina di conferma creazione", data.ToModelDTO());
        }

        //DELETE
        [HttpDelete("{Id}")]
        public async Task<ActionResult<SettingDTO>> Delete(int Id)
        {
            var data = await _worker.DeleteAsync(Id);

            if (data == null)
            {
                return Problem("Entity set 'BikeStoresContext.Settings' is null.");
            }
            return NoContent();
        }

        //UPDATE
        [HttpPut]
        public async Task<ActionResult<SettingDTO>> Update(SettingDTO Setting)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var data = await _worker.UpdateAsync(Setting.ToModelDB());
            return Ok(data.ToModelDTO());
        }
    }
}
