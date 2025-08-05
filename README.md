# 🔗 URL Shortener (Full Stack)

A **URL Shortener** with **JWT-based Authentication**, **URL history tracking**, and a polished **Tailwind CSS frontend**.

---

## 🚀 Features
- **Shorten long URLs** with one-click.
- **User Authentication (JWT-based login/signup)**.
- **Track URLs per logged-in user**.
- **Paginated URL History** – view all URLs you've shortened.
- **Click-level Analytics** (Track IP address, Timestamp of clicks).
- Clean **UI/UX with Tailwind CSS**.

---

## 🛠️ Tech Stack
### Frontend:
- **Next.js** (React Framework)
- **Tailwind CSS** for UI/UX styling

### Backend:
- **Node.js + Express.js API**
- **MongoDB** (Database)
- **Mongoose ODM**
- **JWT Authentication**


---

## ⚙️ Setup Instructions (Local Development)
1. Clone the Repo:
bash
Copy
Edit
git clone https://github.com/Simran3024/URL-Shortener.git
cd URL-Shortener

2. Setup Backend API

cd server
npm install
Create a .env file inside /server folder with:

MONGO_URI=your-mongodb-connection-string
JWT_SECRET=your-jwt-secret
Run the backend server:

npm run dev
The backend will run on: http://localhost:5000

3. Setup Frontend (Next.js Client)

cd ../client
npm install
npm run dev
The frontend will be available at: http://localhost:3000

4. Test the Application
Go to: http://localhost:3000

Register a new user and start shortening URLs.

Visit /urlshortener route after login to access URL shortener.

Visit /stats/[code] to see click analytics for shortened URLs.

✨ Bonus Features Implemented
JWT-based user login and tracking URLs per user – Each user has their own URL dashboard.

Click-level tracking (IP, timestamps) – The app records IP address and timestamp for every click on shortened URLs.

Clean UI/UX polish using Tailwind CSS – Minimal and responsive frontend styling.


By Simranjeet Kaur
