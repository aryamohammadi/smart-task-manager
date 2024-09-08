# Smart Task Manager

The Smart Task Manager is a comprehensive task management application that allows users to securely create, manage, and track tasks. It uses modern web technologies to provide efficient, scalable, and secure task management. This project demonstrates both fundamental and advanced web development practices, including secure user authentication, RESTful API design, and a solid backend infrastructure. Future plans include the addition of machine learning features for enhanced task prioritization and intuitive UI animations.

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Error Handling](#error-handling)
- [Security](#security)
- [Testing](#testing)
- [Future Enhancements](#future-enhancements)
- [Bugs & Issues](#bugs--issues)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)

## Overview

Smart Task Manager is built to provide users with an intuitive experience in managing daily tasks. The application was designed with scalability in mind, utilizing technologies like **Node.js**, **Express.js**, and **MongoDB** for efficient backend management. The project focuses on secure handling of user data, leveraging **JWT** for user authentication, and follows best practices for modern web development.

This project is also a demonstration of my technical skills as a backend engineer, preparing me for potential internship opportunities by showcasing REST API development, database management, and user authentication.

## Features

- **User Authentication:** Secure registration and login system with JWT for session management.
- **Task Management:** CRUD (Create, Read, Update, Delete) operations for user tasks.
- **RESTful API:** Well-structured API for frontend-backend communication.
- **MongoDB Integration:** Tasks and users are stored in a MongoDB database with efficient data retrieval and manipulation.
- **Data Validation:** Data validation on the server using express-validator for inputs such as email, password, and task fields.
- **Password Encryption:** User passwords are securely hashed using bcrypt before storing them in the database.
- **Task Filtering and Status Tracking:** Tasks are categorized by status, allowing users to easily track progress.

## Technologies Used

- **Backend:** Node.js, Express.js
- **Database:** MongoDB, Mongoose
- **Authentication:** JWT (JSON Web Token), bcryptjs
- **Validation:** express-validator
- **Error Handling:** Custom middleware for handling errors and exceptions
- **Environment Variables:** dotenv for managing sensitive data

## Installation
