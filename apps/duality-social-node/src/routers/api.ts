import { FeedController } from '../controllers/api/feed';
import { UserController } from '../controllers/api/user';
import { BaseRouter } from './base';

/**
 * Router for the API
 */
export class ApiRouter extends BaseRouter {
  private static readonly userController: UserController = new UserController();
  private static readonly feedController: FeedController = new FeedController();
  constructor() {
    super();
    this.router.use('/user', ApiRouter.userController.router);
    this.router.use('/feed', ApiRouter.feedController.router);
  }
}
