# Prawko Teoria
Interactive learing web app for learning topics to polish driving license test!

Features:
- **Learning mode:**
    - **Queuing** next questions content and media provides smooth and lag free experience.
    - **Interactive dasboard** allows tracking your learning experience. *(TBD)*
    - **AI assistance** allowing the user to ask for a deeper explanation of certain traffic regulations, clarify doubts about specific rules, or receive examples of proper application in real-world driving scenarios. *(TBD)*
- **Test mode** is a copy of real life driving license test

**MORE TBA**
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
