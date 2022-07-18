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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const server_utilities_1 = require("../../server-utilities");
const router = (0, express_1.Router)();
// POST: add bill
router.route("/bills/add").post((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { balance, dayDue, interestRate, limit, payment, title, userId } = req.body;
    const bill = yield server_utilities_1.prisma.bill.create({
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
// GET: bill
router.route("/bills/:userId").get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.userId;
    const bills = yield server_utilities_1.prisma.bill.findMany({
        where: { userId },
        orderBy: { title: "desc" },
    });
    res.json(bills);
}));
exports.default = router;
