import { Router } from 'express';
import multer from 'multer';
import { celebrate, Segments, Joi } from 'celebrate';

import uploadConfig from '@config/upload';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

import UsersController from '../controllers/UsersController';
import UserAvatartController from '../controllers/UserAvatartController';

const usersRouter = Router();
const upload = multer(uploadConfig.multer);
const usersController = new UsersController();
const userAvatartController = new UserAvatartController();

usersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  usersController.create,
);

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  userAvatartController.update,
);

export default usersRouter;
