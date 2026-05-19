import { Router } from "express";

const router = Router();

router.get("/", (_req, res) => {
    res.send("Server is running");
});

export default router;