import jwt from "jsonwebtoken";

export const authenication = (request, response, next) => {
    const authHeader = request.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return response.status(401).json({ Message: "Token not found or invalid" });
    }

    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        request.user = decoded;
        next();
    } catch (error) {
        response.status(403).json({ Message: "Invalid Token" });
    }
};
