# Habit Tracking Dashboard Setup Guide

This guide will help you set up the complete habit tracking dashboard as shown in the image.

## Features Implemented

- ✅ User profile display with name and current date
- ✅ Level progress bar with XP tracking
- ✅ Streak counter with fire icon
- ✅ Daily XP tracker
- ✅ Habit categories with icons:
  - Work & Task Habits (briefcase icon)
  - Learning & Growth Habits (books icon)
  - Collaboration Habits (handshake icon)
  - Personal Discipline Habits (user icon)
  - Challenge-based Habits (trophy icon)
- ✅ Interactive checkboxes for habit completion
- ✅ XP rewards display for each habit
- ✅ Responsive design with purple gradient background
- ✅ Sidebar navigation with logout button

## Backend Setup

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Environment Configuration
Create a `.env` file in the backend directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/habit-tracker
```

### 3. Database Setup
Make sure MongoDB is running on your system.

### 4. Populate Sample Data
Run the following command to populate the database with sample habits:
```bash
cd backend
node populateData.js
```

This will create:
- 20 sample habits across 5 categories
- A sample user (D. Alise Parker) with 240 XP, Level 12, and 7-day streak

### 5. Start Backend Server
```bash
cd backend
npm start
```

The backend will run on `http://localhost:5000`

## Frontend Setup

### 1. Install Dependencies
```bash
cd frontend
npm install
```

### 2. Environment Configuration
Create a `.env` file in the frontend directory:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

### 3. Start Frontend Development Server
```bash
cd frontend
npm start
```

The frontend will run on `http://localhost:3000`

## API Endpoints

### Habits
- `GET /api/habits` - Get all habits
- `POST /api/habits` - Add new habit (admin only)
- `PUT /api/habits/:id` - Update habit (admin only)
- `DELETE /api/habits/:id` - Delete habit (admin only)

### Habit Logs
- `GET /api/habit-logs/user/:userId` - Get user's habit logs
- `GET /api/habit-logs/user/:userId/date/:date` - Get habit logs for specific date
- `POST /api/habit-logs/complete` - Complete a habit
- `PUT /api/habit-logs/:id` - Update habit log
- `DELETE /api/habit-logs/:id` - Delete habit log

### Users
- `GET /api/users/:id` - Get user profile
- `PUT /api/users/:id` - Update user profile

## Database Schema

### Habit Model
```javascript
{
  name: String,
  category: String (work|learning|collaboration|discipline|challenge),
  xpValue: Number,
  frequency: String (daily|weekly),
  isActive: Boolean
}
```

### HabitLog Model
```javascript
{
  userId: ObjectId,
  habitId: ObjectId,
  date: Date,
  completed: Boolean,
  xpEarned: Number,
  notes: String
}
```

### User Model
```javascript
{
  name: String,
  email: String,
  role: String (intern|admin),
  xp: Number,
  level: Number,
  streak: Number,
  badges: [ObjectId]
}
```

## Usage

1. Navigate to `http://localhost:3000/Dashboard`
2. You'll see the habit tracking dashboard with:
   - User profile section with name and date
   - Level progress bar showing current XP and level
   - Streak counter
   - Daily XP tracker
   - Habit categories with individual habits
3. Click on checkboxes to mark habits as complete
4. XP will be automatically calculated and user progress updated

## Customization

### Adding New Habits
Admins can add new habits through the API:
```bash
curl -X POST http://localhost:5000/api/habits \
  -H "Content-Type: application/json" \
  -d '{
    "name": "New Habit",
    "category": "work",
    "xpValue": 15,
    "frequency": "daily",
    "isActive": true
  }'
```

### Modifying Categories
Update the `getCategoryIcon` and `getCategoryTitle` functions in `InternDashboard.js` to add new categories.

### Styling
The dashboard uses Tailwind CSS. Modify the classes in the components to change the appearance.

## Troubleshooting

### Common Issues

1. **Backend not starting**: Check if MongoDB is running and the connection string is correct
2. **Frontend can't connect to backend**: Verify the API URL in the frontend `.env` file
3. **No habits showing**: Run the `populateData.js` script to add sample data
4. **CORS errors**: The backend includes CORS middleware, but check if the frontend URL is allowed

### Logs
Check the console for any error messages. The backend will log connection status and API requests.

## Next Steps

- Implement user authentication
- Add admin panel for managing habits
- Create leaderboard functionality
- Add badge system
- Implement real-time updates
- Add habit completion notifications 