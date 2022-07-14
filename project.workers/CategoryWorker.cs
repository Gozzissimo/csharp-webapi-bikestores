using Microsoft.EntityFrameworkCore;
using project.data;

namespace project.workers
{
    public class CategoryWorker : IWorker<Category>
    {
        private readonly BikeStoresContext _context;
        public CategoryWorker(BikeStoresContext context)
        {
            _context = context;
        }

        #region Sync
        public void Create()
        {
            throw new NotImplementedException();
        }

        public void FindById()
        {
            throw new NotImplementedException();
        }

        public void Delete()
        {
            throw new NotImplementedException();
        }

        public void Get()
        {
            throw new NotImplementedException();
        }

        public void Update()
        {
            throw new NotImplementedException();
        }
        #endregion

        #region Async
        public async Task<List<Category>> GetAsync()
        {
            return await _context.Categories.ToListAsync();
        }

        public async Task<Category> CreateAsync(Category Category)
        {
            _context.Categories.Add(Category);
            await _context.SaveChangesAsync();
            return Category;
        }

        public async Task<Category> UpdateAsync(Category Category)
        {
            _context.Entry(Category).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return Category;
        }

        public async Task<Category> DeleteAsync(int id)
        {
            var Category = await _context.Categories.FindAsync(id);

            _context.Categories.Remove(Category);
            await _context.SaveChangesAsync();
            return Category;
        }

        public async Task<Category> FindByIdAsync(int id)
        {
            return await _context.Categories.FindAsync(id);
        }

        public Task<Category> DeleteAsync(Category element)
        {
            throw new NotImplementedException();
        }

        public Task<Category> FindByIdAsync(Category element)
        {
            throw new NotImplementedException();
        }

        public Task<Category> FindByIdAsync(int firstId, int secondId)
        {
            throw new NotImplementedException();
        }
        #endregion
    }
}
