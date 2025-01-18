require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public'))); // Static fayllar uchun

const PORT = process.env.PORT || 3000;

// Ma'lumotlar
const gamesCard = [
  {
    src: './img/home/card-1.png',
    title: '40 Followers',
  },
  {
    src: './img/home/card-2.png',
    title: '40 Followers',
  },
  {
    src: './img/home/card-3.png',
    title: '40 Followers',
  },
  {
    src: './img/home/card-4.png',
    title: '40 Followers',
  },
];

const categoryCard = [
  {
    src: './icons/home/1.svg',
    title: 'Mobile Game Development',
  },
  {
    src: './icons/home/2.svg',
    title: 'PC Game Development',
  },
  {
    src: './icons/home/3.svg',
    title: 'PS4 Game Development',
  },
  {
    src: './icons/home/4.svg',
    title: 'AR/VR Solutions',
  },
  {
    src: './icons/home/5.svg',
    title: 'AR/ VR design',
  },
  {
    src: './icons/home/6.svg',
    title: '3D Modelings',
  },
];

const projectsCard = [
  {
    src: './img/home/project-1.png',
    alt: 'Project 1',
  },
  {
    src: './img/home/project-2.png',
    alt: 'Project 2',
  },
  {
    src: './img/home/project-3.png',
    alt: 'Project 3',
  },
  {
    src: './img/home/project-4.png',
    alt: 'Project 4',
  },
  {
    src: './img/home/project-5.png',
    alt: 'Project 5',
  },
  {
    src: './img/home/project-6.png',
    alt: 'Project 6',
  },
];

// API endpointlar
app.get('/api/gamesCard', (req, res) => {
  res.json(gamesCard);
});

app.get('/api/category', (req, res) => {
  res.json(categoryCard);
});

app.get('/api/projects', (req, res) => {
  res.json(projectsCard);
});

// Default Route
app.get('/', (req, res) => {
  res.send('Backend ishlayapti!');
});

// Serverni ishga tushirish
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
