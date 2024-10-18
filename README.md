# Country Info App

This project consists of a backend and a frontend to display country information. The backend is built with Node.js and Express, while the frontend is built with Next.js and React.

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Installation

### Backend

1. Navigate to the backend directory:
    ```sh
    cd BE
    ```

2. Install the dependencies:
    ```sh
    npm install
    ```

3. In case you dont have it create a `.env` file in the `BE` directory and add your environment variables:
    ```sh
    API_BASE_URL=https://date.nager.at/api/v3
    API_KEY=your_api_key_here
    ```

### Frontend

1. Navigate to the frontend directory:
    ```sh
    cd FE/country-info-app
    ```

2. Install the dependencies:
    ```sh
    npm install
    ```

3. In case you dont have it create a `.env` file in the `FE/country-info-app` directory and add your environment variables:
    ```sh
    NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
    ```

## Running the Application

### Backend

1. Navigate to the backend directory:
    ```sh
    cd BE
    ```

2. Start the backend server:
    ```sh
    node index.js
    ```

   The backend server will start on port 8000.

### Frontend

1. Navigate to the frontend directory:
    ```sh
    cd FE/country-info-app
    ```

2. Start the frontend development server:
    ```sh
    npm run dev
    ```

   The frontend development server will start on port 3000.

## Accessing the Application

- Open your browser and navigate to [http://localhost:3000](http://localhost:3000) to access the frontend application.
