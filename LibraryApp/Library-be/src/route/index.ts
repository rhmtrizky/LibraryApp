import * as express from 'express';
import AuthController from '../controllers/AuthController';
import Authenticate from '../middlewares/AuthMiddlewares';
import MemberController from '../controllers/MemberController';
import BookController from '../controllers/BookController';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Welcome in Our Library');
});

//Auth
router.post('/auth/register', AuthController.register);
router.post('/auth/login', AuthController.login);
router.get('/auth/check', Authenticate, AuthController.check);
router.get('/logout', AuthController.logout);

//Member
router.get('/member', Authenticate, MemberController.findOne);
router.get('/members', MemberController.find);
// router.post('/member/create', Authenticate, MemberController.create);

//Book
router.get('/books', BookController.find);
router.post('/borrow/book/:id', Authenticate, BookController.borrowBook);
router.post('/return/book/:id', Authenticate, BookController.returnBook);

//Borrow

export default router;
