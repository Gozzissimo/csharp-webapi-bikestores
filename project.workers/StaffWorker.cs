using Microsoft.EntityFrameworkCore;
using project.data;

namespace project.workers
{
    public class StaffWorker : IWorker<Staff>
    {
        private readonly BikeStoresContext _context;
        public StaffWorker(BikeStoresContext context)
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
        public async Task<List<Staff>> GetAsync()
        {
            return await _context.Staffs.ToListAsync();
        }

        public async Task<Staff> CreateAsync(Staff Staff)
        {
            _context.Staffs.Add(Staff);
            await _context.SaveChangesAsync();
            return Staff;
        }

        public async Task<Staff> UpdateAsync(Staff Staff)
        {
            _context.Entry(Staff).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return Staff;
        }

        public async Task<Staff> DeleteAsync(int id)
        {
            var Staff = await _context.Staffs.FindAsync(id);

            _context.Staffs.Remove(Staff);
            await _context.SaveChangesAsync();
            return Staff;
        }

        public async Task<Staff> FindByIdAsync(int id)
        {
            return await _context.Staffs.FindAsync(id);
        }

        public Task<Staff> DeleteAsync(Staff element)
        {
            throw new NotImplementedException();
        }

        public Task<Staff> FindByIdAsync(Staff element)
        {
            throw new NotImplementedException();
        }

        public Task<Staff> FindByIdAsync(int firstId, int secondId)
        {
            throw new NotImplementedException();
        }
        #endregion
    }
}
