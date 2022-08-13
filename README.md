# Interview Scheduler

Interview Scheduler is a single-page application (SPA) that allows users to book technical interviews between students and mentors. Appointments can be between the hours of 12 PM and 5 PM, Monday to Friday. Each appointment has one student and one interviewer. When creating a new appointment, the user can enter any student name while the interviewer is chosen from a predefined list. The user can save the appointment and view the entire schedule of appointments on any day of the week. Appointments can also be edited or deleted. 

The front end of this project is built with React and makes requests to an API to fetch and store appointment data from a database.

## Setup

Install dependencies with `npm install`

Install and run [Scheduler-API](https://github.com/lighthouse-labs/scheduler-api)

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```


## Product Overview:

### App Overview

![app overview](https://user-images.githubusercontent.com/100328767/184515539-3b99ac9b-95fd-4be7-ae4b-debbe757c64f.gif)

### Creating a New Appointment

![create new appointment](https://user-images.githubusercontent.com/100328767/184515555-f29baefd-c81b-4e66-8ce5-f07c93e904ca.gif)

### Form Validation with Error Message

![form validation](https://user-images.githubusercontent.com/100328767/184515574-7d613d7d-515c-47bc-b6fc-99e5d50ad24e.gif)

### Edit an Appointment

![edit appointment](https://user-images.githubusercontent.com/100328767/184515580-bdf854da-6509-4342-b3f8-cc05f8bdd15d.gif)

### Delete an Appointment

![delete appointment](https://user-images.githubusercontent.com/100328767/184515583-648a1367-0294-499f-bc0d-38ffc7d875a7.gif)


## Functional Requirements:

- Development focuses on a single page application (SPA) called Interview Scheduler, built using React.
- Data is persisted by the API server using a PostgreSQL database.
- The client application communicates with an API server over HTTP, using the JSON format.
- Jest tests are used through the development of the project.

## User Requirements:

- Interviews can be booked between Monday and Friday.
- A user can switch between weekdays.
- A user can book an interview in an empty appointment slot.
- Interviews are booked by typing in a student name and clicking on an interviewer from a list of available interviewers.
- A user can cancel an existing interview.
- A user can edit the details of an existing interview.
- The list of days informs the user how many slots are available for each day.
- The expected day updates the number of spots available when an interview is booked or canceled.
- A user is presented with a confirmation when they attempt to cancel an interview.
- A user is shown an error if an interview cannot be saved or deleted.
- A user is shown a status indicator while asynchronous operations are in progress.
- When the user presses the close button of the error they are returned to the Form or Show view (skipping Status and Confirm).
- The application makes API requests to load and persist data. We do not lose data after a browser refresh.

## Dependencies:

- react
- webpack
- babel
- storybook
- axios
- webpack dev server
- testing library: react, jest
