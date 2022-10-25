using Microsoft.EntityFrameworkCore;
using project.data;

namespace project.workers
{
    public class OrderWorker : IWorker<Order>
    {
        private readonly BikeStoresContext _context;
        public OrderWorker(BikeStoresContext context)
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
        public async Task<List<Order>> GetAsync()
        {
            return await _context.Orders
                .Include(e => e.Customer)
                .Include(e => e.Staff)
                .Include(e => e.Store)
                .ToListAsync();
        }

        public async Task<Order> CreateAsync(Order Order)
        {
            await _context.Orders.AddAsync(Order);
            await _context.SaveChangesAsync();
            Order = await _context.Orders
                .Include(e => e.Customer)
                .Include(e => e.Staff)
                .Include(e => e.Store)
                .FirstOrDefaultAsync(e => e.OrderId == Order.OrderId);
            return Order;
        }

        public async Task<Order> UpdateAsync(Order Order)
        {
            _context.Entry(Order).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return Order;
        }

        public async Task<Order> DeleteAsync(int id)
        {
            var Order = await _context.Orders.FindAsync(id);

            _context.Orders.Remove(Order);
            await _context.SaveChangesAsync();
            return Order;
        }

        public async Task<Order> FindByIdAsync(int id)
        {
            return await _context.Orders.FindAsync(id);
        }

        public Task<Order> DeleteAsync(Order element)
        {
            throw new NotImplementedException();
        }

        public Task<Order> FindByIdAsync(Order element)
        {
            throw new NotImplementedException();
        }

        public Task<Order> FindByIdAsync(int firstId, int secondId)
        {
            throw new NotImplementedException();
        }
        #endregion
    }
}
