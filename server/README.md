# Segment3d API

Welcome to the Segment3d API project! This API provides functionality for Segment3d Mobile and Web Apps.

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Configuration](#configuration)
- [Usage](#usage)
  - [Running the Server](#running-the-server)
  - [API Documentation](#api-documentation)
- [License](#license)

## Getting Started

### Prerequisites

Ensure you have the following tools installed on your machine:

- [Go v1.21.6](https://go.dev/dl/)
- [Docker](https://hub.docker.com/)

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/autorepl/server.git
    cd segment3d-be

    ```

2.  **Install dependencies:**

    ```bash
    go get -u ./...
    ```

3.  **Install `golang-migrate`:**
    The golang-migrate package is a CLI tool that you can use to run migrations. You can easily install it on various operating systems such as Linux, Mac and Windows by using package managers like curl, brew, and scoop, respectively.

    - using curl

    ```bash
    curl -L https://packagecloud.io/golang-migrate/migrate/gpgkey| apt-key add -
    echo "deb https://packagecloud.io/golang-migrate/migrate/ubuntu/ $(lsb_release -sc) main" > /etc/apt/sources.list.d/migrate.list
    apt-get update
    apt-get install -y migrate
    ```

    - using homebrew

    ```bash
    brew install golang-migrate
    ```

    - using scoop

    ```bash
    scoop install migrate
    ```

### Configuration

1. **Create PostgreSQL Container simply by running makefile script:**

   ```bash
    make run-postgres
   ```

2. **Create Database Schema:**

   ```bash
    make create-db
   ```

3. **Run Migrations:**
   ```bash
    make migrate-up
   ```

## Usage

### Running the Server

```bash
make server-dev
```

# API Documentation

To access the API documentation, visit the Swagger documentation at `http://localhost:8080/swagger/index.html` after starting the server.

## License

This project is licensed under the [MIT License](LICENSE).
