using Microsoft.AspNetCore.Mvc;
using project.data;
using project.dtos;
using project.webapi.Utilities.Extensions;
using project.workers;

namespace project.webapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly IWorker<Category> _worker;
        public CategoryController(IWorker<Category> worker)
        {
            this._worker = worker;
        }

        //GET: api/Categorys
        [HttpGet]
        public async Task<ActionResult<CategoryDTO>> Get()
        {
            var data = await _worker.GetAsync();

            if (data == null)
            {
                return NotFound();
            }
            return Ok(data.ToModelDTO());
        }

        //GETbyId: api/Categorys/5
        [HttpGet("{Id}")]
        public async Task<ActionResult<CategoryDTO>> FindById(int Id)
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
        public async Task<ActionResult<CategoryDTO>> Create(CategoryDTO Category)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var data = await _worker.CreateAsync(Category.ToModelDB());

            if (data == null)
            {
                return Problem("Entity set 'BikeStoresContext.Categorys' is null.");
            }
            return Created("Pagina di conferma creazione", data.ToModelDTO());
        }

        //DELETE
        [HttpDelete("{Id}")]
        public async Task<ActionResult<CategoryDTO>> Delete(int Id)
        {
            var data = await _worker.DeleteAsync(Id);

            if (data == null)
            {
                return Problem("Entity set 'BikeStoresContext.Categorys' is null.");
            }
            return NoContent();
        }

        //UPDATE
        [HttpPut]
        public async Task<ActionResult<CategoryDTO>> Update(CategoryDTO Category)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var data = await _worker.UpdateAsync(Category.ToModelDB());
            return Ok(data.ToModelDTO());
        }
    }
}
