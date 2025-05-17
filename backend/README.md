# AI-Powered Mental Health Journey - Backend

This is the backend API for the AI-Powered Mental Health Journey application, which provides users with an interface to journal their thoughts and receive AI-powered sentiment analysis.

## Features

- User authentication (register, login)
- Journal entry creation and retrieval
- Sentiment analysis of journal entries
- User profile management

## Tech Stack

- Node.js
- Express
- MySQL
- JWT for authentication
- Sentiment.js for text analysis

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MySQL

### Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file with the following variables:
   ```
   PORT=5000
   DB_HOST=localhost
   DB_USER=your_db_username
   DB_PASSWORD=your_db_password
   DB_NAME=mental_health_journal
   JWT_SECRET=your_jwt_secret
   ```

### Database Setup

Create a MySQL database and run the following SQL to set up the tables:

```sql
CREATE DATABASE mental_health_journal;
USE mental_health_journal;

CREATE TABLE Users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE JournalEntries (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  entry_text TEXT NOT NULL,
  sentiment VARCHAR(20) NOT NULL,
  emotion_score FLOAT NOT NULL,
  entry_date DATE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES Users(id)
);
```

### Running the Application

Development mode:
```
npm run dev
```

Production mode:
```
npm start
```

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (protected)

### Journals

- `POST /api/journals` - Create new journal entry (protected)
- `GET /api/journals/user` - Get all journal entries for the logged-in user (protected)
- `GET /api/journals/analysis` - Get sentiment analysis summary for the user (protected)

## License

This project is licensed under the ISC License.
