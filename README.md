# Assemble Hub

### Description
**Assemble Hub** is a modern, intuitive Kanban board designed to help agile teams efficiently manage and organize tasks. Using Assemble Hub, team members can securely log in, view project tickets, and track tasks from "Todo" to "Done" with a sleek and visually engaging interface. This application utilizes JSON Web Tokens (JWT) for secure authentication, ensuring that user data and task updates are protected. 

### Motivation
In agile teams, managing workflows, tracking progress, and collaborating efficiently are essential for project success. Assemble Hub was built to provide a secure, user-friendly platform that enhances team productivity by making task management easy and effective. This project leverages modern technologies to create a visually engaging and secure Kanban experience, setting it apart from other task management tools.

### Problem It Solves
Assemble Hub addresses the need for secure, accessible, and user-friendly task management. Traditional Kanban boards often lack secure authentication, leaving team data vulnerable. Assemble Hub solves this by using JWTs for secure access, ensuring that only authenticated users can access the board. Additionally, the application provides a streamlined UI with sorting and filtering options to organize tasks effectively.

### Key Features
- **Secure Authentication**: JSON Web Tokens (JWTs) for login and user session management.
- **Sorting and Filtering**: Easily sort and filter tasks by name, status, and creation date for better visibility.
- **Status-Based Swimlanes**: Visualize tasks at different stages ("Todo", "In Progress", "Done") with customizable swimlanes.
- **User-Friendly Design**: A responsive and intuitive UI with a professional look and feel, making project management enjoyable.

### Technologies Used
- **Frontend**: React, TypeScript, CSS, HTML
- **Backend**: Node.js, Express, PostgreSQL, Sequelize
- **Authentication**: JSON Web Tokens (JWT)
- **Deployment**: Vercel (Frontend) and Render (Backend)

### What I Learned
Building Assemble Hub offered extensive insights into:
1. **Implementing Secure Authentication**: Setting up secure login using JWTs and managing user sessions effectively.
2. **State Management**: Utilizing React hooks like `useState` and `useEffect` to manage data flow and user interactions.
3. **Database Management with Sequelize**: Managing relational data in PostgreSQL using Sequelize, from model associations to seeding initial data.
4. **UI/UX Design Principles**: Creating a user-friendly, visually appealing interface that enhances the Kanban experience.

### Challenges Faced
One major challenge was ensuring that authentication was seamless, secure, and unobtrusive. Implementing JWTs securely required an understanding of token expiration and efficient session management. Another challenge was creating a highly customizable UI that maintains performance and usability while providing powerful filtering and sorting features.

### Future Enhancements
- **User Roles and Permissions**: Introduce different access levels (e.g., admin, viewer) to better manage permissions on the board.
- **Real-Time Updates**: Implement WebSocket or similar technology for real-time task updates and collaboration.
- **Enhanced Analytics**: Add reporting tools to analyze task completion rates and bottlenecks.
- **Mobile Optimization**: Further optimize the application for a better mobile experience.

### See It in Action
Check out the live application here: [Assemble Hub](#)


