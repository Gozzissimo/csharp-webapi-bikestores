using Microsoft.EntityFrameworkCore;
using project.data;

namespace project.workers
{
    public class OrderItemWorker : IWorker<OrderItem>
    {
        private readonly BikeStoresContext _context;
        public OrderItemWorker(BikeStoresContext context)
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
        public async Task<List<OrderItem>> GetAsync()
        {
            return await _context.OrderItems.ToListAsync();
        }

        public async Task<OrderItem> CreateAsync(OrderItem OrderItem)
        {
            _context.OrderItems.Add(OrderItem);
            await _context.SaveChangesAsync();
            return OrderItem;
        }

        public async Task<OrderItem> UpdateAsync(OrderItem OrderItem)
        {
            _context.Entry(OrderItem).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return OrderItem;
        }

        public async Task<OrderItem> DeleteAsync(OrderItem orderItem)
        {
            var item = await _context.OrderItems.FindAsync(orderItem.OrderId, orderItem.ItemId);

            _context.OrderItems.Remove(item);
            await _context.SaveChangesAsync();
            return item;
        }

        public async Task<OrderItem> FindByIdAsync(OrderItem orderItem)
        {
            return await _context.OrderItems.FindAsync(orderItem.OrderId, orderItem.ItemId);
        }

        public async Task<OrderItem> FindByIdAsync(int orderId, int storeId)
        {
            return await _context.OrderItems.FindAsync(orderId, storeId);
        }
        #endregion

        #region Metodi inutilizzati
        public async Task<OrderItem> DeleteAsync(int id)
        {
            var OrderItem = await _context.OrderItems.FindAsync(id);

            _context.OrderItems.Remove(OrderItem);
            await _context.SaveChangesAsync();
            return OrderItem;
        }

        public async Task<OrderItem> FindByIdAsync(int id)
        {
            return await _context.OrderItems.FindAsync(id);
        }

        #endregion
    }
}
