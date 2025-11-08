import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import 'express-async-errors';

import authRoutes from './api/routes/auth.routes.js';
import workspaceRoutes from './api/routes/workspace.routes.js';
import taskRoutes from './api/routes/task.routes.js';
import logRoutes from './api/routes/log.routes.js';
import userRoutes from './api/routes/user.routes.js';
import ApiError from './utils/apiError.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/workspaces', workspaceRoutes);
app.use('/api/v1/tasks', taskRoutes);
app.use('/api/v1/logs', logRoutes);
app.use('/api/v1/users', userRoutes);

app.use((req, _res, next) => {
  next(new ApiError(404, 'Ruta solicitată nu există.'));
});

app.use((err, _req, res, _next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'A apărut o eroare neașteptată.';
  res.status(statusCode).json({
    error: {
      message,
    },
  });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Serverul rulează pe portul ${PORT}`);
});
