import express from 'express';
import cors from 'cors';
import path from 'path';
import { connectWithRetry, sequelize } from './db';
import './models';
import router from './routes';
import imageRoutes from './routes/imageRoutes';
import articleRoutes from './routes/articleRoutes';
import regulationRoutes from './routes/regulationRoutes';
import lawRoutes from './routes/lawRoutes';

const app = express();
const PORT = 8080;

app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(express.json());
app.use('/api', router);
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
app.use('/api/regulations', regulationRoutes);
app.use('/api/laws', lawRoutes);
app.use('/api/articles', articleRoutes);
app.use('/api/images', imageRoutes);

connectWithRetry().then(() => {
  sequelize.sync().then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  }).catch((err) => {
    console.error('Unable to sync the database:', err);
  });
}).catch((err) => {
  console.error('Unable to connect to the database:', err);
});
