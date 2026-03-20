# GM Portfolio & Store

A high-performance e-commerce platform and portfolio developed as a final project, achieving a final grade of **17/20**. This project demonstrates advanced integration with REST APIs, global state management, and a strong focus on user experience.

🔗 **Live Demo:** [portfolio-gm-pearl.vercel.app](https://portfolio-gm-pearl.vercel.app)

## 🎓 Academic Context

This project was developed as the **Final Project** for the **Frontend Engineering Course**. It marks the culmination of the **React Module**, where I applied advanced concepts of componentization, type safety, and asynchronous data fetching.

## 🚀 Technologies Used

This project leverages a modern and robust tech stack:

- **React**: Core library for building a dynamic and efficient user interface.
- **TypeScript**: Implemented for strict type checking, ensuring code reliability and fewer runtime errors.
- **SCSS (Sass)**: Advanced styling with variables and nesting for a polished, maintainable design.
- **React Context API**: Used to manage the **Shopping Cart Global State**, allowing seamless data flow between components.
- **React Hot Toast**: Integrated with a custom **Toast Provider** to give real-time, non-intrusive feedback (e.g., "Item added to cart").
- **LocalStorage**: Implemented to persist cart data, ensuring the user's selection remains available after page refreshes.

## ✨ Main Features

- **Shopping Cart System**: Fully functional cart powered by **React Context**, allowing users to add, remove, and manage items globally.
- **Dynamic Product Catalog**: Real-time data fetching from the **EscuelaJS API** to display products, prices, and categories.
- **Interactive Forms**: Built-in forms for user interaction and data submission.
- **Persistent Experience**: Seamless shopping experience where the cart state is saved in the browser's **LocalStorage**.
- **Advanced State Management**: Use of `useState` and `useEffect` for local logic and API synchronization.

## 📡 API Integration

The application consumes the **Platzi Fake Store API** (EscuelaJS), utilizing multiple endpoints:

- **Products**: `GET /products` – To list and display all available items.
- **Categories**: `GET /categories` – To filter products by their specific types.
- **User Feedback**: Integrated with a notification system to confirm API-related actions.

## 🛠️ Installation and Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com
   ```
