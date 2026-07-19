import { Router } from 'express';
import { readFile } from 'fs/promises';

const router = Router();

router.get('/', (req, res) => {
  res.render('home');
});

router.get('/about', (req, res) => {
  res.render('about');
});

router.get('/entries', async (req, res) => {
  const data = await readFile('entries.json', 'utf-8');
  const entries = JSON.parse(data);

  res.set('Cache-Control', 'public, max-age=60');
  res.set('X-Total-Count', entries.length);
  res.status(200).render('entries', {
    title: 'My Notes',
    entries
  });
});

export default router;