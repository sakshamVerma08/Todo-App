import jwt from "jsonwebtoken";
import Blacklist from "../schemas/blacklist-schema.js";
export const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const token = authHeader.split(" ")[1];

    const blacklistedToken = await Blacklist.findOne({ token });

    if (blacklistedToken) {
      return res.status(401).json({ message: "You're not logged in !" });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    if (!decodedToken) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    req.user = decodedToken;
    next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({ message: "Invalid Token" });
  }
};
