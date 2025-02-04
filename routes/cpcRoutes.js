const express = require("express");
const {
  getCpcSectionsByChapter,
  getCpcSection,
  searchCpcSections,
  searchCpcSectionsByChapter,
  getCpcSectionsByChapterJSON,
  getCpcSectionById,
} = require("../controllers/cpcController");

const router = express.Router();

router.get("/cpc", (req, res) => {
  res.render("cpcChapters.ejs");
});
router.get("/cpc_sections", getCpcSectionsByChapter);
router.get("/cpc_section", getCpcSection);
router.get("/cpc_section_id", getCpcSectionById)
router.get("/cpc_sections/search", searchCpcSections);
router.get("/cpc_sections/search/:chapterNumber", searchCpcSectionsByChapter);
router.get("/cpc_sections/:chapterNumber", getCpcSectionsByChapterJSON);

module.exports = router;
