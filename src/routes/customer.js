const express = require ("express");
const router = express.Router();   //With this method we are adding routes to the same function

const customerController = require("../controllers/customerController");

router.get("/", customerController.list)
//Router listen the post method the route called add, we are creating a save funcion that liste to the received data
router.post("/add", customerController.save);
router.get("/delete/:id", customerController.delete); //     :id means that it takes the selected value of id
router.get("/update/:id", customerController.edit);
router.post("/update/:id", customerController.update);

module.exports = router;  //We are exporting the routes  