# GYAZA DOCUMENTATION
### By: GerBear, CareBear, and SofaBear

Welcome to Gyaza! Gyaza in Japanese means "to gather" and that is exactly what this application is for! Gyaza is a place for people working on projects to gather together to better communicate, set goals, and create projects. It is a project management tool that enhances team collaboration and helps creative teams to organize their work and tasks.

## Here is the URL: https://git.heroku.com/stormy-escarpment-83440.git

Once you log in, you can create a project with contributors who can also access the same project page. When you click on a project, it will take you to your project page where you can have a chatroom discussion with your teammates. This project page also has a Goals list where you or a team member can add and/or delete goals for your group project. 

At the top of each project portal page, you will see tabs that can take you to your current projects, completed projects, or pending projects. Your pending projects are projects that a user has invited you to that are awaiting your approval. Once you accept the invitation to a project, it will be sent to your current projects page. After your team has completed a project, you can mark it as completed and it will be moved to the completed tab for future reference if needed.

In the Goals table, you will be able to up-vote or down-vote a goal and each member of your team will be able to mark it as completed before it can be crossed off your list. That way, every member of your team will have agree and be on the same page before you can move on with your project. 

## localhost:3000/ --> will get you to the main log-in page
## localhost:3000/portal --> will get you to your project portal
## localhost:3000/portal/:userId ---> will get your to your user portal
## localhost:3000/project --> will get you to your projects page
## localhost:3000/project/:projectId --> will get you to your project page

# PUBLIC ENDPOINTS

CRUD Methods |    Route                   | RESTful Description   |         Purpose
------------ | -------------------------- | --------------------- | ------------------------
GET          | /newUser                   | User Read             | Lists all User
GET          | /newUser/:id               | User Read one         | Lists selected User
POST         | /newUser                   | User Create new       | Creates new User
PUT          | /newUser/:id               | User update           | Updates existing User
DELETE       | /newUser/:id               | User Delete           | Deletes selected User
GET          | /newProject                | project Read          | Listing all projects
GET          | /newProject/:id            | project Read one      | Gets/shows one project
POST         | /newProject                | projet Create new     | Creates new project
PUT          | /newProject/:id            | project Update        | Updates existing project
DELETE       | /newProject/:id            | project Delete        | Deletes selected project
GET          | /newGoal                   | goal Read             | Lists all goals
GET          | /newGoal/:id               | goal Read one         | Lists selected goal
POST         | /newGoal                   | goal Create new       | Creates new goal
PUT          | /newGoal/:id               | goal update           | Updates existing goals
DELETE       | /newGoal/:id               | goal Delete           | Deletes selected recipe
GET          | /newChat                   | chat Read             | Lists all chats
GET          | /newChat/:id               | chat Read one         | Lists selected chat
POST         | /newChat                   | chat Create new       | Creates new chat
PUT          | /newChat/:id               | chat update           | Updates existing chat
DELETE       | /newChat/:id               | chat Delete           | Deletes selected chat
