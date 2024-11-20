# Green Market Place

## Overview
**Green Market Place** is a sustainable product website designed with principles of sustainable web development and user-friendly design. This e-commerce platform not only allows users to explore and purchase sustainable products but also educates them about the product development process. To further its mission of promoting sustainability, the platform features a blog section where users can read and contribute content about sustainability.

## Key Features
- **E-commerce Functionality**: Browse and purchase sustainable products.
- **Education on Sustainability**: Gain insights into the production process of items.
- **Integrated Blog System**: Read and write articles related to sustainability.
- **Sustainable Web Development Practices**: Designed with eco-friendly web principles.

---

## Project Structure

The project consists of a **single repository** hosting both backend and frontend codebases.

### 1. **Backend**
- **Framework**: Built on **Express.js**.
- **Database**: Uses **MongoDB** for storing data.
- **Environment Configuration**: The `.env` file must include the following:
  - `MONGO_URI`: Connection string to your MongoDB instance.
  - `JWT_SECRET`: Secret key for signing JSON Web Tokens (JWT).
- **Node.js Version**: The project uses Node.js version `v22.9.0`, specified in the `.nvmrc` file for environment consistency.
- **Code Quality Tools**:
  - **Prettier**: For consistent code formatting.
  - **ESLint**: This is used to identify and fix JavaScript code issues.

### 2. **Frontend**
- **Framework**: Developed using **Next.js**.
- **State Management**: Configured with a **persistent Redux store** using **Thunk** middleware for efficient state management and asynchronous actions.
- **Placement**: The frontend code is located in the `frontend` folder within the repository.

---

## Installation and Setup

### Prerequisites
- **Node.js**: Ensure you have `v22.9.0` installed (recommended to use [nvm](https://github.com/nvm-sh/nvm)).
- **Git**: For cloning the repository.
- **MongoDB**: A running MongoDB instance (local or cloud).
- **Package Manager**: Either npm or yarn.

### Steps to Run the Project
1. **Clone the Repository**:
   ```bash
   git clone git@github.com:fahad-git/green-market-place.git
   cd green-market-place
   ```

2. **Set Node Version**:
   ```bash
   nvm use
   ```
   If `nvm` is not installed, install Node.js version `v22.9.0` manually.

3. **Install Dependencies**:
   Navigate to the root directory and run:
   ```bash
   npm install
   ```
   Repeat the process in the `frontend` directory:
   ```bash
   cd frontend
   npm install
   ```

4. **Configure Environment Variables**:
   In the backend root directory, create a `.env` file and configure the following:
   ```env
   MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/<database-name>?retryWrites=true&w=majority
   JWT_SECRET=your-secret-key
   ```
   Replace `<username>`, `<password>`, `<database-name>`, and `your-secret-key` with your specific details.

5. **Run the Backend**:
   In the root directory:
   ```bash
   npm start
   ```

6. **Run the Frontend**:
   In the `frontend` directory:
   ```bash
   npm run dev
   ```

7. **Access the Application**:
   Open your browser and navigate to `http://localhost:3000` (default port for Next.js).

---

## Contributing
We welcome contributions to improve the **Green Market Place**! Please follow these steps:
1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Commit changes:
   ```bash
   git commit -m "GMP-1234: Add your descriptive message here"
   ```
4. Push to your branch:
   ```bash
   git push origin feature/your-feature-name
   ```
5. Open a Pull Request.

---

## License
This project is open-source and available under the [MIT License](LICENSE).

---

## Declaration
"This project, **Green Market Place**, was developed as part of the **Specialization in Web Technology** course to fulfil its academic requirements."

