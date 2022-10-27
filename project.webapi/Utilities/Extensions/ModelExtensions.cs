using project.data;
using project.dtos;

namespace project.webapi.Utilities.Extensions
{
    public static class ModelExtensions
    {
        #region Customer
        public static CustomerDTO ToModelDTO(this Customer customer)
        {
            return new CustomerDTO
            {
                CustomerId = customer.CustomerId,
                City = customer.City,
                Email = customer.Email,
                FirstName = customer.FirstName,
                LastName = customer.LastName,
                Phone = customer.Phone,
                State = customer.State,
                Street = customer.Street,
                ZipCode = customer.ZipCode,
                CustomerName = $"{customer.FirstName} {customer.LastName}"
            };
        }
        public static List<CustomerDTO> ToModelDTO(this List<Customer>? Customer)
        {
            List<CustomerDTO> List = new List<CustomerDTO>();

            foreach (Customer customer in Customer)
            {
                List.Add(customer.ToModelDTO());
            }
            return List;
        }

        public static Customer ToModelDB(this CustomerDTO customer)
        {
            return new Customer
            {
                CustomerId = customer.CustomerId,
                City = customer.City,
                Email = customer.Email,
                FirstName = customer.FirstName,
                LastName = customer.LastName,
                Phone = customer.Phone,
                State = customer.State,
                Street = customer.Street,
                ZipCode = customer.ZipCode
            };
        }
        public static List<Customer> ToModelDB(this List<CustomerDTO>? Customer)
        {
            List<Customer> List = new List<Customer>();

            foreach (CustomerDTO customer in Customer)
            {
                List.Add(customer.ToModelDB());
            }
            return List;
        }
        #endregion

        #region Brand
        public static BrandDTO ToModelDTO(this Brand Brand)
        {
            return new BrandDTO
            {
                BrandId = Brand.BrandId,
                BrandName = Brand.BrandName,
            };
        }
        public static List<BrandDTO> ToModelDTO(this List<Brand>? Brand)
        {
            List<BrandDTO> List = new List<BrandDTO>();

            foreach (Brand brand in Brand)
            {
                List.Add(brand.ToModelDTO());
            }
            return List;

        }
        public static Brand ToModelDB(this BrandDTO Brand)
        {
            return new Brand
            {
                BrandId = Brand.BrandId,
                BrandName = Brand.BrandName,
            };
        }
        public static List<Brand> ToModelDB(this List<BrandDTO>? Brand)
        {
            List<Brand> List = new List<Brand>();

            foreach (BrandDTO brand in Brand)
            {
                List.Add(brand.ToModelDB());
            }
            return List;
        }
        #endregion

        #region Category
        public static CategoryDTO ToModelDTO(this Category Category)
        {
            return new CategoryDTO
            {
                CategoryId = Category.CategoryId,
                CategoryName = Category.CategoryName,
            };
        }
        public static List<CategoryDTO> ToModelDTO(this List<Category>? Category)
        {
            List<CategoryDTO> List = new List<CategoryDTO>();

            foreach (Category category in Category)
            {
                List.Add(category.ToModelDTO());
            }
            return List;
        }

        public static Category ToModelDB(this CategoryDTO Category)
        {
            return new Category
            {
                CategoryId = Category.CategoryId,
                CategoryName = Category.CategoryName,
            };
        }
        public static List<Category> ToModelDB(this List<CategoryDTO>? Category)
        {
            List<Category> List = new List<Category>();

            foreach (CategoryDTO category in Category)
            {
                List.Add(category.ToModelDB());
            }
            return List;
        }
        #endregion

        #region Order
        public static OrderDTO ToModelDTO(this Order Order)
        {
            return new OrderDTO
            {
                OrderId = Order.OrderId,
                CustomerId = Order.CustomerId,
                OrderStatus = Order.OrderStatus,
                OrderDate = Order.OrderDate,
                RequiredDate = Order.RequiredDate,
                ShippedDate = Order.ShippedDate,
                StoreId = Order.StoreId,
                StaffId = Order.StaffId,
                Customer = Order.Customer.ToModelDTO(),
                CustomerName = $"{Order.Customer.FirstName} {Order.Customer.LastName}",
                StaffName = $"{Order.Staff.FirstName} {Order.Staff.LastName}",
                StoreName = Order.Store.StoreName
            };
        }
        public static List<OrderDTO> ToModelDTO(this List<Order>? Order)
        {
            List<OrderDTO> List = new List<OrderDTO>();

            foreach (Order order in Order)
            {
                List.Add(order.ToModelDTO());
            }
            return List;
        }

