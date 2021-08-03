# Stack Underflow - StackOverflow Clone

Fullstack [Stack Overflow](https://stackoverflow.com/) clone (Q&A site) made using the MERN + GraphQL stack

## Demo

https://stackunderflow.netlify.app

Deployed on Netlify (front-end) & Heroku (back-end)

## Built using

#### Frontend

- [React](https://reactjs.org/) - Frontend framework
- [Apollo Client](https://www.apollographql.com/docs/react/) - State management library to manage both local and remote data with GraphQL
- [Context API w/ hooks](https://reactjs.org/docs/context.html) - For state of user, toast notifs, theme etc.
- [React Router](https://reactrouter.com/) - For general routing & navigation
- [React Hook Form](https://react-hook-form.com/) - For flexible forms
- [Material-UI w/ lots of CSS customisations](https://material-ui.com/) - UI library
- [Yup](https://github.com/jquense/yup) - For form validation
- [date-fns](https://date-fns.org/) - For manipulating & formatting of dates

#### Backend

- [Node.js](https://nodejs.org/en/) - Runtime environment for JS
- [Apollo Server](https://www.apollographql.com/docs/apollo-server/) - To build a self-documenting GraphQL API server
- [MongoDB](https://www.mongodb.com/) - Database to store document-based data
- [Mongoose](https://mongoosejs.com/) - MongoDB object modeling for Node.js
- [JSON Web Token](https://jwt.io/) - A standard to secure/authenticate HTTP requests
- [Bcrypt.js](https://www.npmjs.com/package/bcryptjs) - For hashing passwords
- [Mongoose Unique Validator](https://www.npmjs.com/package/mongoose-unique-validator) - Plugin for better error handling of unique fields within Mongoose schema
- [Dotenv](https://www.npmjs.com/package/dotenv) - To load environment variables from a .env file

## Features

- Authentication (login/register with username-password)
- CRUD questions, answers & comments
- Upvote/downvote questions & answers
- Tags for organising questions
- Page views - A view is registered whenever the question page is opened
- Pages for added tags, registered users & more
- Sorting of questions on the basis of hot, votes, views, newest & oldest
- Search questions over the server on the basis of question title & body
- Pagination of posts with a "Load More" button
- Error management to prevent app crashes
- Toast notifications for actions: adding questions, deleting comments etc.
- Loading spinners for relevant fetching processes
- Formatted dates for adding/updating questions/answers/comments
- Dark mode toggle w/ local storage save
- Proper responsive UI for all screen sizes

## Screenshots

#### Desktop/Tablet

![Desktop-1](/screenshots/desktop-1.jpg)
![Desktop-2](/screenshots/desktop-2.jpg)
![Desktop-3](/screenshots/desktop-3.jpg)
![Desktop-4](/screenshots/desktop-4.jpg)
![Desktop-5](/screenshots/desktop-5.jpg)

#### Mobile

![Mobile-1](/screenshots/mobile-1.jpg)
![Mobile-2](/screenshots/mobile-2.jpg)
![Mobile-3](/screenshots/mobile-3.jpg)
![Mobile-4](/screenshots/mobile-4.jpg)
![Mobile-5](/screenshots/mobile-5.jpg)

## Usage

#### Env variable:

Create a `.env` file in your server directory and add the following:

```
MONGODB_URI = "Your Mongo URI"
PORT = 4000
SECRET = "Your JWT secret"

```

#### Client:

Open client/src/backendUrl.js & change "backend" variable to `"http://localhost:4000"`

```
cd client
npm install
npm start
```

#### Server:

Note: Make sure that you have installed `nodemon` as global package.

```
cd server
npm install
npm run dev
```
