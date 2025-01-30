const express = require("express");
const {
  getPowSectionsByChapter,
  getPowSection,
  searchPowSections,
  searchPowSectionsInChapter,
  getPowSectionsByChapterJSON,
} = require("../controllers/powController");

const router = express.Router();

router.get("/pow", (req, res) => {
  res.render("powChapters.ejs");
});
router.get("/pow_sections", getPowSectionsByChapter);
router.get("/pow_section", getPowSection);
router.get("/pow_sections/search", searchPowSections);
router.get("/pow_sections/search/:chapterNumber", searchPowSectionsInChapter);
router.get("/pow_sections/:chapterNumber", getPowSectionsByChapterJSON);

module.exports = router;