        public static Order ToModelDB(this OrderDTO Order)
        {
            return new Order
            {
                OrderId = Order.OrderId,
                CustomerId = Order.CustomerId,
                OrderStatus = Order.OrderStatus,
                OrderDate = Order.OrderDate,
                RequiredDate = Order.RequiredDate,
                ShippedDate = Order.ShippedDate,
                StoreId = Order.StoreId,
                StaffId = Order.StaffId
            };
        }
        public static List<Order> ToModelDB(this List<OrderDTO>? Order)
        {
            List<Order> List = new List<Order>();

            foreach (OrderDTO order in Order)
            {
                List.Add(order.ToModelDB());
            }
            return List;
        }
        #endregion

        #region Product
        public static ProductDTO ToModelDTO(this Product Product)
        {
            return new ProductDTO
            {
                ProductId = Product.ProductId,
                ProductName = Product.ProductName,
                BrandId = Product.BrandId,
                BrandName = (Product.Brand == null) ? null : Product.Brand.BrandName,
                CategoryId = Product.CategoryId,
                CategoryName = (Product.Category == null) ? null : Product.Category.CategoryName,
                ModelYear = Product.ModelYear,
                ListPrice = Product.ListPrice
            };
        }
        public static List<ProductDTO> ToModelDTO(this List<Product>? Product)
        {
            List<ProductDTO> List = new List<ProductDTO>();

            foreach (Product product in Product)
            {
                List.Add(product.ToModelDTO());
            }
            return List;
        }

        public static Product ToModelDB(this ProductDTO Product)
        {
            return new Product
            {
                ProductId = Product.ProductId,
                ProductName = Product.ProductName,
                BrandId = Product.BrandId,
                CategoryId = Product.CategoryId,
                ModelYear = Product.ModelYear,
                ListPrice = Product.ListPrice
            };
        }
        public static List<Product> ToModelDB(this List<ProductDTO>? Product)
        {
            List<Product> List = new List<Product>();

            foreach (ProductDTO product in Product)
            {
                List.Add(product.ToModelDB());
            }
            return List;
        }
        #endregion

        #region Staff
        public static StaffDTO ToModelDTO(this Staff Staff)
        {
            return new StaffDTO
            {
                StaffId = Staff.StaffId,
                FirstName = Staff.FirstName,
                LastName = Staff.LastName,
                Email = Staff.Email,
                Phone = Staff.Phone,
                Active = Staff.Active,
                StoreId = Staff.StoreId,
                ManagerId = Staff.ManagerId
            };
        }
        public static List<StaffDTO> ToModelDTO(this List<Staff>? Staff)
        {
            List<StaffDTO> List = new List<StaffDTO>();

            foreach (Staff staff in Staff)
            {
                List.Add(staff.ToModelDTO());
            }
            return List;
        }

        public static Staff ToModelDB(this StaffDTO Staff)
        {
            return new Staff
            {
                StaffId = Staff.StaffId,
                FirstName = Staff.FirstName,
                LastName = Staff.LastName,
                Email = Staff.Email,
                Phone = Staff.Phone,
                Active = Staff.Active,
                StoreId = Staff.StoreId,
                ManagerId = Staff.ManagerId
            };
        }
        public static List<Staff> ToModelDB(this List<StaffDTO>? Staff)
        {
            List<Staff> List = new List<Staff>();

            foreach (StaffDTO staff in Staff)
            {
                List.Add(staff.ToModelDB());
            }
            return List;
        }
        #endregion

        #region Stock
        public static StockDTO ToModelDTO(this Stock Stock)
        {
            return new StockDTO
            {
                StoreId = Stock.StoreId,
                ProductId = Stock.ProductId,
                Quantity = Stock.Quantity
            };
        }
        public static List<StockDTO> ToModelDTO(this List<Stock>? Stock)
        {
            List<StockDTO> List = new List<StockDTO>();

            foreach (Stock stock in Stock)
            {
                List.Add(stock.ToModelDTO());
            }
            return List;
        }

