# ChatGPT Clone 🧠

**ChatGPT Clone** is a full-stack application that replicates the core functionality of ChatGPT using the OpenAI API. It's built for learning, experimentation, and hands-on practice with conversational AI.

---

## 🚀 Features

- Interactive chat interface
- Real-time message streaming
- Conversation state managed per session
- Communication with OpenAI's Chat Completion API
- Clean and responsive front-end design

---

## 🧱 Tech Stack

- **Frontend**: React (with Redux for state management), Tailwind CSS
- **Backend**: Node.js + Express (handles API requests and sessions)
- **API**: OpenAI API (Chat Completions endpoint)
- **State Management**: Redux Toolkit
- **UUID**: Used to uniquely identify messages and conversations
- **WebSocket**: For real-time message exchange

---

## 🛠️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/nadiia-dev/chatgpt_clone.git
cd chatgpt_clone
```

### 2. Install dependencies

```bash
# Backend
cd server
npm install

# Frontend
cd ../client
npm install
```

### 3. Configure environment variables

Create a `.env` file in the `server/` directory with:

```env
API_KEY=your_openai_api_key
PORT=5000
```

### 4. Run the app

```bash
# From root directory
npm run dev
```

This will concurrently start both frontend (on `http://localhost:5173`) and backend (on `http://localhost:3000`).
