**# StreaksApp 🎯**

A modern web application for tracking your daily habits and building consistent streaks. Stay motivated and achieve your goals with StreaksApp!

**## 🌟 Features**

- **Habit Tracking**: Create and manage multiple habit streaks
- **Visual Progress**: View your progress through interactive calendars and graphs
- **Streak Statistics**: Track your longest and current streaks
- **User Authentication**: Secure signup/login system with password reset functionality
- **Profile Management**: Customize your profile with avatar and personal settings
- **Responsive Design**: Works seamlessly on both desktop and mobile devices

****## 🚀 Tech Stack

**### Frontend**
- TypeScript
- Webpack
- Chart.js
- Luxon for date handling
- Modern CSS with responsive design

**### Backend**
- Node.js with Express
- TypeScript
- Prisma ORM
- JWT Authentication
- Winston Logger
- Nodemailer for email notifications

**## 📋 Prerequisites**

- Node.js (v14 or higher)
- npm or yarn
- PostgreSQL database

**## 🛠️ Installation**

1. Clone the repository:
git clone https://github.com/yourusername/StreaksApp.git
cd StreaksApp

2. Install dependencies for both frontend and backend:
   
**Frontend**
cd frontend
npm install

**Backend**
cd ../backend
npm install

3. Create a `.env` file in the backend directory with the following variables:
DATABASE_URL="postgresql://username:password@localhost:5432/streaksapp"
JWT_SECRET="your-secret-key"
EMAIL_USER="your-email@gmail.com"
EMAIL_PASS="your-email-password"

4. Start the development servers:
Frontend (in frontend directory)
**npm run dev**

Backend (in backend directory)
**npm run dev**


**## 🌐 Usage**

1. Open your browser and navigate to `http://localhost:8080`
2. Create an account or log in
3. Start creating and tracking your streaks!

**## 🔒 Security Features**

- JWT-based authentication
- Password hashing with bcrypt
- Protected API routes
- Secure password reset flow
- CORS protection

**## 📦 Project Structure**

streaksapp/
├── frontend/
│ ├── src/
│ │ ├── components/
│ │ ├── utils/
│ │ ├── api/
│ │ └── styles/
│ └── public/
└── backend/
├── src/
│ ├── controllers/
│ ├── middleware/
│ ├── routes/
│ └── utils/
└── prisma/


**## 🤝 Contributing**

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

**## 📝 License**

This project is licensed under the  MIT License - see the [LICENSE](LICENSE) file for details.

**## 👏 Acknowledgments**

- Chart.js for beautiful data visualization
- The TypeScript team for an amazing development experience
- The open-source community for invaluable tools and libraries


