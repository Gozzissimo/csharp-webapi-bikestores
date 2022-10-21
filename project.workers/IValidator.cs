namespace project.workers
{
    public interface IValidator
    {
        void Validate<T>(T data);
    }
}
