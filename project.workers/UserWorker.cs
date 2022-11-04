using Microsoft.EntityFrameworkCore;
using project.data;

namespace project.workers
{
    public class UserWorker : IWorker<User>
    {
        private readonly BikeStoresContext _context;
        public UserWorker(BikeStoresContext context)
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
        public async Task<List<User>> GetAsync()
        {
            return await _context.Users.ToListAsync();
        }

        public async Task<User> CreateAsync(User User)
        {
            _context.Users.Add(User);
            await _context.SaveChangesAsync();
            return User;
        }

        public async Task<User> UpdateAsync(User User)
        {
            _context.Entry(User).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return User;
        }

        public async Task<User> DeleteAsync(int id)
        {
            var User = await _context.Users.FindAsync(id);

            _context.Users.Remove(User);
            await _context.SaveChangesAsync();
            return User;
        }

        public async Task<User> FindByIdAsync(int id)
        {
            return await _context.Users.FindAsync(id);
        }

        public Task<User> DeleteAsync(User element)
        {
            throw new NotImplementedException();
        }

        public Task<User> FindByIdAsync(User element)
        {
            throw new NotImplementedException();
        }

        public Task<User> FindByIdAsync(int firstId, int secondId)
        {
            throw new NotImplementedException();
        }
        #endregion
    }
}
