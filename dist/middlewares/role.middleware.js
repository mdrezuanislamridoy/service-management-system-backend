const checkRole = (...roels) => async (req, res, next) => {
    const { role } = req.user;
    if (!roels.includes(role)) {
        return res.status(403).json({ message: "Forbidden" });
    }
    next();
};
export default checkRole;
//# sourceMappingURL=role.middleware.js.map