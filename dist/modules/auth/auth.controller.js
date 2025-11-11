import { authService } from "./auth.service.js";
import generateToken from "../../utils/generateToken.js";
export const createUserAccount = async (req, res, next) => {
    try {
        const result = await authService.createUser(req);
        res.status(201).json(result);
    }
    catch (error) {
        next(error);
    }
};
export const loginUserAccount = async (req, res, next) => {
    try {
        const result = await authService.login(req);
        res
            .status(201)
            .cookie("access_token", result.accessToken, {
            httpOnly: true,
        })
            .cookie("refresh_token", result.refreshToken, {
            httpOnly: true,
        })
            .json(result);
    }
    catch (error) {
        next(error);
    }
};
export const getUserProfile = async (req, res, next) => {
    try {
        const result = await authService.getProfile(req);
        res.status(201).json(result);
    }
    catch (error) {
        next(error);
    }
};
export const logout = async (req, res, next) => {
    try {
        res
            .clearCookie("access_token")
            .clearCookie("refresh_token")
            .status(200)
            .json({ message: "Logout successfully" });
    }
    catch (error) {
        next(error);
    }
};
//# sourceMappingURL=auth.controller.js.map