using Microsoft.EntityFrameworkCore;
using project.data;
using project.workers;

namespace project.webapi
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddCors(options =>
            {
                options.AddDefaultPolicy(
                    policy =>
                    {
                        policy.WithOrigins(
                            "https://localhost:44423")
                        .AllowAnyHeader().AllowAnyMethod();
                    });
            });

            builder.Services.AddControllers();

            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            //Stringa di connessione al server
            //string sConnectionString = builder.Configuration.GetConnectionString("DBConnection");
            builder.Services.AddDbContext<BikeStoresContext>(options =>
                options.UseSqlServer("Data Source=PC-212;Initial Catalog=BikeStores;Integrated Security=True"));

            builder.Services.AddScoped<IWorker<Brand>, BrandWorker>();
            builder.Services.AddScoped<IWorker<Customer>, CustomerWorker>();
            builder.Services.AddScoped<IWorker<Category>, CategoryWorker>();
            builder.Services.AddScoped<IWorker<Order>, OrderWorker>();
            builder.Services.AddScoped<IWorker<Product>, ProductWorker>();
            builder.Services.AddScoped<IWorker<Staff>, StaffWorker>();
            builder.Services.AddScoped<IWorker<Stock>, StockWorker>();
            builder.Services.AddScoped<IWorker<Store>, StoreWorker>();
            builder.Services.AddScoped<IWorker<OrderItem>, OrderItemWorker>();

            var app = builder.Build();

            // Configure the HTTP request pipeline.

            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();

            app.UseCors(); // MODIFICA PER IL CORS

            app.UseAuthorization();

            app.MapControllers();

            app.Run();
        }
    }
}