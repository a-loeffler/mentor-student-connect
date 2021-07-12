# Mentor Student Connect

*By Andrew Loeffler - <a href="https://mentor-student-connect.herokuapp.com">Visit Mentor Student Connect</a>*


**Table of Contents**

* Mentor Student Connect Purpose and Overview
* Design and Build Framework
* Frontend Overview
* Backend Overview
* Conclusion & Next Steps

## Mentor Student Connect Purpose and Overview

The purpose of Mentor Student Connect is to provide a framework for students to build relationships with community mentor figures.  Mentor Student Connect is a fullstack React App that lets users create student or mentor accounts, search for other nearby users, create connections, message others, and learn about community events.

Student Users can visually explore a React Google Maps API map interface populated by mentors in their area.  From here, they can send connection requests to mentors with whom they are interested in building relationships.

## Design and Build Framework

Mentor Student Connect utilizes a React framework for its frontend operations.  The majority of the frontend logic and operations occur within the frontend's Redux store and its interactions with the React Google Maps API.

On the backend, a PostgreSQL database and Sequelize ORM responds to user requests and serves data to appropriate places in the app.

## Frontend Overview

Mentor Student Connect was designed with multiple user roles in mind: students, mentors, and community organizations.  As such, different users will be able to access different resources and UI interfaces.  Below are the frontend technologies used to make this application possible.

### Frontend Technologies Used

#### React

Mentor Student Connect is fundamentally a React application.  It makes use of separate but interconnected functional components and hooks in order to provide a satisfying user experience.

#### Redux

Mentor Student Connect integrates the Redux and react-redux library to manage an application state store, serve user data across components, and make fetch requests to the server for user interactions.

When a user logs in, their secure account information is fetched and loaded into the Redux store.  Additionally, connection and message data associated with each user is also loaded into the store to assist in notifying the user of updates in their mentor-student relationships.

Upon student user logins, secure account information for all mentors is loaded into the Redux store.  While this expensive operation lengthens the initial load time, it allows the data to be quickly accessed by the React Google Maps API interface.

#### React Google Maps API

The React Google Maps API is an important feature of this project.  It allows student users to search out local mentors and begin building connections with them.

The API allows mentor data to be read and translated into latitude/longitude coordinates, and displayed on the map interface through pinpoint Markers.  Additionally, users can view basic information about local mentors by clicking on a Marker to pull up its customized Infobox.


## Backend Overview

Mentor Student Connect utilizes an Expresses server with a PostgreSQL database and Sequelize ORM.  The backend of Mentor Student Connect passes data to the client and receives request information for the database in order to carry out basic CRUD operations.

### Backend Technologies Used

#### Express

Express handles the light-weight responsibilities of Mentor Student Connect's server.  It utilizes routes to handle various user interactions, such as account CRUD operations, sending connection requests and messages to other users, and passing location information to the React Google Maps API.

#### PostgreSQL

PostgreSQL acts as a suitable framework for storing user account information and associating necessary items to build a robust data structure for app interactions.

#### Sequelize

Sequelize stands as an ORM intermediary that allows the Express server to send and retrieve data from the database.  The simple interactions and structured documentation for querying made Sequelize an excellent choice for this project.

## Conclusion & Next Steps

Mentor Student Connect is a passion project, based on a concept that has been growing for several years.  It allows me to combine my desire to help others with my love of coding.

While making Mentor Student Connect, I was able to explore some new concepts and technologies.  Learning about the React Google Maps API was very interesting, and turned out to be a lot simpler than I had originally imagined.  I also learned more about how the React and Redux architecture work, and will be able to take many of those lessons with me as I go forward to other projects.

**Next Steps:** There is still a lot of development left to go for Mentor Student Connect.  As I move forward, I would like to begin by refactoring the messaging component to work more smoothly.  Additionally, I plan to implement account creation for organizations, as well as CRUD features for creating local events.
