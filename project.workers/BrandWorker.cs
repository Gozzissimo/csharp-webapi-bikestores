using Microsoft.EntityFrameworkCore;
using project.data;

namespace project.workers
{
    public class BrandWorker : IWorker<Brand>
    {
        private readonly BikeStoresContext _context;
        public BrandWorker(BikeStoresContext context)
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
        public async Task<List<Brand>> GetAsync()
        {
            return await _context.Brands.ToListAsync();
        }

        public async Task<Brand> CreateAsync(Brand brand)
        {
            //QUA INSERISCO IL CAST DEL VALIDATE WORKER VOID
            _context.Brands.Add(brand);
            await _context.SaveChangesAsync();
            return brand;
        }

        public async Task<Brand> UpdateAsync(Brand brand)
        {
            _context.Entry(brand).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return brand;
        }

        public async Task<Brand> DeleteAsync(int id)
        {
            var brand = await _context.Brands.FindAsync(id);

            _context.Brands.Remove(brand);
            await _context.SaveChangesAsync();
            return brand;
        }

        public async Task<Brand> FindByIdAsync(int id)
        {
            return await _context.Brands.FindAsync(id);
        }

        public Task<Brand> DeleteAsync(Brand element)
        {
            throw new NotImplementedException();
        }

        public Task<Brand> FindByIdAsync(Brand element)
        {
            throw new NotImplementedException();
        }

        public Task<Brand> FindByIdAsync(int firstId, int secondId)
        {
            throw new NotImplementedException();
        }
        #endregion
    }
}
