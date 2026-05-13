🛍️ E-Commerce App

A modern e-commerce web application that allows users to browse products, manage a shopping cart, and simulate a complete online shopping experience.

🔗 Live Demo: https://e-commerce-project-five-olive.vercel.app/

⚡ Features
🛒 Fully functional shopping cart (add, remove, update items)
💾 Persistent cart using localStorage
🔍 Dynamic product catalog with category filtering
🔔 Real-time feedback using toast notifications
📱 Responsive design (mobile-first)
⚡ Global state management with Context API
🛠️ Tech Stack
React + TypeScript
Context API (global state management)
REST API Integration (EscuelaJS API)
SCSS (Sass)
LocalStorage (data persistence)
React Hot Toast (user feedback)
Vercel (deployment)


📡 API

This project uses the EscuelaJS Fake Store API to fetch product and category data dynamically.

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
