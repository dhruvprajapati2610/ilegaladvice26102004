const pool = require("../config/db.js");

exports.getCrpcSection = async (req, res) => {
  const chapter = req.query.chapter;
  try {
    var sql = "select * from crpc_chapters where chapter_number=$1";
    var crpc = await pool.query(sql, [chapter]);
    console.log(crpc.rows);
    res.render("crpcDrop.ejs", { data: crpc.rows });
  } catch (err) {
    console.error("Error retrieving data from the database:", err);
    res.status(500).send("Internal server error");
  }
};
