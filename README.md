# API Documentation

To get started using this application, clone the repo and install dependencies.

Login as admin to access admin protected routes.  
**Email:** `admin@admin.com`  
**Password:** `admin1`

## Customer

- **CREATE CUSTOMER (POST)**  
  *http://localhost:3000/customers*

  To create a customer, make a POST request to the URL above. You can copy and paste the JSON below into the request body.
  
  ````json
  {
      "firstName": "Ex",
      "lastName": "Ample",
      "email": "example@mail.test",
      "password": "password",
      "phoneNumber": "123456789"
  }

- **VIEW CUSTOMER PROFILE (GET)**  
  *http://localhost:3000/customers/profile*  

  Make a GET request to the URL above. The application will dynamically display profile data depending on what customer is logged in. By default, a guest account is logged in.

- **UPDATE CUSTOMER (PUT)**  
  *http://localhost:3000/customers*

  Update customer information by making a PUT request to the URL above. The application will update the customer that is logged in. Enter JSON in the request body below to update a customer.
  
  ````json
  {
      "firstName": "Updated",
      "lastName": "Example",
      "email": "updexa@email.se",
      "password": "wordpass",
      "phoneNumber": "987654321"
  }

- **DELETE CUSTOMER (DELETE)**  
  *http://localhost:3000/customers*  

  To delete a customer, simply make a DELETE request to the URL above. The application will delete the logged-in customer.

- **VIEW ALL CUSTOMERS (GET)**  
  *http://localhost:3000/customers*

  To view all customers and customer data, you need to log in as admin. As an admin, make a GET request to the URL above.

## Login / Logout

- **LOGIN CUSTOMER (POST)**  
  *http://localhost:3000/login*

  Make a POST request to the URL above, entering email and password in the request body. Below are the valid login credentials for the admin account.
  
  ````json
  {
      "email": "admin@admin.com",
      "password": "admin1"
  }

- **LOGOUT CUSTOMER (POST)**  
  *http://localhost:3000/logout*  

  Simply make a POST request to the URL above to log out the logged-in customer.

## Products

- **SEE ALL PRODUCTS (GET)**  
  *http://localhost:3000/products*  

  Make a GET request to this URL to view all products. The response will also include a message telling you if there are any active campaigns.

- **SEE SPECIFIC PRODUCT (GET)**  
  *http://localhost:3000/products/:productid*  

  Make a GET request to the URL above using the product `_id` as a route parameter.

- **CREATE PRODUCT (POST)**  
  *http://localhost:3000/products*  

  As admin, create a new product by making a POST request to the URL above. Provide JSON in the request body to create the product object, example below.
  
  ````json
  {
      "title": "EXAMPLE PRODUCT",
      "desc": "Example description for example product",
      "price": 49
  }

- **UPDATE PRODUCT (PUT)**  
  *http://localhost:3000/products/:productId*  

  As admin, to update an existing product, make a PUT request to the URL above. Use product `_id` as route parameter. Enter updated values in the request body. Example below.
  
  ````json
  {
      "title": "EXAMPLE PRODUCT UPDATED",
      "desc": "Example description for example product that has been updated",
      "price": 59
  }

- **DELETE PRODUCT (DELETE)**  
  *http://localhost:3000/products/:productId*  

  As admin, make a DELETE request to the URL above specifying the product `_id` as route parameter.

## Cart

- **VIEW CART (GET)**  
  *http://localhost:3000/cart*

  Make a GET request to view the cart. The cart is not stored in a database, restarting the server will clear the cart.

- **ADD TO CART (POST)**  
  *http://localhost:3000/cart/:productid*  

  Add a product to the cart by making a POST request specifying the product `_id` in the route parameter.

- **DELETE FROM CART (DELETE)**  
  *http://localhost:3000/cart/:productid*  

  Make a DELETE request specifying the product `_id` in the route parameter to delete that product from the cart.

## Orders and Order History

- **PLACE ORDER (POST)**  
  *http://localhost:3000/orders*  

  Make a POST request to the URL to place an order if you have products in your cart.

- **SEE SPECIFIC ORDER (GET)**  
  *http://localhost:3000/orders/:orderId*  

  To view an order and see data like price, order, and delivery time, make a GET request to the URL above specifying the `orderId` as the route parameter. The `orderId` will be provided in the response when placing an order.

- **VIEW CUSTOMER ORDER HISTORY (GET)**  
  *http://localhost:3000/order-history*  

  Make a GET request to the URL above to view the logged-in customer's entire order history.

- **VIEW ALL ORDER HISTORIES (GET)**  
  *http://localhost:3000/order-history/all*  

  Admin protected route. Log in as admin and make a GET request to the URL above to view order histories for every customer.

## Campaign Offers

- **CREATE CAMPAIGN OFFER (POST)**  
  *http://localhost:3000/campaign-offers*

  As admin, make a POST request to the URL above to create a new campaign offer. Enter an array that stores products. Include as many products as you want, and specify how many of that product a customer has to place in the cart. If a customer has every product listed in the campaign offer in their cart, and the correct minimum quantity for each of those products, the campaign offer will be applied. To include a product in the campaign, use the product `_id` for the `productId` property. Choose a quantity for each product. You will also be prompted to add a description. This description will show when a customer visits the products page. There can only be one active campaign.

  Lastly, enter the discount value. Use this JSON below to create a new campaign.

  ````json
  {
      "campaignProducts": [
          { "productId": "BvrHYlR2qm8xY0Jx", "quantity": 2},
          { "productId": "Dr1yVEEC6hwAKfwk", "quantity": 2 }
      ],
      "description": "Description for campaign offer",
      "discount": 100
  }

- **DELETE CAMPAIGN OFFER (DELETE)**  
  *http://localhost:3000/campaign-offers*  

  Simply make a DELETE request to the URL above to delete the active campaign. Since there can only be one campaign active, you don't need to specify any parameters.
