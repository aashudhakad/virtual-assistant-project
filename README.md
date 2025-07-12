# 🎙️ Virtual Assistant AI

A voice‑enabled virtual assistant built with React (front‑end), Node.js/Express (back‑end), MongoDB for persistence, and Google’s Gemini API for natural‑language understanding.\
Ask it questions (“What’s the day?”, “Search IIIT Gwalior on YouTube”), and it’ll speak back or open the right page for you.

---

## 📂 Repository Structure

```
virtual-assistant-project/
├── backend/        # Node.js + Express API
├── frontend/       # React web client
└── README.md       # (this file)
```

---

## 🚀 Features

- **Continuous speech recognition** (Web Speech API)
- **Text‑to‑speech** responses in Hindi/English
- **Intent routing** for search (Google, YouTube), time/date/day/month, calculator, weather, social links
- **Persistence** of user history in MongoDB
- **Customizable** assistant name & avatar

---

## 🛠️ Tech Stack

- **Front‑end**: React, Tailwind CSS, React Router
- **Back‑end**: Node.js, Express, Mongoose (MongoDB)
- **AI**: Google Gemini API
- **Speech**: Browser Web Speech API (SpeechRecognition & SpeechSynthesis)
- **Storage**: MongoDB (Atlas or local)
- **Media**: Cloudinary for avatar uploads

---

## 🔧 Prerequisites

- [Node.js](https://nodejs.org/) v16+ & npm
- [MongoDB](https://www.mongodb.com/) (Atlas cluster or local)
- A valid **Gemini API** endpoint URL & credentials
- (Optional) [Cloudinary](https://cloudinary.com/) account for image uploads

---

## 📥 Installation

### 1. Clone the repo

```bash
git clone https://github.com/aashudhakad/virtual-assistant-project.git
cd virtual-assistant-project
```

### 2. Back‑end Setup

```bash
cd backend
```

1. Copy the example env file and edit with your credentials:
   ```bash
   cp .env.example .env
   ```
2. In `.env` fill in:
   ```dotenv
   MONGODB_URI=your-mongodb-connection-string
   GEMINI_API_URL=https://your-gemini-endpoint
   JWT_SECRET=someRandomSecretForCookies
   CLOUDINARY_CLOUD_NAME=…
   CLOUDINARY_API_KEY=…
   CLOUDINARY_API_SECRET=…
   ```
3. Install dependencies and start the server:
   ```bash
   npm install
   npm run dev        # runs with nodemon
   ```
   The API will now listen on `http://localhost:5000` (or whatever you set in `.env`).

### 3. Front‑end Setup

Open a new terminal:

```bash
cd frontend
```

1. Copy/edit any front‑end env vars (if provided):
   ```bash
   cp .env.example .env
   ```
2. Install dependencies and start the React app:
   ```bash
   npm install
   npm start
   ```
   Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## ⚙️ How to Use

1. Open the React app ([http://localhost:3000](http://localhost:3000)).
2. On first load, your browser will ask for **microphone** permission—allow it.
3. The assistant will greet you, then sit in “listening” mode:
   - Say your assistant’s name (e.g. “Jarvis”), then ask a command:
     - **“What is the day?”** → it replies with today’s weekday.
     - **“Search IIIT Gwalior on YouTube.”** → it opens YouTube in a new tab.
     - **“Open calculator.”** → it opens Google’s calculator.
4. Your commands are saved in your user history (visible in the side‑drawer).

---

## 🤝 Contributing

1. Fork the repo
2. Create your feature branch (`git checkout -b feat/YourFeature`)
3. Commit your changes (`git commit -m "feat: add YourFeature"`)
4. Push to your branch (`git push origin feat/YourFeature`)
5. Open a Pull Request — I’ll be happy to review!

---

## 📄 License

This project is open‑source and available under the [MIT License](LICENSE).

---

> Built with ❤️ by Aayush Dhakad\
> Feel free to drop me a line at `dkdayush@gmail.com` if you have any questions!

