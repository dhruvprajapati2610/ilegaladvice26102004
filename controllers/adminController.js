const pool = require("../config/db.js");

exports.loadAdminPage = async (req, res) => {
  const userId = req.user.id;
  const isAdminQuery = `select * from clientsignup where id = $1`;
  const isAdmin = await pool.query(isAdminQuery, [userId]);
  if (isAdmin.rows.length === 0) {
    res.redirect("/");
    return;
  }
  if (isAdmin.rows[0].is_admin === false) {
    res.redirect("/");
    return;
  }
  res.render("admin-page", { userId });
};

exports.getNotVerifiedLawyers = async (req, res) => {
  const notVerifiedLawyersQuery = await pool.query(
    "select * from lawyers where admin_verified = false"
  );
  const notVerifiedLawyers = notVerifiedLawyersQuery.rows;
  if (notVerifiedLawyers.length > 0) {
    res.json({ success: true, notVerifiedLawyers });
  } else {
    res.json({ successs: false, message: "No unverified available." });
  }
};

exports.approveLawyer = async (req, res) => {
  const lawyerId = req.params.id;
  try {
    await pool.query("UPDATE lawyers SET admin_verified = true WHERE id = $1", [
      lawyerId,
    ]);
    res.json({ success: true, message: "Lawyer approved successfully." });
  } catch (error) {
    console.error("Error approving lawyer:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to approve lawyer." });
  }
};

exports.declineLawyer = async (req, res) => {
  const lawyerId = req.params.id;
  try {
    await pool.query("DELETE FROM lawyers WHERE id = $1", [lawyerId]);
    res.json({ success: true, message: "Lawyer declined successfully." });
  } catch (error) {
    console.error("Error declining lawyer:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to decline lawyer." });
  }
};
