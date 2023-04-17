var express = require("express");
var { body, validationResult } = require("express-validator");
var router = express.Router();
var { customAlphabet, nanoid } = require("nanoid");
var bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
var { pool, connect } = require("../config/db");

// validate
const validateUser = body("username").notEmpty().isLength({ min: 2 });
const validatePassword = body("password").notEmpty().isLength({ min: 5 });

// signup
router.post("/signup", validateUser, validatePassword, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { username, password, fullname } = req.body;
  const nanoid = customAlphabet("1234567890qwertyuiop", 10);
  id = nanoid(8);

  try {
    const {
      rows: [{ count }],
    } = await pool.query("SELECT COUNT(*) FROM users WHERE username = $1", [
      username,
    ]);
    if (count > 0) {
      return res.status(409).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await pool.query(
      "INSERT INTO users (id_users, username, passworduser, fullname) VALUES ($1, $2, $3, $4)",
      [id, username, hashedPassword, fullname]
    );

    res.status(200).json({
      message: "User has been registered successfully",
      user: {
        id,
        username,
        fullname,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Internal server error",
    });
  }
});

// login
router.post("/login", validateUser, validatePassword, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { username, password } = req.body;
  try {
    const { rows } = await pool.query(
      "SELECT * FROM users WHERE username = $1",
      [username]
    );

    if (rows.length === 0) {
      return res.status(401).json({ error: "Not authorized" });
    }

    const validPassword = await bcrypt.compare(password, rows[0].passworduser);
    if (!validPassword) {
      return res.status(401).json({ error: "Not authorized" });
    }

    const token = jwt.sign({ id: rows[0].id }, "your_secret_key_here", {
      expiresIn: "1h",
    });

    res.status(200).json({
      message: "User login successful",
      token: token,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Internal server error",
    });
  }
});

module.exports = router;
