var express = require("express");
var router = express.Router();
var jwt = require("jsonwebtoken");
var { pool, connect } = require("../config/db");

function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({
      message: "Authorization header is missing",
    });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, "your_secret_key_here");
    req.user = decoded;
    next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({
      message: "Invalid token",
    });
  }
}

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.status(200).send("success");
  res.send("respond with a resource");
});

router.get("/userlist", verifyToken, async (req, res) => {
  // res.status(200).send('success');
  const { page = 1, limit = 2 } = req.query; // default to page 1 with 10 items per page
  const offset = (page - 1) * limit;

  try {
    // get total user count
    const {
      rows: [{ count }],
    } = await pool.query("SELECT COUNT(*) FROM users");

    // get paginated user data
    const { rows: users } = await pool.query(
      `
      SELECT * FROM users
      ORDER BY id_users 
      LIMIT $1 OFFSET $2
    `,
      [limit, offset]
    );

    // return paginated user data and total user count in response headers
    res.set("X-Total-Count", count);
    res.set("X-Page-Number", page);
    res.set("X-Page-Size", limit);
    res.status(200).json(users);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
