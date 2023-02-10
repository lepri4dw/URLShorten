import express from "express";
import Link from "../models/Link";

const linksRouter = express.Router();

const getRandomWord =() => {
  const letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let word = '';

  for (let i = 0; i < 8; i++) {
    word += letters[Math.floor(Math.random() * letters.length)];
  }

  return word;
}

linksRouter.get('/:shortUrl', async (req, res) => {
  try {
    const result = await Link.findOne({shortUrl: req.params.shortUrl});

    if (!result) {
      return res.sendStatus(404);
    }

    return res.status(301).redirect(result.originalUrl);
  } catch {
    return res.sendStatus(500);
  }
});

linksRouter.post('/links', async (req, res) => {
  try {
    let word = getRandomWord();
    let wordFromDb = await Link.findOne({shortUrl: word});

    while (wordFromDb) {
      word = getRandomWord();
      wordFromDb = await Link.findOne({shortUrl: word});
    }

    const linkData = {
      shortUrl: word,
      originalUrl: req.body.originalUrl
    };

    const link = new Link(linkData);
    try {
      await link.save();
      return res.send(link);
    } catch (error) {
      return res.sendStatus(400).send(error);
    }
  } catch {
    return res.sendStatus(500);
  }
});

export default linksRouter;