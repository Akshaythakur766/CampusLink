
# Campus Link

Campus Link is a web application designed to streamline online attendance tracking and library management within educational institutions. The platform provides a user-friendly interface for students, teachers, librarians, and staff to manage and monitor attendance records efficiently, alongside handling library-related activities. Key features include secure OTP verification for attendance, role-based registration, and robust database management.

# Table of Content


## Installation

Prerequisites

1)node
2)MongoDB Compass (for database management)

## Step-by-Step Guide

#### 1)Clone the repository:

```bash
  git clone <repository-url>

```
#### 2)Navigate to the project directory:

For the client:
```bash
  cd Client
```
For the server:

```bash
  cd Server
```
#### 3)Install dependencies:

```bash
  npm install

```
#### 4) Start the development server:

In the Client directory:
```bash
  npm run dev

```
In the Server directory:
```bash
  nodemon server.js

```

## Usage

### Register and Login

#### Student Module
Students can register by providing their roll number along with other required details.

#### Teacher Module
Teachers will register using a verification code provided by the Staff.

#### Librarian Module
Librarians will register using a verification code provided by the Staff.

#### Staff Module
ID: staff@gmail.com

Password: staff@123




## Features

OTP Verification: Ensures secure attendance marking for students.

Role-Based Access: Different modules for Students, Teachers, Librarians, and Staff.

Attendance Tracking: Monitors and tracks attendance records with time-limited access.

Library Management: Streamlines the process of requesting and issuing library books.




## Technology Used

#### Frontend: React.js

#### Backend: Node.js, Express.js
#### Database: MongoDB

## Author

Your Name - Akshaythakur766

