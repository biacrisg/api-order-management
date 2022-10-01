import { Router, Request, Response } from "express";
import multer from "multer";

import { CreateUserController, AuthUserController, GetuserServiceController  } from "./modules/users/userController";
import { authenticated } from "./middlewares/authenticate"
import { CreateCategoryController, ListCategoryController } from "./modules/categories/categoryController";
import { CreateProductController, ListProductController } from "./modules/products/productController";
import { CreateOrderController, CloseOrderController, SendOrderController, ListOrderController, GetOrderController, FinishOrderController } from "./modules/orders/orderController";
import { CreateItemController, DeleteItemController }from "./modules/items/itemController";

import uploadConfig from "./config/multer"

const router = Router();
const upload = multer(uploadConfig.upload("./temp"))

//User
router.post('/users',  new CreateUserController().handle)
router.post('/auth', new AuthUserController().handle)
router.get('/detail-user', authenticated, new GetuserServiceController().handle)

//Category
router.post('/create-category',authenticated, new CreateCategoryController().handle)
router.get('/list-category',authenticated, new ListCategoryController().handle)

//Product

router.post('/create-product',authenticated, upload.single('file'), new CreateProductController().handle)
router.get('/product-list', new ListProductController().handle)

//Order

router.post('/create-order',authenticated, new CreateOrderController().handle)
router.delete('/remove-order',authenticated, new CloseOrderController().handle)
router.put('/send-order',authenticated, new SendOrderController().handle)
router.get('/list-orders',authenticated, new ListOrderController().handle)
router.get('/get-order-detail', authenticated, new GetOrderController().handle)
router.put('/finish-order', authenticated, new FinishOrderController().handle)
//Item

router.post('/create-item',authenticated, new CreateItemController().handle)
router.delete('/delete-item',authenticated, new DeleteItemController().handle)

// router.get("/testeApí", (req: Request, res: Response) => {
//   return res.json({ ok: true });
// });

export { router };
