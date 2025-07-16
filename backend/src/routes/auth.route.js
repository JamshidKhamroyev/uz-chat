import express from "express"
import { protectRoute } from "../midlewere/auth.midlewere.js"
import { login, logout, onboard, signup } from "../controllers/auth.controller.js"

const router = express.Router()

router.post("/signup", signup)
router.post("/login", login)
router.post("/logout", logout)

router.post("/onboarding", protectRoute, onboard)

// Check if user is logged in
router.get("/me", protectRoute, (req, res) => {
    res.json({ succes: true, user: req.user })
})

export default router