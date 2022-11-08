using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using project.data;
using project.workers;
using Swashbuckle.AspNetCore.Filters;
using System.Text;

namespace project.webapi
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            //CORS PER PERMETTERE DI LAVORARE SU PROGETTI DIVERSI
            builder.Services.AddCors(options =>
            {
                options.AddDefaultPolicy(
                    policy =>
                    {
                        policy.WithOrigins(
                            "https://localhost:44423",
                            "http://localhost:4200"
                            )
                        .AllowAnyHeader().AllowAnyMethod();
                    });
            });

            builder.Services.AddControllers();

            builder.Services.AddEndpointsApiExplorer();

            //SWAGGER -> AGGIUNTA POSSIBILITA' DI INSERIRE UN SISTEMA DI AUTHORIZATION
            builder.Services.AddSwaggerGen(options =>
            {
                options.AddSecurityDefinition("oauth2", new OpenApiSecurityScheme
                {
                    Description = "Standard Authorization header using the Bearer scheme (\"bearer {token}\")",
                    In = ParameterLocation.Header,
                    Name = "Authorization",
                    Type = SecuritySchemeType.ApiKey
                });

                options.OperationFilter<SecurityRequirementsOperationFilter>();
            });

            //AUTHENTICATION
            builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                {
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8
                        .GetBytes(builder.Configuration.GetSection("AppSettings:Token").Value)),
                        ValidateIssuer = false,
                        ValidateAudience = false
                    };
                });

            //STRINGA DI CONNESSIONE AL SERVER
            //string sConnectionString = builder.Configuration.GetConnectionString("DBConnection");
            builder.Services.AddDbContext<BikeStoresContext>(options =>
                options.UseSqlServer("Data Source=PC-212;Initial Catalog=BikeStores;Integrated Security=True"));

            //AGGIUNTA WORKERS
            builder.Services.AddScoped<IWorker<Brand>, BrandWorker>();
            builder.Services.AddScoped<IWorker<Customer>, CustomerWorker>();
            builder.Services.AddScoped<IWorker<Category>, CategoryWorker>();
            builder.Services.AddScoped<IWorker<Order>, OrderWorker>();
            builder.Services.AddScoped<IWorker<Product>, ProductWorker>();
            builder.Services.AddScoped<IWorker<Staff>, StaffWorker>();
            builder.Services.AddScoped<IWorker<Stock>, StockWorker>();
            builder.Services.AddScoped<IWorker<Store>, StoreWorker>();
            builder.Services.AddScoped<IWorker<OrderItem>, OrderItemWorker>();
            builder.Services.AddScoped<IWorker<Setting>, SettingWorker>();
            builder.Services.AddScoped<IWorker<User>, UserWorker>();

            var app = builder.Build();

            // Configure the HTTP request pipeline.

            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();

            //ATTIVAZIONE CORS
            app.UseCors();

            //ATTIVAZIONE AUTHENTICATION
            app.UseAuthentication();

            app.UseAuthorization();

            app.MapControllers();

            app.Run();
        }
    }
}