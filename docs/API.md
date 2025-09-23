# API Documentation

## Base URL

- Development: `http://localhost:5000/api/v1`
- Production: `https://yourdomain.com/api/v1`

## Authentication

All protected endpoints require a Bearer token in the Authorization header:

```
Authorization: Bearer <access_token>
```

## Endpoints

### Authentication

#### POST /auth/login
Login user and get access tokens.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "message": "Login successful",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "role": "student"
  },
  "tokens": {
    "access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
    "refresh_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9..."
  }
}
```

#### POST /auth/register
Register a new user.

**Request Body:**
```json
{
  "email": "newuser@example.com",
  "password": "password123",
  "role": "student",
  "student_profile": {
    "first_name": "John",
    "last_name": "Doe",
    "student_id": "STU001"
  }
}
```

#### POST /auth/refresh
Refresh access token using refresh token.

#### GET /auth/profile
Get current user profile (requires authentication).

### Students

#### GET /students
Get all students with pagination and filtering.

**Query Parameters:**
- `page` (int): Page number (default: 1)
- `per_page` (int): Items per page (default: 10)
- `search` (string): Search by name or student ID
- `class` (string): Filter by class
- `section` (string): Filter by section

**Response:**
```json
{
  "students": [
    {
      "id": 1,
      "student_id": "STU001",
      "first_name": "John",
      "last_name": "Doe",
      "full_name": "John Doe",
      "class_name": "10th Grade",
      "section": "A"
    }
  ],
  "pagination": {
    "page": 1,
    "pages": 5,
    "per_page": 10,
    "total": 50
  }
}
```

#### POST /students
Create a new student (Admin only).

#### GET /students/{id}
Get specific student by ID.

#### PUT /students/{id}
Update student information.

#### DELETE /students/{id}
Delete (deactivate) student (Admin only).

### Subjects

#### GET /subjects
Get all active subjects.

#### POST /subjects
Create a new subject (Admin only).

#### GET /subjects/{id}
Get specific subject with statistics.

#### PUT /subjects/{id}
Update subject information (Admin only).

#### DELETE /subjects/{id}
Delete subject (Admin only).

### Results

#### GET /results
Get all results with filtering.

**Query Parameters:**
- `student_id` (int): Filter by student
- `subject_id` (int): Filter by subject
- `semester` (string): Filter by semester
- `academic_year` (string): Filter by academic year
- `class` (string): Filter by class
- `grade` (string): Filter by grade

#### POST /results
Create a new result.

**Request Body:**
```json
{
  "student_id": 1,
  "subject_id": 1,
  "marks_obtained": 85,
  "total_marks": 100,
  "semester": "Fall 2024",
  "academic_year": "2024-2025"
}
```

#### PUT /results/{id}
Update result information.

#### DELETE /results/{id}
Delete result (Admin only).

#### POST /results/bulk
Create multiple results at once.

#### GET /results/analytics
Get results analytics and statistics.

## Error Responses

All endpoints return errors in the following format:

```json
{
  "message": "Error description"
}
```

**Common Status Codes:**
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `409` - Conflict
- `500` - Internal Server Error

## Rate Limiting

API requests are limited to prevent abuse:
- 100 requests per minute for authenticated users
- 20 requests per minute for unauthenticated users
