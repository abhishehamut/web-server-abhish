import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.render('home');
});

router.get('/about', (req, res) => {
  res.render('about');
});

const entries = [
  {
    title: 'First note',
    body: 'This is the first note.'
  },
  {
    title: 'Second note',
    body: 'This is the second note.'
  },
  {
    title: 'Third note',
    body: 'This is the third note.'
  }
];

router.post('/entries', (req, res) => {
  const { title, body } = req.body;
  const newEntry = {
    title,
    body
  };

  entries.push(newEntry);
  res.status(201).json(newEntry);
});

router.get('/entries', (req, res) => {
  res.render('entries', { entries });
});

export default router;