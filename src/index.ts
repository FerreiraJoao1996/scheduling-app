import cors from 'cors';
import express from 'express';
import { env } from 'shared/env/env';
import { routes } from 'routes.ts';
import { errorHandler } from 'shared/error/errorHandler';

const app = express();

app.use(cors({}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);
app.use(errorHandler);

app.listen(env.PORT, () => {
  console.log(`🟢 Projeto rodando na porta ${env.PORT}.`);
});