        public static Stock ToModelDB(this StockDTO Stock)
        {
            return new Stock
            {
                StoreId = Stock.StoreId,
                ProductId = Stock.ProductId,
                Quantity = Stock.Quantity
            };
        }
        public static List<Stock> ToModelDB(this List<StockDTO>? Stock)
        {
            List<Stock> List = new List<Stock>();

            foreach (StockDTO stock in Stock)
            {
                List.Add(stock.ToModelDB());
            }
            return List;
        }
        #endregion

        #region Store
        public static StoreDTO ToModelDTO(this Store Store)
        {
            return new StoreDTO
            {
                StoreId = Store.StoreId,
                StoreName = Store.StoreName,
                Phone = Store.Phone,
                Email = Store.Email,
                Street = Store.Street,
                City = Store.City,
                State = Store.State,
                ZipCode = Store.ZipCode,
            };
        }
        public static List<StoreDTO> ToModelDTO(this List<Store>? Store)
        {
            List<StoreDTO> List = new List<StoreDTO>();

            foreach (Store store in Store)
            {
                List.Add(store.ToModelDTO());
            }
            return List;
        }

        public static Store ToModelDB(this StoreDTO Store)
        {
            return new Store
            {
                StoreId = Store.StoreId,
                StoreName = Store.StoreName,
                Phone = Store.Phone,
                Email = Store.Email,
                Street = Store.Street,
                City = Store.City,
                State = Store.State,
                ZipCode = Store.ZipCode,
            };
        }
        public static List<Store> ToModelDB(this List<StoreDTO>? Store)
        {
            List<Store> List = new List<Store>();

            foreach (StoreDTO store in Store)
            {
                List.Add(store.ToModelDB());
            }
            return List;
        }
        #endregion

        #region OrderItem
        public static OrderItemDTO ToModelDTO(this OrderItem OrderItem)
        {
            return new OrderItemDTO
            {
                OrderId = OrderItem.OrderId,
                ProductId = OrderItem.ProductId,
                ItemId = OrderItem.ItemId,
                ProductName = (OrderItem.Product == null) ? null : OrderItem.Product.ProductName,
                ListPrice = OrderItem.ListPrice,
                Discount = OrderItem.Discount,
                Quantity = OrderItem.Quantity,
            };
        }

        public static List<OrderItemDTO> ToModelDTO(this List<OrderItem>? OrderItem)
        {
            List<OrderItemDTO> List = new List<OrderItemDTO>();

            foreach (OrderItem orderItem in OrderItem)
            {
                List.Add(orderItem.ToModelDTO());
            }
            return List;
        }

        public static OrderItem ToModelDB(this OrderItemDTO OrderItem)
        {
            return new OrderItem
            {
                OrderId = OrderItem.OrderId,
                ProductId = OrderItem.ProductId,
                ItemId = OrderItem.ItemId,
                ListPrice = OrderItem.ListPrice,
                Discount = OrderItem.Discount,
                Quantity = OrderItem.Quantity,
            };
        }
        public static List<OrderItem> ToModelDB(this List<OrderItemDTO>? OrderItem)
        {
            List<OrderItem> List = new List<OrderItem>();

            foreach (OrderItemDTO orderItem in OrderItem)
            {
                List.Add(orderItem.ToModelDB());
            }
            return List;
        }
        #endregion

        #region Setting
        public static SettingDTO ToModelDTO(this Setting Setting)
        {
            return new SettingDTO
            {
                Id = Setting.Id,
                SettingKey = Setting.SettingKey,
                SettingValue = Setting.SettingValue
            };
        }
        public static List<SettingDTO> ToModelDTO(this List<Setting>? Setting)
        {
            List<SettingDTO> List = new List<SettingDTO>();

            foreach (Setting setting in Setting)
            {
                List.Add(setting.ToModelDTO());
            }
            return List;
        }

        public static Setting ToModelDB(this SettingDTO Setting)
        {
            return new Setting
            {
                Id = Setting.Id,
                SettingKey = Setting.SettingKey,
                SettingValue = Setting.SettingValue
            };
        }
        public static List<Setting> ToModelDB(this List<SettingDTO>? Setting)
        {
            List<Setting> List = new List<Setting>();

            foreach (SettingDTO setting in Setting)
            {
                List.Add(setting.ToModelDB());
            }
            return List;
        }
        #endregion
    }
}
