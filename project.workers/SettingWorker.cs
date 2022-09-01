using Microsoft.EntityFrameworkCore;
using project.data;

namespace project.workers
{
    public class SettingWorker : IWorker<Setting>
    {
        private readonly BikeStoresContext _context;
        public SettingWorker(BikeStoresContext context)
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
        public async Task<List<Setting>> GetAsync()
        {
            return await _context.Settings.ToListAsync();
        }

        public async Task<Setting> CreateAsync(Setting Setting)
        {
            _context.Settings.Add(Setting);
            await _context.SaveChangesAsync();
            return Setting;
        }

        public async Task<Setting> UpdateAsync(Setting Setting)
        {
            _context.Entry(Setting).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return Setting;
        }

        public async Task<Setting> DeleteAsync(int id)
        {
            var Setting = await _context.Settings.FindAsync(id);

            _context.Settings.Remove(Setting);
            await _context.SaveChangesAsync();
            return Setting;
        }

        public async Task<Setting> FindByIdAsync(int id)
        {
            return await _context.Settings.FindAsync(id);
        }

        public Task<Setting> DeleteAsync(Setting element)
        {
            throw new NotImplementedException();
        }

        public Task<Setting> FindByIdAsync(Setting element)
        {
            throw new NotImplementedException();
        }

        public Task<Setting> FindByIdAsync(int firstId, int secondId)
        {
            throw new NotImplementedException();
        }
        #endregion
    }
}
