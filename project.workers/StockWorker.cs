using Microsoft.EntityFrameworkCore;
using project.data;

namespace project.workers
{
    public class StockWorker : IWorker<Stock>
    {
        private readonly BikeStoresContext _context;
        public StockWorker(BikeStoresContext context)
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
        public async Task<List<Stock>> GetAsync()
        {
            return await _context.Stocks.ToListAsync();
        }

        public async Task<Stock> CreateAsync(Stock Stock)
        {
            _context.Stocks.Add(Stock);
            await _context.SaveChangesAsync();
            return Stock;
        }

        public async Task<Stock> UpdateAsync(Stock Stock)
        {
            _context.Entry(Stock).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return Stock;
        }

        public async Task<Stock> DeleteAsync(Stock stock)
        {
            var item = await _context.Stocks.FindAsync(stock.StoreId, stock.ProductId);

            _context.Stocks.Remove(item);
            await _context.SaveChangesAsync();
            return item;
        }

        public async Task<Stock> FindByIdAsync(Stock stock)
        {
            return await _context.Stocks.FindAsync(stock.StoreId, stock.ProductId);
        }

        public async Task<Stock> FindByIdAsync(int storeId, int productId)
        {
            return await _context.Stocks.FindAsync(storeId, productId);
        }
        #endregion

        #region Metodi Inutilizzati
        public async Task<Stock> DeleteAsync(int id)
        {
            var Stock = await _context.Stocks.FindAsync(id);

            _context.Stocks.Remove(Stock);
            await _context.SaveChangesAsync();
            return Stock;
        }

        public async Task<Stock> FindByIdAsync(int id)
        {
            return await _context.Stocks.FindAsync(id);
        }
        #endregion
    }
}
