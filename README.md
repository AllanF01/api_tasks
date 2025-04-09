#  Task Management API

This is a **RESTful API** built with **Node.js, Express, and MongoDB**, designed to manage tasks through CRUD operations (Create, Read, Update, Delete). It was developed as part of a university **Software Quality Assurance final project**, and includes both **manual testing with Postman** and **automated testing using Jest and Supertest**.

---

## Technologies Used

- **Node.js** – JavaScript runtime environment
- **Express.js** – Backend framework for building routes
- **MongoDB + Mongoose** – NoSQL database and ORM
- **Jest + Supertest** – Automated testing tools
- **Postman** – Manual API testing

---

## Installation

1. Clone the repository:

```bash
git clone https://github.com/AllanF01/api_tasks
cd api_tasks
```

2. Install dependencies:

```bash
npm install
```

3. Make sure MongoDB is running locally on port `27017`.  
Start the API:

```bash
node server.js
```

> The server will run on `http://localhost:5000`

---

## API Endpoints

| Method | Endpoint         | Description               |
|--------|------------------|---------------------------|
| POST   | `/tasks`         | Create a new task         |
| GET    | `/tasks`         | Get all tasks             |
| PUT    | `/tasks/:id`     | Update an existing task   |
| DELETE | `/tasks/:id`     | Delete a task by ID       |

---

## Test Cases

This project includes 10 test cases covering:

- Valid and invalid task creation
- Listing tasks
- Updating existing and non-existing tasks
- Deleting existing and non-existing tasks
- Handling invalid `status` values
- Simultaneous task creation

### Run the tests:

```bash
npm test

