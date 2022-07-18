import { Router } from "express";
import bcrypt from "bcryptjs";
import { prisma } from "../../server-utilities";

const router = Router();

// POST: signup
router.route("/signup").post(async (req, res, next) => {
  const { password, email } = req.body;
  try {
    // const user = await signup(email, password);
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
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
  } catch (error) {
    res.json({
      status: 500,
      error,
      message: `error creating user with ${{ password, email }}`,
    });
    next(); // TODO: test if this is needed when error
  }
});

// GET: users
router.route("/users").get(async (req, res) => {
  // const userId = req.params.id;
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    res.json({
      status: 500,
      error,
      message: "error getting users",
    });
  }
});

export default router;
