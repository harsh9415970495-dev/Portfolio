# Harsh Mishra - Developer Portfolio

Welcome to your premium developer portfolio! This project is built using React, Vite, Tailwind CSS, and Framer Motion. 

It is specifically designed so that you can easily update your information, add new projects, and deploy it to the web so the world can see it.

## 🛠️ How to Update Your Content

You **do not** need to edit the complex React UI code to update your portfolio. All your information is stored in the `src/data/` folder as simple JavaScript objects.

Here is where you can update everything:

1. **Projects:** `src/data/projects.js`
   - Just add a new object to the list when you build a new project! 
2. **Experience:** `src/data/experience.js`
   - Add new internships, hackathons, or jobs here.
3. **Skills & Tech Stack:** `src/data/skills.js`
   - Update your learned technologies and languages here.
4. **Achievements:** `src/data/achievements.js`
   - Added a new CodeChef rating? Just edit the text here.

**Profile Photo:** 
To update your profile picture, simply add an image named `profile.jpg` inside the `public/` folder.

**Resume:** 
Drop your latest resume PDF into the `public/` folder and name it `resume.pdf`.

## 🚀 How to Deploy (Make it live on the internet)

This project is fully production-ready. You can host it for **free** on platforms like Netlify or Vercel.

### Method 1: Using Netlify (Recommended)
1. Create a GitHub account (if you haven't) and push this folder to a new GitHub repository.
2. Go to [Netlify.com](https://www.netlify.com/) and log in with GitHub.
3. Click **"Add new site" -> "Import an existing project"**.
4. Select your GitHub repository.
5. Netlify will auto-detect the Vite setup. Just make sure:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
6. Click **Deploy**. Within 1 minute, your portfolio will have a live public link!

### Method 2: Using Vercel
1. Go to [Vercel.com](https://vercel.com/) and log in with GitHub.
2. Click **Add New Project**.
3. Import your GitHub repository.
4. Vercel automatically knows it's a Vite project. Click **Deploy**.

## 💻 Local Development
If you want to view the site on your computer while making changes:
```bash
npm install
npm run dev
```

## 🏗️ Production Build
To test the production build locally:
```bash
npm run build
npm run preview
```
