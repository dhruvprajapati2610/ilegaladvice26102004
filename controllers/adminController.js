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
    await pool.query(
      "UPDATE lawyers SET is_verified = true WHERE id = $1",
      [clientId]
    );
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

exports.getNotVerifiedClients = async (req, res) => {
  const notVerifiedClientsQuery = await pool.query(
    "select * from clientsignup where admin_verified = false AND is_admin = false"
  );
  const notVerifiedClients = notVerifiedClientsQuery.rows;
  if (notVerifiedClients.length > 0) {
    res.json({ success: true, notVerifiedClients });
  } else {
    res.json({ success: false, message: "No unverified clients available." });
  }
};

exports.approveClient = async (req, res) => {
  const clientId = req.params.id;
  try {
    await pool.query(
      "UPDATE clientsignup SET admin_verified = true WHERE id = $1",
      [clientId]
    );
    await pool.query(
      "UPDATE clientsignup SET is_verified = true WHERE id = $1",
      [clientId]
    );
    res.json({ success: true, message: "Client approved successfully." });
  } catch (error) {
    console.error("Error approving client:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to approve client." });
  }
};

exports.declineClient = async (req, res) => {
  const clientId = req.params.id;
  try {
    await pool.query("DELETE FROM clientsignup WHERE id = $1", [clientId]);
    res.json({ success: true, message: "Client declined successfully." });
  } catch (error) {
    console.error("Error declining client:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to decline client." });
  }
};
