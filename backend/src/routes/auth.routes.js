import express from "express";
import { signup,login,logout,updateProfile,checkAuth,googleCallback} from "../controllers/auth.controller.js";
import {protectRoute} from "../middleware/auth.middleware.js"
import passport from "../lib/passport.js";

const router = express.Router();


router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

// Google OAuth routes
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));
router.get("/google/callback", passport.authenticate("google", { session: false, failureRedirect: "/login" }), googleCallback);

router.put("/update-profile",protectRoute,updateProfile);

router.get("/check",protectRoute,checkAuth)


export default router;