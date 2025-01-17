import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { CustomerService } from '../../../services/customer.service';
import { ProductService } from '../../../services/product.service';
import { OrderService } from '../../../services/order.service';
import { OrderDetailService } from '../../../services/orderdetail.service';

@Component({
  standalone: false,
  selector: 'app-firstpage',
  templateUrl: './firstpage.component.html',
  styleUrl: './firstpage.component.css'
})

export class FirstpageComponent implements OnInit {
  users: any[] = [];
  customers: any[] = [];
  products: any[] = [];
  orders: any[] = [];
  orderdetails: any[] = [];
  datas: any[] = [];


  constructor(
    private userService: UserService,
    private customerService: CustomerService,
    private productService: ProductService,
    private orderService: OrderService,
    private orderdetailService: OrderDetailService) { }

  ngOnInit(): void {
  }

  getUsers(): void {
    this.userService.getUsers().subscribe(
      (data: any) => {
        this.users = data; // Ensure this updates the array
      },
      (error: any) => {
        console.error('Error fetching users:', error);
      }
    );
  }


  // Delete a user
  deleteUser(id: number): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(id).subscribe(() => {
        this.getUsers();  // Refresh the user list
      });
    }
  }

  // Get customers from the API
  getCustomers(): void {
    this.customerService.getCustomers().subscribe(
      (data: any) => {
        this.customers = data; // Ensure this updates the array
      },
      (error: any) => {
        console.error('Error fetching customers:', error);
      }
    );
  }


  // Delete a customer
  deleteCustomer(id: number): void {
    if (confirm('Are you sure you want to delete this customer?')) {
      this.customerService.deleteCustomer(id).subscribe(() => {
        this.getCustomers();
      });
    }
  }

  // Utility function to get customer name by ID
  getCustomerName(c_id: number): string {
    const customer = this.customers.find(c => c.c_id === c_id);
    return customer ? customer.first_name : 'Unknown';
  }

  // Utility function to get product by ID
  getProductById(p_id: number): any {
    return this.products.find(product => product.p_id === p_id) || null;
  }

  // Process and combine orders with relevant details
  getCompleteOrderDetails(): void {
    if (this.customers.length && this.products.length && this.orders.length && this.orderdetails.length) {
      console.log('All data is loaded, processing...');

      this.datas = this.orders.flatMap(order => {
        const matchedOrderDetails = this.orderdetails.filter(orderDetail => orderDetail.o_id === order.o_id);

        return matchedOrderDetails.map(orderDetail => {
          const customerName = this.getCustomerName(order.c_id);
          const product = this.getProductById(orderDetail.p_id);
          const quantity = orderDetail.Quantity || 0;
          const price = product ? product.price : 0;

          return {
            CustomerName: customerName,
            OrderID: order.o_id,
            ProductName: product ? product.p_name : 'Unknown Product',
            Quantity: orderDetail.quantity,
            PricePerUnit: price,
            TotalPriceForProduct: orderDetail.quantity * price,
          };
        });
      });
    } else {
      console.log('Not all data is loaded');
    }
  }

  // Delete a product
  deleteProduct(id: number): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(id).subscribe(() => {
        this.getProducts();  // Refresh the product list
      });
    }
  }

  // Delete an order
  deleteOrder(id: number): void {
    if (confirm('Are you sure you want to delete this order?')) {
      this.orderService.deleteOrder(id).subscribe(() => {
        this.getOrders();  // Refresh the orders list
        this.getOrderDetails();  // Refresh the order detail list because on delete cascade is implemented
      });
    }
  }

  // Delete an order detail
  deleteOrderDetail(id: number): void {
    if (confirm('Are you sure you want to delete this order detail entry?')) {
      this.orderdetailService.deleteOrderDetail(id).subscribe(() => {
        this.getOrderDetails();  // Refresh the order detail list
      });
    }
  }

  // Fetch products after deletion
  getProducts(): void {
    this.productService.getProducts().subscribe(
      (data: any) => {
        this.products = data;
      },
      (error: any) => {
        console.error('Error fetching products:', error);
      }
    );
  }

  // Fetch orders after deletion
  getOrders(): void {
    this.orderService.getOrders().subscribe(
      (data: any) => {
        this.orders = data;
      },
      (error: any) => {
        console.error('Error fetching orders:', error);
      }
    );
  }

  // Fetch order details after deletion
  getOrderDetails(): void {
    this.orderdetailService.getOrderDetails().subscribe(
      (data: any) => {
        this.orderdetails = data;
      },
      (error: any) => {
        console.error('Error fetching order details:', error);
      }
    );
  }
}
