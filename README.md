# Drive Trip Logger

A full-stack web application that allows users to log, manage, and track memorable driving trips.

---

## Features

- Add a new trip
- Edit an existing trip
- Delete a trip with confirmation
- Mark trips as memorable
- Filter all trips or memorable trips only
- Summary dashboard showing:
  - Total Trips
  - Total Distance
  - Total Memorable Trips
- Form validation
- Responsive UI
- Dockerized deployment

---

## Tech Stack

### Frontend
- Next.js
- TypeScript
- Tailwind CSS
- Axios

### Backend
- Spring Boot
- Spring Data JPA
- Maven

### Database
- PostgreSQL

### Containerization
- Docker
- Docker Compose

---

## Why This Stack

- Next.js provides a modern and responsive frontend experience.
- Spring Boot enables rapid development of REST APIs with strong Java ecosystem support.
- PostgreSQL was chosen for reliable data persistence and easy Docker integration.

---

## Running the Application

### Prerequisites

- Docker Desktop
- Docker Compose

### Start the application

From the project root:

```bash
docker compose up --build
```

### Application URLs

Frontend:

http://localhost:3000

Backend:

http://localhost:8080/api/trips

---

## API Endpoints

### Get All Trips

```http
GET /api/trips
```

### Create Trip

```http
POST /api/trips
```

### Update Trip

```http
PUT /api/trips/{id}
```

### Delete Trip

```http
DELETE /api/trips/{id}
```

### Get Memorable Trips

```http
GET /api/trips/memorable
```

### Summary

```http
GET /api/trips/summary
```

---

## Validation Rules

- Start Location is required
- End Location is required
- Start and End locations must be different
- Start Time is required
- End Time must be later than Start Time
- Distance must be greater than 0
- Notes are optional (up to 500 characters)

---

## Future Improvements

If given additional time, I would:

- Add search functionality
- Add sorting options
- Add pagination for large datasets
- Add automated unit and integration tests
- Improve accessibility support
- Add CI/CD pipeline for automated deployment

---

## Known Limitations

- Authentication and user accounts were intentionally excluded as per assignment requirements.
- Additional automated tests would be added before production deployment.

---

## Author

Jeba Christina
