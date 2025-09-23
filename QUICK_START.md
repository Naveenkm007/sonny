# 🚀 Quick Start Guide

## 🎯 Get SRMS Running in 5 Minutes

### Step 1: Setup Environment Files

**Create Backend Environment:**
```bash
cd backend
copy .env.example .env
```

Edit `backend/.env`:
```
FLASK_APP=run.py
FLASK_ENV=development
SECRET_KEY=your-secret-key-change-this
JWT_SECRET_KEY=your-jwt-secret-change-this
DATABASE_URL=sqlite:///srms.db
CORS_ORIGINS=http://localhost:3000
```

**Create Frontend Environment:**
```bash
cd frontend
copy .env.example .env.local
```

### Step 2: Install Dependencies

**Backend:**
```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
```

**Frontend:**
```bash
cd frontend
npm install
```

### Step 3: Setup Database

```bash
cd backend
venv\Scripts\activate
flask db init
flask db migrate -m "Initial migration"
flask db upgrade
python scripts/create_sample_data.py
```

### Step 4: Start Servers

**Terminal 1 - Backend:**
```bash
cd backend
venv\Scripts\activate
flask run
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

### Step 5: Access Application

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5000

### 🔑 Demo Login Credentials

**Admin Access:**
- Email: `admin@srms.com`
- Password: `admin123`

**Teacher Access:**
- Email: `teacher@srms.com`
- Password: `teacher123`

**Student Access:**
- Email: `john.doe@student.com`
- Password: `student123`

### 🎉 You're Ready!

The system is now running with sample data including:
- 3 Students with results
- 5 Subjects (Math, Physics, Chemistry, English, CS)
- Sample grades and analytics
- Complete user roles and permissions

## 🛠️ Alternative: One-Click Setup

For automated setup, use the provided scripts:

**Windows:**
```bash
scripts\setup.bat
scripts\start.bat
```

**Linux/Mac:**
```bash
chmod +x scripts/setup.sh scripts/start.sh
./scripts/setup.sh
./scripts/start.sh
```

## 🚢 Docker Option

```bash
docker-compose up --build
```

## 📱 Test the Features

1. **Login** as admin/teacher/student
2. **Dashboard** - View role-specific data
3. **Students** - Manage student records (admin/teacher)
4. **Subjects** - Manage subjects (admin)
5. **Results** - Enter/view grades
6. **Analytics** - Performance statistics

Happy testing! 🎓
