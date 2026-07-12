import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.send('Home page');
});

router.get('/about', (req, res) => {
  res.send('About page');
});

router.get('/entries', (req, res) => {
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

  res.render('entries', { entries });
});

export default router;