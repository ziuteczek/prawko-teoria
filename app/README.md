# 🏎️ Prawko Teoria

A **web app** to help you prepare for the **driving license theory exam**.  
Includes **practice quizzes**, **lessons**, and (soon) **AI assistance** and **mock tests**.

---

## 🚀 Features
- 🧠 **Interactive Quizzes** – Practice real exam-style questions  
- 📚 **Lessons** – Learn the theory step-by-step *(coming soon)*
- 🤖 **AI Assistance** *(coming soon)* – Ask for explanations or hints  
- 🧾 **Mock Tests** *(coming soon)* – Simulate the real exam

***More coming soon***

---

## Implementation

- ⚡ **Question Queue** – All questions and media are preloaded into browser memory for fast performance  
- 🔑 **Google & Facebook Login** – Secure and easy authentication with social media accounts  

***More coming soon***

## 🛠️ Tech Stack

**Backend:**  
- 🗄️ [Supabase](https://supabase.com/) – Database & Authentication  
- ☁️ Google Cloud – Media storage  

**Frontend:**  
- ⚛️ [React](https://react.dev/) + [Vite](https://vitejs.dev/) – Main app interface  
- 🪐 [Astro](https://astro.build/) – Landing / marketing page  

---

## 🧰 Running the App

### 1. Build the Docker image

```bash
docker build -t prawko-teoria .
```

### 1. Run

```bash
docker run -p 3000:80 prawko-teoria
