# Drive Trip Logger

A simple full-stack web application for logging driving trips and marking memorable journeys.

## Features

* Add a trip
* Edit a trip
* Delete a trip with confirmation
* Mark trips as memorable
* Filter all trips or memorable trips only
* Summary dashboard showing:

  * Total trips
  * Total distance traveled
  * Total memorable trips
* Responsive UI

---

## Tech Stack

### Frontend

* Next.js
* TypeScript
* Tailwind CSS

### Backend

* Spring Boot

### Database

* PostgreSQL

### Why this stack?

Next.js provides a fast and modern frontend experience with strong TypeScript support. Spring Boot allows rapid API development with excellent maintainability. PostgreSQL is a reliable relational database that fits the structured nature of trip data.

---

## Running the Application

### Prerequisites

* Docker
* Docker Compose

### Start the application

```bash
docker compose up --build
```

### Frontend

Available at:

```text
http://localhost:3000
```

### Backend API

Available at:

```text
http://localhost:8080
```

### PostgreSQL

Available at:

```text
localhost:5432
```

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

### Get Summary

```http
GET /api/trips/summary
```

---

## Project Structure

```text
frontend/
  app/
  components/
  services/

backend/
  src/
  pom.xml

docker-compose.yml
```

---

## What I Would Improve With More Time

* Add pagination for very large trip lists
* Add search by location
* Add trip statistics and charts
* Improve notification system using toast messages
* Add unit and integration tests
* Add dark mode support

---

## Known Limitations

* No authentication or user management
* Basic form validation only
* Single-user application
* No production-grade monitoring or logging

---

## Assumptions

* Distance is stored in kilometers.
* A trip can be marked memorable using a boolean flag.
* Trips are displayed with the most recent trips first.
