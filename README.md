# Prawko Teoria
A web app to help prepare for the driving license theory exam.  

- **Backend:** Supabase + Google Cloud (media storage)  
- **Frontend:** React (Vite) + Astro (landing page)  
- Includes practice quizzes and lessons
- Upcoming features: **AI assistance**, mock tests *(coming soon)*

**MORE COMING SOON**

## Stack
- **Backend** - Supabase
- **Frontend** - React Vite *(app)* + Astro *(index page)*
- **Media** - Google Storage
## Runing the app
First, build the docker image
```
docker build -t my-react-app .
```
Then run the container
```
docker run -p 3000:80 my-react-app
```
App will be available at http://localhost:3000
