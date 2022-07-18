import { Router } from "express";
import { prisma } from "../../server-utilities";

const router = Router();

// POST: add bill
router.route("/bills/add").post(async (req, res) => {
  const { balance, dayDue, interestRate, limit, payment, title, userId } =
    req.body;
  const bill = await prisma.bill.create({
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
});

// GET: bill
router.route("/bills/:userId").get(async (req, res) => {
  const userId = req.params.userId;
  const bills = await prisma.bill.findMany({
    where: { userId },
    orderBy: { title: "desc" },
  });
  res.json(bills);
});

export default router;
