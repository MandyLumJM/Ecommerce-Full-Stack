/* global use, db */
// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.

// Select the database to use.
use('ecommerce_db');

// 1️⃣ Users Collection with Validation
db.createCollection("users", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["name", "email", "password", "role"],
      properties: {
        name: {
          bsonType: "string",
          description: "User's full name"
        },
        email: {
          bsonType: "string",
          pattern: "^.+@.+$",
          description: "Must be a valid email address"
        },
        password: {
          bsonType: "string",
          minLength: 8,
          description: "Password must be at least 8 characters long"
        },
        role: {
          bsonType: "string",
          enum: ["customer", "admin"],
          description: "Role must be either 'customer' or 'admin'"
        },
        createdAt: {
          bsonType: "date",
          description: "Timestamp when the user was created"
        },
        updatedAt: {
          bsonType: "date",
          description: "Timestamp when the user was last updated"
        }
      }
    }
  }
});

// 2️⃣ Products Collection with Validation
db.createCollection("products", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["name", "price", "stock", "category", "brand","images"],
      properties: {
        name: {
          bsonType: "string",
          description: "Product name"
        },
        description: {
          bsonType: "string",
          description: "Product description"
        },
        price: {
          bsonType: "double",
          minimum: 0,
          description: "Price must be a positive number"
        },
        stock: {
          bsonType: "int",
          minimum: 0,
          description: "Stock must be a non-negative integer"
        },
        category: {
          bsonType: "string",
          description: "Product category"
        },
        brand: {
          bsonType: "string",
          description: "Product brand"
        },
        images: {
          bsonType: "array",
          items: {
            bsonType: "string"
          },
          description: "List of product image URLs"
        },
        rating: {
          bsonType: "double",
          minimum: 0,
          maximum: 5,
          description: "Rating must be between 0 and 5"
        },
        reviews: {
          bsonType: "array",
          description: "List of customer reviews"
        }
      }
    }
  }
});

// 3️⃣ Orders Collection with Validation
db.createCollection("orders", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["userId", "total", "status"],
      properties: {
        userId: {
          bsonType: "objectId",
          description: "User who placed the order"
        },
        total: {
          bsonType: "double",
          minimum: 0,
          description: "Total order amount"
        },
        status: {
          bsonType: "string",
          enum: ["pending", "completed", "cancelled"],
          description: "Order status"
        },
        createdAt: {
          bsonType: "date",
          description: "Timestamp when the order was placed"
        }
      }
    }
  }
});

// 4️⃣ Payments Collection with Validation
db.createCollection("payments", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["transactionId", "userId", "amount", "status"],
      properties: {
        transactionId: {
          bsonType: "string",
          description: "Unique transaction ID"
        },
        userId: {
          bsonType: "objectId",
          description: "User who made the payment"
        },
        orderId: {
          bsonType: "objectId",
          description: "User who made the payment"
        },
        amount: {
          bsonType: "double",
          minimum: 0,
          description: "Amount paid"
        },
        status: {
          bsonType: "string",
          enum: ["pending", "completed", "failed"],
          description: "Payment status"
        },
        type: {
          bsonType: "string",
          enum: ["creditcard", "applepay", "banktransfer"],
          description: "Payment Type"
        },
        createdAt: {
          bsonType: "date",
          description: "Timestamp when the payment was made"
        }
      }
    }
  }
});

print('✅ Collections with validation created successfully!');

// // Users Collection
// db.createCollection('users');
db.users.createIndex({ "email": 1 }, { unique: true });

// Products Collection
// db.createCollection('products');
db.products.createIndex({ "category": 1 });

// Orders Collection
// db.createCollection('orders');
db.orders.createIndex({ "userId": 1, "status": 1 });

// Payments Collection
// db.createCollection('payments');
db.payments.createIndex({ "transactionId": 1 }, { unique: true });
