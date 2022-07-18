"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const server_utilities_1 = require("../../server-utilities");
const router = (0, express_1.Router)();
// POST: signup
router.route("/signup").post((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { password, email } = req.body;
    try {
        // const user = await signup(email, password);
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        const user = yield server_utilities_1.prisma.user.create({
            data: {
                email,
                password: {
                    create: {
                        hash: hashedPassword,
                    },
                },
            },
        });
        res.json({
            status: 200,
            message: `User with email, ${user.email}, created successfully!`,
        });
    }
    catch (error) {
        res.json({
            status: 500,
            error,
            message: `error creating user with ${{ password, email }}`,
        });
        next(); // TODO: test if this is needed when error
    }
}));
// GET: users
router.route("/users").get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const userId = req.params.id;
    try {
        const users = yield server_utilities_1.prisma.user.findMany();
        res.json(users);
    }
    catch (error) {
        res.json({
            status: 500,
            error,
            message: "error getting users",
        });
    }
}));
exports.default = router;
