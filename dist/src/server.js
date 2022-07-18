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
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const morgan_1 = __importDefault(require("morgan"));
const client_1 = require("@prisma/client");
const user_1 = require("./apis/user");
// import bcrypt from "bcryptjs";
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT;
app.use(express_1.default.json());
app.use((0, morgan_1.default)("tiny"));
const prisma = new client_1.PrismaClient();
app.post("/bills/add", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { balance, dayDue, interestRate, limit, payment, title, userId } = req.body;
    const bill = yield prisma.bill.create({
        data: {
            balance,
            dayDue,
            interestRate,
            limit,
            payment,
            title,
            user: {
                connect: {
                    id: userId,
                },
            },
        },
    });
    res.json(bill);
}));
app.post("/signup", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { password, email } = req.body;
    try {
        const user = yield (0, user_1.signup)(email, password);
        res.json({
            status: 200,
            message: `User with email, ${email}, created successfully!`,
        });
    }
    catch (error) {
        res.json({
            status: 500,
            error,
            message: `error creating user with ${{ password, email }}`,
        });
    }
}));
app.get("/bills/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    const bills = yield prisma.bill.findMany({
        where: { userId },
        orderBy: { title: "desc" },
    });
    res.json(bills);
}));
app.get("/users", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const userId = req.params.id;
    const users = yield prisma.user.findMany();
    res.json(users);
}));
app.get("/", (req, res) => {
    res.send("Express + TypeScript Server");
});
app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});
