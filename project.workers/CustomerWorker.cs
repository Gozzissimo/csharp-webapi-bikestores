using Microsoft.EntityFrameworkCore;
using project.data;

namespace project.workers
{
    public class CustomerWorker : IWorker<Customer>
    {
        private readonly BikeStoresContext _context;
        public CustomerWorker(BikeStoresContext context)
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
        public async Task<List<Customer>> GetAsync()
        {
            return await _context.Customers.ToListAsync();
        }

        public async Task<Customer> CreateAsync(Customer Customer)
        {
            _context.Customers.Add(Customer);
            await _context.SaveChangesAsync();
            return Customer;
        }

        public async Task<Customer> UpdateAsync(Customer Customer)
        {
            _context.Entry(Customer).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return Customer;
        }

        public async Task<Customer> DeleteAsync(int id)
        {
            var Customer = await _context.Customers.FindAsync(id);

            _context.Customers.Remove(Customer);
            await _context.SaveChangesAsync();
            return Customer;
        }

        public async Task<Customer> FindByIdAsync(int id)
        {
            return await _context.Customers.FindAsync(id);
        }

        public Task<Customer> DeleteAsync(Customer element)
        {
            throw new NotImplementedException();
        }

        public Task<Customer> FindByIdAsync(Customer element)
        {
            throw new NotImplementedException();
        }

        public Task<Customer> FindByIdAsync(int firstId, int secondId)
        {
            throw new NotImplementedException();
        }
        #endregion
    }
}
