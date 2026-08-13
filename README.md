# Cyber-Engineering HUD MERN Portfolio

A premium, full-stack developer dossier and telemetry monitor built in the **MERN Stack** (MongoDB, Express, React, Node.js) and styled with a custom high-fidelity **Cyber-Engineering HUD** theme.

---

## 🛠️ Tech Stack & Architecture

- **Frontend:** React.js, Vite 8, React Router Dom, Lucide-React, Vanilla CSS
- **Backend:** Node.js, Express, CORS, Helmet protection, Morgan logging
- **Database:** MongoDB (using Mongoose schemas with graceful offline mock fallbacks)
- **Concurrency:** Root script orchestration using `concurrently`

---

## ⚡ Custom HUD Features

1. **Interactive Crosshair Reticle:** An accelerated, lag-free CSS/JS cursor follower that tracks movements directly on the hardware layout.
2. **System Diagnostics Console Feed:** A floating console panel modeled after the iPhone AssistiveTouch toggle. It logs live, timestamped user telemetry interactions (focused inputs, tapped credentials, hovered modules).
3. **Scroll-Driven Sweeps:** Grid backdrops, scanline animations, and glowing corner cards that activate automatically using browser `IntersectionObservers` when scrolled into view.
4. **Admin Telemetry Board:** An admin dashboard route (`/admin`) displaying MongoDB page visits and inquiry submissions.

---

## ⚙️ Setup and Run Instructions

### Prerequisites
- Node.js installed (v18+)
- MongoDB running locally or on MongoDB Atlas (optional; backend includes offline file fallbacks if disconnected)

### Installation
1. Clone the repository to your desktop.
2. Navigate to the root directory:
   ```bash
   cd Portfolio
   ```
3. Install root dependencies:
   ```bash
   npm install
   ```

### Execution
Start both the React frontend dev client and the Express backend API simultaneously with a single command:
```bash
npm run dev
```

* **Frontend Dossier Interface:** [http://localhost:5173/](http://localhost:5173/)
* **Admin Telemetry Portal:** [http://localhost:5173/admin](http://localhost:5173/admin)
* **Backend API Gateway:** [http://localhost:5000/](http://localhost:5000/)
