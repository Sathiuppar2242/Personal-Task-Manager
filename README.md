# Personal Task Manager

A full-stack task management application built using the MERN stack. The application allows users to create, view, edit, complete, and delete tasks through a responsive React interface connected to a Node.js and Express REST API with MongoDB persistence.

## 🚀 Features

- Create new tasks
- View all tasks
- Edit existing tasks
- Mark tasks as completed or pending
- Delete tasks
- Task descriptions
- Loading state while fetching tasks
- User-friendly error messages
- Responsive user interface
- Persistent data storage using MongoDB

## 🛠️ Technologies Used

### Frontend
- React.js
- Vite
- Axios
- HTML5
- CSS3

### Backend
- Node.js
- Express.js
- Mongoose
- CORS
- dotenv

### Database
- MongoDB Atlas

### Development Tools
- Visual Studio Code
- Git
- GitHub
- Postman

## 📁 Project Structure

```text
Personal-Task-Manager/
│
├── backend/
│   ├── models/
│   │   └── Task.js
│   ├── routes/
│   │   └── taskRoutes.js
│   ├── .env
│   ├── .gitignore
│   ├── package.json
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── services/
│   │   │   └── taskService.js
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   ├── package.json
│   └── package-lock.json
│
├── .gitignore
└── README.md
🏗️ Application Architecture
React Frontend
      │
      │ Axios HTTP Requests
      ▼
Express REST API
      │
      │ Mongoose
      ▼
MongoDB Atlas
🔗 API Endpoints
Method	Endpoint	Description
GET	/api/tasks	Retrieve all tasks
POST	/api/tasks	Create a new task
PUT	/api/tasks/:id	Update a task
DELETE	/api/tasks/:id	Delete a task
⚙️ Installation and Setup
1. Clone the repository
git clone https://github.com/Sathiuppar2242/Personal-Task-Manager.git
cd Personal-Task-Manager
2. Install backend dependencies
cd backend
npm install
3. Configure environment variables

Create a .env file inside the backend folder:

MONGO_URI=your_mongodb_connection_string
PORT=5000

Do not upload the .env file to GitHub.

4. Start the backend
npm run dev

The backend runs on:

http://localhost:5000
5. Install frontend dependencies

Open another terminal:

cd frontend
npm install
6. Start the frontend
npm run dev

The frontend normally runs on:

http://localhost:5173
🧪 Testing Performed

The following functionality was tested successfully:

Task creation
Task retrieval
Task editing
Marking tasks as completed
Marking tasks as pending
Task deletion
MongoDB data persistence
Browser refresh persistence
Frontend-backend communication
Loading state
Error handling
Responsive interface
Production build
📌 Key Implementation Decisions
Used React state management for task and form data.
Used Axios for communication between frontend and backend.
Used Express routes to implement RESTful CRUD operations.
Used Mongoose for MongoDB schema and database operations.
Used MongoDB Atlas for cloud database persistence.
Used environment variables for database configuration.
Added validation for required task titles.
Added responsive CSS for different screen sizes.
🎯 Learning Outcomes

Through this project, I gained practical experience in:

MERN stack development
REST API development
MongoDB database integration
React component and state management
Frontend-backend integration
CRUD operations
API error handling
Git and GitHub workflow
Responsive web design
⚠️ Limitations
No user authentication or authorization.
Tasks are not separated by individual users.
No task priority or category system.
No due-date or reminder functionality.
API URL is currently configured for local development.
🔮 Future Enhancements
User registration and login
JWT authentication
User-specific task management
Task priorities
Categories and filters
Due dates and reminders
Search functionality
Task sorting
Deployment to cloud platforms
👨‍💻 Author

Sathish R

Computer Science Engineering Student

📄 License

This project is created for educational and internship purposes.