const pool = require("../config/db.js");

exports.getAllDowrySections = async (req, res) => {
  try {
    const { rows } = await pool.query(
      `SELECT * 
           FROM dowry_prohibition 
           ORDER BY 
             CAST(regexp_replace(section_number, '[^0-9]', '', 'g') AS INTEGER), 
             section_number`
    );
    res.render("dowrySectionlist.ejs", { data: rows });
  } catch (err) {
    console.error("Error executing query:", err);
    res.status(500).send("Server error");
  }
};

exports.getAllDowrySectionsJSON = async (req, res) => {
  try {
    const { rows } = await pool.query(
      `SELECT * 
           FROM dowry_prohibition 
           ORDER BY 
             CAST(regexp_replace(section_number, '[^0-9]', '', 'g') AS INTEGER), 
             section_number`
    );
    res.json({ success: true, data: rows });
  } catch (err) {
    console.error("Error executing query:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.getDowrySection = async (req, res) => {
  const section_number = req.query.section_number;
  const query = "SELECT * FROM dowry_prohibition WHERE section_number = $1";

  try {
    const { rows } = await pool.query(query, [section_number]);
    if (rows.length === 0) {
      return res.status(404).send("Section not found");
    }
    res.render("dowrySection.ejs", { data: rows[0] });
  } catch (err) {
    console.error("Error executing query:", err);
    res.status(500).send("Server error");
  }
};

exports.searchDowrySections = async (req, res) => {
  const searchTerm = req.query.search;
  if (!searchTerm) {
    return res.status(400).json({
      success: false,
      message: "Search term is required",
      data: [],
    });
  }
  const query = `SELECT * FROM dowry_prohibition WHERE section_number ILIKE $1 OR section_name ILIKE $1 OR description ILIKE $1 `;
  try {
    const { rows } = await pool.query(query, [`%${searchTerm}%`]);
    res.json({
      success: true,
      message:
        rows.length > 0
          ? "Search results fetched successfully"
          : "No results found",
      data: rows,
    });
  } catch (err) {
    console.error("Error executing search query:", err);
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching search results",
      data: [],
    });
  }
};

exports.getDowrySectionById = async (req, res) => {
  const id = req.query.id;
  const query = "SELECT * FROM dowry_prohibition WHERE id = $1";

  try {
    const { rows } = await pool.query(query, [id]);
    if (rows.length === 0) {
      return res.status(404).send("Section not found");
    }
    res.render("dowrySection.ejs", { data: rows[0] });
  } catch (err) {
    console.error("Error executing query:", err);
    res.status(500).send("Server error");
  }
};
