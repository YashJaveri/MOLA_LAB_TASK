import { Router } from 'express';
import { QuestionRoutes } from './question-routes.js';

export const Routes = Router()

Routes.use('/questions', QuestionRoutes)