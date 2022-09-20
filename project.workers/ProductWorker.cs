using Microsoft.EntityFrameworkCore;
using project.data;

namespace project.workers
{
    public class ProductWorker : IWorker<Product>
    {
        private readonly BikeStoresContext _context;
        public ProductWorker(BikeStoresContext context)
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
        public async Task<List<Product>> GetAsync()
        {
            return await _context.Products
                .Include(e => e.Brand)
                .Include(e => e.Category)
                .ToListAsync();
        }

        public async Task<Product> CreateAsync(Product Product)
        {
            _context.Products.Add(Product);
            await _context.SaveChangesAsync();
            return Product;
        }

        public async Task<Product> UpdateAsync(Product Product)
        {
            _context.Entry(Product).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return Product;
        }

        public async Task<Product> DeleteAsync(int id)
        {
            var Product = await _context.Products.FindAsync(id);

            _context.Products.Remove(Product);
            await _context.SaveChangesAsync();
            return Product;
        }

        public async Task<Product> FindByIdAsync(int id)
        {
            return await _context.Products.FindAsync(id);
        }

        public Task<Product> DeleteAsync(Product element)
        {
            throw new NotImplementedException();
        }

        public Task<Product> FindByIdAsync(Product element)
        {
            throw new NotImplementedException();
        }

        public Task<Product> FindByIdAsync(int firstId, int secondId)
        {
            throw new NotImplementedException();
        }
        #endregion
    }
}
