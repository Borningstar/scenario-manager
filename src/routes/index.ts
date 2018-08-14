import express from 'express';

const router = express.Router();

/* GET home page. */
router.get('/', function(req: any, res: any, next: any) {
  res.send('Hello world');
});

export const indexRouter = router;
