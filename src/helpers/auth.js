import bcrypt from "bcrypt";

export const hashPassword = (password) => {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(12, (err, salt) => {
      if (err) {
        reject(err);
      }
      bcrypt.hash(password, salt, (err, hash) => {
        if (err) {
          reject(err);
        }
        resolve(hash);
      });
    });
  });
};

export const comparePassword = (password, hashed) => {
  return bcrypt.compare(password, hashed);
};


export const welcomeMsg = (req, res) => {
  return res.json({
    status: "success",
    message: "Welcome to Blard's hng11 task 2 server",
    baseUrl: "https://hng11-stack-be-task2.onrender.com/api",
    endpoints: [
      {
        method: "POST",
        path: "/auth/register",
        description: "Register a new user",
        requestBody: {
          firstName: "string",
          lastName: "string",
          email: "string",
          password: "string",
          phone: "string"
        },
        response: {
          status: "success",
          message: "Registration successful",
          data: {
            accessToken: "string",
            user: {
              userId: "string",
              firstName: "string",
              lastName: "string",
              email: "string",
              phone: "string"
            }
          }
        }
      },
      {
        method: "POST",
        path: "/auth/login",
        description: "Log in a user",
        requestBody: {
          email: "string",
          password: "string"
        },
        response: {
          status: "success",
          message: "Login successful",
          data: {
            accessToken: "string",
            user: {
              userId: "string",
              firstName: "string",
              lastName: "string",
              email: "string",
              phone: "string"
            }
          }
        }
      },
      {
        method: "GET",
        path: "auth/users",
        description: "Get all users",
        response: {
          status: "success",
          message: "Users retrieved successfully",
          data: [
            {
              userId: "string",
              firstName: "string",
              lastName: "string",
              email: "string",
              phone: "string"
            }
          ]
        }
      },
      {
        method: "GET",
        path: "auth/users/:userId",
        description: "Get user by ID",
        response: {
          status: "success",
          message: "User retrieved successfully",
          data: {
            userId: "string",
            firstName: "string",
            lastName: "string",
            email: "string",
            phone: "string"
          }
        }
      },
      {
        method: "POST",
        path: "/organisations",
        description: "Create a new organisation",
        requestBody: {
          name: "string",
          description: "string"
        },
        response: {
          status: "success",
          message: "Organisation created successfully",
          data: {
            orgId: "string",
            name: "string",
            description: "string"
          }
        }
      },
      {
        method: "GET",
        path: "/organisations",
        description: "Get all organisations the user belongs to or created",
        response: {
          status: "success",
          message: "Organisations retrieved successfully",
          data: {
            organisations: [
              {
                orgId: "string",
                name: "string",
                description: "string"
              }
            ]
          }
        }
      },
      {
        method: "GET",
        path: "/organisations/:orgId",
        description: "Get a single organisation by ID",
        response: {
          status: "success",
          message: "Organisation retrieved successfully",
          data: {
            orgId: "string",
            name: "string",
            description: "string"
          }
        }
      },
      {
        method: "POST",
        path: "/organisations/:orgId/users",
        description: "Add a user to an organisation",
        requestBody: {
          userId: "string"
        },
        response: {
          status: "success",
          message: "User added to organisation successfully"
        }
      }
    ]
  });
}