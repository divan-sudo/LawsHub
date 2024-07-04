import { Router } from "express";
import {
  getRegulations,
  createRegulation,
} from "./controllers/regulationController";
import { createLaw } from "./controllers/lawController";
import { createArticle } from "./controllers/articleController";
import { uploadImage, createImage } from "./controllers/imageController";

const router = Router();

router.get("/", (req, res) => {
  res.json({
    message: "Welcome to the API!",
    endpoints: [
      {
        method: "GET",
        path: "/api/regulations",
        description: "Fetch all regulations",
      },
      {
        method: "POST",
        path: "/api/regulations",
        description: "Create a new regulation",
      },
      {
        method: "POST",
        path: "/api/laws",
        description: "Create a new law under a regulation",
      },
      {
        method: "POST",
        path: "/api/articles",
        description: "Create a new article under a law",
      },
      {
        method: "POST",
        path: "/api/images/upload",
        description: "Upload images associated with articles",
      },
    ],
  });
});

router.get("/regulations", getRegulations);
router.post("/regulations", createRegulation);
router.post("/laws", createLaw);
router.post("/articles", createArticle);
router.post("/images/upload", uploadImage, createImage);

export default router;
