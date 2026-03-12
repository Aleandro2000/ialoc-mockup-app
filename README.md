# 🍽️ IALOC - Restaurant Reservation Management System

<p align="center">
  <img src="mobile/src/assets/icon/ialoc-logo.svg" alt="IALOC Logo" width="150" height="150">
</p>

<p align="center">
  <strong>A modern full-stack application for restaurant managers to efficiently manage table reservations</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Angular-20-DD0031?style=flat-square&logo=angular" alt="Angular 20">
  <img src="https://img.shields.io/badge/Ionic-8-3880FF?style=flat-square&logo=ionic" alt="Ionic 8">
  <img src="https://img.shields.io/badge/Laravel-12-FF2D20?style=flat-square&logo=laravel" alt="Laravel 12">
  <img src="https://img.shields.io/badge/PHP-8.2-777BB4?style=flat-square&logo=php" alt="PHP 8.2">
  <img src="https://img.shields.io/badge/NgRx-20-BA2BD2?style=flat-square&logo=ngrx" alt="NgRx 20">
  <img src="https://img.shields.io/badge/Docker-Ready-2496ED?style=flat-square&logo=docker" alt="Docker">
</p>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
  - [Docker Deployment](#docker-deployment)
- [API Documentation](#-api-documentation)
- [Architecture](#-architecture)
- [Screenshots](#-screenshots)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🎯 Overview

**IALOC** is a comprehensive restaurant reservation management system designed for floor managers. It provides real-time visibility into daily reservations, automatic table suggestions based on party size, and seamless reservation creation — all without requiring manual page refreshes.

### Key Objectives

- 📅 **View Today's Reservations** - See all reservations for the current day at a glance
- 🔄 **Real-time Updates** - Observe new reservations without manual refresh (polling-based)
- 🪑 **Smart Table Suggestions** - System automatically suggests optimal tables based on guest count

---

## ✨ Features

### Mobile Application (Ionic/Angular)

| Feature | Description |
|---------|-------------|
| 📋 **Reservation List** | View all reservations for the selected date with status indicators |
| ➕ **Add Reservation** | Create new reservations with automatic table suggestion |
| 🪑 **Table Management** | Visual grid showing all tables with capacity information |
| 🔄 **Real-time Sync** | Automatic polling every 5 seconds for new reservations |
| 🎨 **Modern UI** | Red, white, and black theme with IALOC branding |
| 📱 **Cross-platform** | Works on iOS, Android, and Web |

### Backend API (Laravel)

| Feature | Description |
|---------|-------------|
| 🔌 **RESTful API** | Clean API endpoints for all operations |
| 🧠 **Smart Matching** | Intelligent table suggestion algorithm |
| 🏢 **Multi-restaurant** | Support for multiple restaurants via `X-Restaurant-Id` header |
| 📊 **SQLite/MySQL** | Flexible database options |
| 🐳 **Docker Ready** | Production-ready Docker configuration |
| ❤️ **Health Checks** | Built-in health monitoring endpoint |

---

## 🛠 Tech Stack

### Frontend

| Technology | Version | Purpose |
|------------|---------|---------|
| Angular | 20.x | Core framework |
| Ionic | 8.x | Mobile UI components |
| NgRx | 20.x | State management |
| TypeScript | 5.x | Type-safe JavaScript |
| Capacitor | 7.x | Native mobile runtime |
| RxJS | 7.x | Reactive programming |

### Backend

| Technology | Version | Purpose |
|------------|---------|---------|
| Laravel | 12.x | PHP framework |
| PHP | 8.2+ | Server-side language |
| SQLite/MySQL/PostgreSQL | - | Database |
| Nginx | Alpine | Web server |
| Docker | - | Containerization |

---

## 📁 Project Structure

```
ialoc-mock-project/
├── 📱 mobile/                    # Ionic/Angular Frontend
│   ├── src/
│   │   ├── app/
│   │   │   ├── store/           # NgRx State Management
│   │   │   │   ├── actions/     # Redux actions
│   │   │   │   ├── reducers/    # State reducers
│   │   │   │   ├── effects/     # Side effects
│   │   │   │   └── selectors/   # State selectors
│   │   │   ├── services/        # API & WebSocket services
│   │   │   ├── models/          # TypeScript interfaces
│   │   │   ├── tab1/            # Reservations list page
│   │   │   ├── tab2/            # Add reservation page
│   │   │   └── tab3/            # Tables grid page
│   │   ├── assets/
│   │   │   └── icon/            # App icons & logo
│   │   └── theme/               # Global styles
│   └── package.json
│
├── 🖥️ server/                    # Laravel Backend
│   ├── app/
│   │   ├── Http/Controllers/    # API Controllers
│   │   │   ├── ReservationController.php
│   │   │   ├── TableController.php
│   │   │   └── WebSocketController.php
│   │   └── Models/              # Eloquent Models
│   │       ├── Restaurant.php
│   │       ├── Table.php
│   │       └── Reservation.php
│   ├── database/
│   │   ├── migrations/          # Database schema
│   │   └── seeders/             # Sample data
│   ├── routes/
│   │   └── web.php              # API routes
│   ├── docker/                  # Docker configuration
│   │   ├── nginx/
│   │   ├── php/
│   │   └── supervisor/
│   ├── Dockerfile
│   ├── docker-compose.yaml
│   └── Makefile
│
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ and npm
- **PHP** 8.2+
- **Composer** 2.x
- **Docker** (optional, for containerized deployment)

### Backend Setup

```bash
# Navigate to server directory
cd server

# Install PHP dependencies
composer install

# Copy environment file
cp .env.example .env

# Configure for SQLite
sed -i 's/DB_CONNECTION=mysql/DB_CONNECTION=sqlite/' .env

# Generate application key
php artisan key:generate

# Run database migrations
php artisan migrate

# Seed sample data
php artisan db:seed

# Start the development server
php artisan serve --host=0.0.0.0 --port=8000
```

The API will be available at `http://localhost:8000`

### Frontend Setup

```bash
# Navigate to mobile directory
cd mobile

# Install dependencies
npm install

# Start development server
npm start
```

The app will be available at `http://localhost:4200`

### Docker Deployment

```bash
# Navigate to server directory
cd server

# Copy Docker environment file
cp .env.docker .env

# Build and start containers
make build
make up

# Or using docker-compose directly
docker compose --env-file .env.docker up -d

# View logs
make logs

# Run with MySQL (optional)
make up-mysql
```

---

## 📡 API Documentation

### Base URL

```
http://localhost:8000/api
```

### Headers

| Header | Required | Description |
|--------|----------|-------------|
| `X-Restaurant-Id` | Yes | Restaurant identifier (e.g., `1`) |
| `Content-Type` | Yes* | `application/json` for POST requests |

### Endpoints

#### Get Reservations

```http
GET /api/reservations?date=2026-03-12
```

**Response:**
```json
{
  "data": [
    {
      "id": 1,
      "guest_name": "John Doe",
      "guest_count": 4,
      "reservation_date": "2026-03-12",
      "reservation_time": "19:00:00",
      "status": "confirmed",
      "table": {
        "id": 1,
        "table_number": "A1",
        "min_capacity": 2,
        "max_capacity": 4
      }
    }
  ]
}
```

#### Create Reservation

```http
POST /api/reservations
```

**Request Body:**
```json
{
  "guest_name": "Jane Smith",
  "guest_count": 3,
  "reservation_date": "2026-03-12",
  "reservation_time": "20:00"
}
```

**Response:**
```json
{
  "data": {
    "id": 7,
    "guest_name": "Jane Smith",
    "guest_count": 3,
    "reservation_date": "2026-03-12",
    "reservation_time": "20:00:00",
    "status": "confirmed",
    "table": {
      "id": 3,
      "table_number": "A3"
    }
  },
  "message": "Reservation created successfully"
}
```

#### Suggest Table

```http
POST /api/reservations/suggest-table
```

**Request Body:**
```json
{
  "guest_count": 5,
  "reservation_date": "2026-03-12",
  "reservation_time": "19:00"
}
```

#### Get Tables

```http
GET /api/tables
```

#### Poll for Updates (WebSocket simulation)

```http
GET /api/ws/poll?since=1710000000
```

#### Health Check

```http
GET /health
```

---

## 🏗 Architecture

### State Management (NgRx)

```
┌─────────────────────────────────────────────────────────────┐
│                        Components                            │
│  (Tab1Page, Tab2Page, Tab3Page)                             │
└─────────────────┬───────────────────────────────────────────┘
                  │ dispatch actions
                  ▼
┌─────────────────────────────────────────────────────────────┐
│                         Actions                              │
│  loadReservations, addReservation, suggestTable, etc.       │
└─────────────────┬───────────────────────────────────────────┘
                  │
        ┌─────────┴─────────┐
        ▼                   ▼
┌───────────────┐   ┌───────────────┐
│    Effects    │   │   Reducers    │
│  (API calls)  │   │ (State logic) │
└───────┬───────┘   └───────┬───────┘
        │                   │
        ▼                   ▼
┌───────────────┐   ┌───────────────┐
│   Services    │   │     Store     │
│ (HTTP client) │   │   (State)     │
└───────────────┘   └───────┬───────┘
                            │
                            ▼
                    ┌───────────────┐
                    │   Selectors   │
                    │ (Derive data) │
                    └───────────────┘
```

### Database Schema

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│  restaurants │     │    tables    │     │ reservations │
├──────────────┤     ├──────────────┤     ├──────────────┤
│ id           │◄────│ restaurant_id│     │ id           │
│ name         │     │ id           │◄────│ table_id     │
│ address      │     │ table_number │     │ guest_name   │
│ created_at   │     │ min_capacity │     │ guest_count  │
│ updated_at   │     │ max_capacity │     │ date         │
└──────────────┘     │ location     │     │ time         │
                     │ is_available │     │ status       │
                     └──────────────┘     │ notes        │
                                          └──────────────┘
```

### Table Suggestion Algorithm

The system uses a smart algorithm to suggest optimal tables:

1. **Filter available tables** matching capacity requirements
2. **Check for conflicts** with existing reservations (±2 hour window)
3. **Score tables** by proximity to guest count (prefer exact matches)
4. **Return best match** or indicate no availability

---

## 📸 Screenshots

### Reservations List (Tab 1)
- View all reservations for selected date
- Status badges (confirmed, pending, cancelled)
- Real-time updates via polling

### Add Reservation (Tab 2)
- Guest name and count input
- Date and time pickers
- Automatic table suggestion
- One-click reservation creation

### Tables Grid (Tab 3)
- Visual representation of all tables
- Capacity information display
- Availability status

---

## 🎨 Theme & Branding

| Element | Color |
|---------|-------|
| Primary (Red) | `#E53935` |
| Background | `#FFFFFF` |
| Text Dark | `#1a1a1a` |
| Accent | `#B71C1C` |

The app features the IALOC logo prominently in the header with a red gradient background and modern shadow effects.

---

## 🧪 Testing

### Backend Tests

```bash
cd server
php artisan test
```

### Frontend Tests

```bash
cd mobile
npm test
```

---

## 🐳 Docker Commands

| Command | Description |
|---------|-------------|
| `make build` | Build Docker image |
| `make up` | Start containers (SQLite) |
| `make up-mysql` | Start with MySQL |
| `make up-full` | Start with MySQL + Redis |
| `make down` | Stop containers |
| `make logs` | View container logs |
| `make shell` | Open container shell |
| `make migrate` | Run migrations |
| `make seed` | Run seeders |
| `make fresh` | Fresh migration + seed |
| `make clean` | Remove all containers |

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<p align="center">
  Made with ❤️ by Aleandro2000
</p>
