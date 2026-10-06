const express=require("express");
const router=express.Router();
const c=require("../controller/songsController");

router.get("/",c.getSongs);
router.get("/:id",c.getSong);
router.post("/",c.uploadSong);
router.put("/:id",c.updateSong);
router.delete("/:id",c.deleteSong);

module.exports = router;