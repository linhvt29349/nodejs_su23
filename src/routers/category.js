import { Router } from "express";
import { addCategory, deleteCategory, getCategorys, getOneCategory, updateCategory } from "../contronllers/categorys.js";
import { checkPermission } from "../middleware/premission.js";

const router = Router();
router.get('/', getCategorys)
router.get('/:id', getOneCategory)
router.post('/', checkPermission, addCategory)
router.put('/:id', checkPermission, updateCategory)
router.delete('/:id', checkPermission, deleteCategory)
export default router