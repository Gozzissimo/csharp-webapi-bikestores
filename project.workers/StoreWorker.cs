using Microsoft.EntityFrameworkCore;
using project.data;

namespace project.workers
{
    public class StoreWorker : IWorker<Store>
    {
        private readonly BikeStoresContext _context;
        public StoreWorker(BikeStoresContext context)
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
        public async Task<List<Store>> GetAsync()
        {
            return await _context.Stores.ToListAsync();
        }

        public async Task<Store> CreateAsync(Store Store)
        {
            _context.Stores.Add(Store);
            await _context.SaveChangesAsync();
            return Store;
        }

        public async Task<Store> UpdateAsync(Store Store)
        {
            _context.Entry(Store).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return Store;
        }

        public async Task<Store> DeleteAsync(int id)
        {
            var Store = await _context.Stores.FindAsync(id);

            _context.Stores.Remove(Store);
            await _context.SaveChangesAsync();
            return Store;
        }

        public async Task<Store> FindByIdAsync(int id)
        {
            return await _context.Stores.FindAsync(id);
        }

        public Task<Store> DeleteAsync(Store element)
        {
            throw new NotImplementedException();
        }

        public Task<Store> FindByIdAsync(Store element)
        {
            throw new NotImplementedException();
        }

        public Task<Store> FindByIdAsync(int firstId, int secondId)
        {
            throw new NotImplementedException();
        }
        #endregion
    }
}
