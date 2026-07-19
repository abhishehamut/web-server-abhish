import { Router } from 'express';
import { readFile, writeFile } from 'fs/promises';

const router = Router();
const FILE = 'entries.json';

async function getEntries() {
  const data = await readFile(FILE, 'utf-8');
  return JSON.parse(data);
}

async function saveEntries(entries) {
  await writeFile(FILE, JSON.stringify(entries, null, 2));
}

router.get('/status', (req, res) => {
  res.status(200).json({
    status: 'ok',
    uptime: process.uptime()
  });
});

router.get('/entries', async (req, res) => {
  const entries = await getEntries();
  res.set('X-Total-Count', entries.length);
  res.status(200).json(entries);
});

router.post('/entries', async (req, res) => {
  const { title, body } = req.body;
  if (!title || !body) {
    return res.status(400).json({
      error: 'Title and body are required'
    });
  }
  const entries = await getEntries();
  const newEntry = {
    title,
    body
  };
  entries.push(newEntry);
  await saveEntries(entries);
  res.status(201).json(newEntry);
});

router.delete('/entries/:id', async (req, res) => {
  const id = Number(req.params.id);
  const entries = await getEntries();
  if (id < 0 || id >= entries.length) {
    return res.status(404).json({
      error: 'Entry not found'
    });
  }
  const deletedEntry = entries.splice(id, 1);
  await saveEntries(entries);
  res.status(200).json({
    message: 'Entry deleted',
    entry: deletedEntry[0]
  });
});

router.get('/three-posts', async (req, res) => {
  const ids = [1, 2, 3];
  const titles = [];
  for (const id of ids) {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
    const post = await response.json();
    titles.push(post.title);
  }
  res.status(200).json({ titles });
});

export default router;