const pool = require("../config/db.js");

exports.getBnsSectionsByChapter = async (req, res) => {
  const chapter = parseInt(req.query.chapter);
  if (isNaN(chapter)) {
    return res.status(400).send("Invalid chapter number");
  }
  const query = "SELECT * FROM bns_sections WHERE chapter_number = $1";
  try {
    const { rows } = await pool.query(query, [chapter]);
    res.render("BNSsectionlist.ejs", { data: rows });
  } catch (err) {
    console.error("Error executing query:", err);
    res.status(500).send("Server error");
  }
};

exports.getBnsSection = async (req, res) => {
  const section_number = req.query.section_number;
  const query = "SELECT * FROM bns_sections WHERE section_number = $1";

  try {
    const { rows } = await pool.query(query, [section_number]);
    if (rows.length === 0) {
      return res.status(404).send("Section not found");
    }
    res.render("BNSsection.ejs", { data: rows[0] });
  } catch (err) {
    console.error("Error executing query:", err);
    res.status(500).send("Server error");
  }
};

exports.searchBnsSections = async (req, res) => {
  const searchTerm = req.query.search;
  if (!searchTerm) {
    return res.status(400).json({
      success: false,
      message: "Search term is required",
      data: [],
    });
  }
  const query = `SELECT * FROM bns_sections WHERE section_name ILIKE $1 OR description ILIKE $1 OR section_number ILIKE $1 `;
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

exports.searchBnsSectionsInChapter = async (req, res) => {
  const searchTerm = req.query.search;
  const chapterNumber = req.params.chapterNumber;
  if (!searchTerm) {
    return res.status(400).json({
      success: false,
      message: "Search term is required",
      data: [],
    });
  }
  const query = `SELECT * FROM bns_sections WHERE (section_name ILIKE $1 OR description ILIKE $1 OR section_number ILIKE $1) 
                     AND chapter_number = $2
     `;
  try {
    const { rows } = await pool.query(query, [
      `%${searchTerm}%`,
      chapterNumber,
    ]);
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

exports.getBnsSectionsByChapterJSON = async (req, res) => {
  const chapterNumber = req.params.chapterNumber;
  const query = `select * from bns_sections where chapter_number = $1`;

  try {
    const { rows } = await pool.query(query, [chapterNumber]);
    res.json({
      success: true,
      message: "Bns sections fetched",
      data: rows,
    });
  } catch (error) {
    console.error("Error fetching bns_sections for a chapter", err);
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching bns_sections results",
      data: [],
    });
  }
};
