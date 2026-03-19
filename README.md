# SonarPop Frontend

## 📌 Overview

SonarPop is an interactive web application designed to visualize and interact with sonar-based data through a clear and responsive user interface.

This repository contains the **frontend** of the application. It is responsible for presenting data, handling user interaction, and communicating with the backend API and AI model.

---

## 🚀 Live Application

The application is currently deployed and accessible at:

**http://145.24.237.185/**

---

## 🧩 Project Scope

This repository focuses exclusively on:

* User Interface (UI)
* User Experience (UX)
* API communication
* Data visualization

Backend logic, database design, and AI processing are handled in a separate repository.

---

## 🛠️ Technologies Used

* **Framework**: React *(adjust if needed)*
* **Language**: JavaScript / TypeScript
* **Styling**: CSS / Tailwind *(adjust if needed)*
* **API Communication**: Fetch API / Axios

---

## 📂 Project Structure

```
src/
│── components/       # Reusable UI components
│── pages/            # Application views/pages
│── services/         # API communication logic
│── assets/           # Static files
│── styles/           # Styling
│── App.js            # Root component
│── main.js           # Entry point
```

---

## ⚙️ Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/Quinten-1074726/TLE3-Frontend-SonarPop.git
cd TLE3-Frontend-SonarPop
```

### 2. Install dependencies

```bash
npm install
```

### 3. Environment configuration

Create a `.env` file if required:

```
VITE_API_URL=http://localhost:PORT
```

---

## ▶️ Running the Application

### Development mode

```bash
npm run dev
```

Default access:

```
http://localhost:5173
```

---

## 🔗 Backend & AI Integration

<details>
<summary><strong>Click to expand backend and AI details</strong></summary>

### Backend Repository

The backend and AI model are implemented separately:

👉 https://github.com/Shav0nne/sonarpoppy

### Responsibilities of the Backend

* Data processing
* Database management
* AI model execution
* API endpoints

### Frontend ↔ Backend Flow

1. User interacts with the UI
2. Frontend sends API request
3. Backend processes request (including AI model)
4. Response is returned to frontend
5. UI updates accordingly

### AI Model

The AI model is fully handled in the backend and exposed through API endpoints.
The frontend only consumes the results.

### ERD (Entity Relationship Diagram)

The ERD is part of the backend repository, since all data modeling is handled there.

</details>

---

## ⚠️ Edge Cases

The frontend accounts for several edge cases:

* API unavailable → User-friendly error message
* Empty or null responses → Fallback UI
* Invalid input → Client-side validation
* Slow responses → Loading indicators
* Network issues → Graceful degradation

---

## 🖥️ Deployment

### Local Deployment

Run locally using:

```bash
npm run dev
```

Accessible at:

```
http://localhost:5173
```

---

### Production Deployment

The application is deployed on:

**http://145.24.237.185/**

Typical deployment steps:

```bash
npm run build
```

Then serve the `/dist` folder using a web server (e.g., Nginx or Node).

---

## 👥 Contributors

All contributors to this project can be found here:

👉 https://github.com/Quinten-1074726/TLE3-Frontend-SonarPop/graphs/contributors

---

## 📈 Future Improvements

* Enhanced UI/UX
* Improved performance
* More robust error handling
* Expanded AI-driven features
* Additional data visualizations

---

## 📄 License

This project was developed for educational purposes.
