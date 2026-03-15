# 📚 Project Resources & Tech Stack

This document serves as a central hub for all the technologies, documentation, and datasets used to build the **Diabetes Predictor [END-TO-END]** project. It is designed to help beginners and future developers quickly understand the tools powering this application.

---

## 🎨 Frontend Stack
The frontend is built as a modern Single Page Application (SPA), decoupled entirely from the backend to ensure performance and separation of concerns.

- **[React](https://react.dev/)**: The core UI library used to build the interactive interface.
- **[Vite](https://vitejs.dev/)**: The blazing fast build tool and development server used to bootstrap the application.
- **[TypeScript](https://www.typescriptlang.org/)**: Adds static typing to JavaScript for better developer experience and runtime safety.
- **[Vanilla CSS (Glassmorphism)](https://developer.mozilla.org/en-US/docs/Web/CSS)**: Premium styling using modern CSS features like CSS variables, flexbox/grid, and `backdrop-filter` to create a frosted glass aesthetic without heavy external UI libraries.
- **[Lucide React](https://lucide.dev/)**: A beautiful, clean, and open-source icon library used for input fields and UI elements.

---

## ⚙️ Backend Stack
The backend functions as a JSON API, acting as a lightweight wrapper around the trained Machine Learning model.

- **[Python 3](https://docs.python.org/3/)**: The programming language driving the backend AI logic.
- **[Flask](https://flask.palletsprojects.com/)**: A lightweight micro web-framework used to serve the API endpoint (`/api/predict`).
- **[Flask-CORS](https://flask-cors.readthedocs.io/)**: Used to handle Cross-Origin Resource Sharing, allowing our separate React frontend to communicate with the Flask API seamlessly.
- **[Scikit-learn](https://scikit-learn.org/)**: The machine learning library used to build the `Random Forest Classifier` model (`.pkl` file).
- **[Pandas](https://pandas.pydata.org/) & [NumPy](https://numpy.org/)**: The fundamental data manipulation and numerical libraries handling the dataset and arrays.

---

## 💾 Dataset
The model was trained on historical patient diagnostic data to uncover patterns associated with the onset of diabetes.

- **Main Dataset Name**: Kaggle Diabetes Dataset (often derived from the *Pima Indians Diabetes Database*).
- **Location in Repo**: `notebooks_and_data/dataset/kaggle_diabetes.csv`
- **Features Used**:
  1. Pregnancies
  2. Glucose
  3. Blood Pressure
  4. Skin Thickness
  5. Insulin
  6. BMI
  7. Diabetes Pedigree Function (DPF)
  8. Age

---

## 🚀 Deployment & Operations
- **[Concurrently](https://www.npmjs.com/package/concurrently)**: Used in our `frontend/package.json` to elegantly run both the Vite Development Server and the Python Flask Server in parallel via a single command (`npm run dev`).
- **Development Proxy**: Vite is configured (`vite.config.ts`) to proxy `/api` traffic directly to `http://127.0.0.1:5000`, cleanly mimicking a real-world production routing environment.

---
*Tip for Beginners: When debugging connection issues between frontend and backend, always check the **Vite Proxy settings** in `frontend/vite.config.ts` and the **Flask CORS output** in your Python terminal!*
