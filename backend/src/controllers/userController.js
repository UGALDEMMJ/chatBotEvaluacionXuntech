import { getUser } from "../services/userService.js";

export async function fetchUserController(req, res) {
    try {
        const userId = req.params.id;
        const user = await getUser({ userId });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message, stack: error.stack, location: "fetchUser" });
    }
}