import { Router } from "express";
const router = Router();
import * as productController from '../controllers/products.controller';
import { authJwt } from "../middlewares";

router.post('/',[authJwt.verifyToken, authJwt.isModerator, authJwt.isAdmin], productController.createProduct);

router.get('/', productController.getProducts);

router.get('/:productId', productController.getProductById);

router.put('/:productId', [authJwt.verifyToken, authJwt.isAdmin], productController.updateProductById);

router.delete('/:productId', [authJwt.verifyToken, authJwt.isAdmin], productController.deletProductById);

export default router;