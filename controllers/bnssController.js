const pool = require("../config/db.js");

exports.getBnssSectionsByChapter = async (req, res) => {
  const chapter = parseInt(req.query.chapter);
  if (isNaN(chapter)) {
    return res.status(400).send("Invalid chapter number");
  }
  const query = `
        SELECT * 
        FROM bnss_sections 
        WHERE chapter_number = $1 
        AND section_number !~ '\\(.*\\)'
        ORDER BY section_number ASC
        `;
  try {
    const { rows } = await pool.query(query, [chapter]);
    res.render("bnssSectionlist.ejs", { data: rows });
  } catch (err) {
    console.error("Error executing query:", err);
    res.status(500).send("Server error");
  }
};

exports.getBnssSection = async (req, res) => {
  let section_number = req.query.section_number;
  // Normalize the input section number by removing spaces
  section_number = section_number.replace(/\s+/g, "");

  const query = `
      SELECT * 
      FROM bnss_sections 
      WHERE REPLACE(section_number, ' ', '') = $1 OR REPLACE(section_number, ' ', '') LIKE $1 || '(%'
      ORDER BY section_number;
    `;

  try {
    const { rows } = await pool.query(query, [section_number]);
    if (rows.length === 0) {
      return res.status(404).send("Section not found");
    }

    res.render("bnssSection.ejs", { data: rows });
  } catch (err) {
    console.error("Error executing query:", err);
    res.status(500).send("Server error");
  }
};

exports.searchBnssSections = async (req, res) => {
  const searchTerm = req.query.search;
  if (!searchTerm) {
    return res.status(400).json({
      success: false,
      message: "Search term is required",
      data: [],
    });
  }
  const query = `
      SELECT * 
      FROM bnss_sections 
      WHERE (section_number ILIKE $1 OR section_name ILIKE $1)
      AND section_number NOT LIKE '%(%'
    `;
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

exports.searchBnssSectionsByChapter = async (req, res) => {
  const searchTerm = req.query.search;
  const chapterNumber = req.params.chapterNumber;
  if (!searchTerm) {
    return res.status(400).json({
      success: false,
      message: "Search term is required",
      data: [],
    });
  }
  const query = `SELECT * FROM bnss_sections WHERE (section_name ILIKE $1 OR section_number ILIKE $1) AND section_number NOT LIKE '%(%' 
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
}

exports.getBnssSectionsByChapterJSON = async (req, res) => {
  const chapterNumber = req.params.chapterNumber;
  const query = `
        SELECT * 
        FROM bnss_sections 
        WHERE chapter_number = $1 
        AND section_number !~ '\\(.*\\)'
        ORDER BY section_number ASC
        `;
  try {
    const { rows } = await pool.query(query, [chapterNumber]);
    res.json({
      success: true,
      message: "Bnss sections fetched",
      data: rows,
    });
  } catch (err) {
    console.error("Error executing query:", err);
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching bnss_sections results",
      data: [],
    });
  }
};
