namespace project.workers
{
    //INTERFACCIA UTILIZZATA COME AGGREGATORE DI WORKERS
    public interface IWorker<T>
    {
        void Get();
        void FindById();
        void Create();
        void Update();
        void Delete();

        Task<List<T>> GetAsync();
        Task<T> FindByIdAsync(int id);
        Task<T> FindByIdAsync(int firstId, int secondId);
        Task<T> FindByIdAsync(T element);
        Task<T> CreateAsync(T element);
        Task<T> UpdateAsync(T element);
        Task<T> DeleteAsync(int id);
        Task<T> DeleteAsync(T element);
    }
}
