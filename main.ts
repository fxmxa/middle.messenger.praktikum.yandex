import './src/styles/main.scss';
import AuthController from '@/controllers/Auth.controller.ts';
import router from './src/router/index.ts';

await AuthController.fetchUser();
router.start();
