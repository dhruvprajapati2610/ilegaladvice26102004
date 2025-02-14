const express = require("express");
const {
  getBsaSectionsByChapter,
  getBsaSection,
  searchBsaSections,
  searchBsaSectionsInChapter,
  getBsaSectionsByChapterJSON,
  getBsaSectionById,
} = require("../controllers/bsaController");

const router = express.Router();

router.get("/", (req, res) => {
  res.render("bsaChapters.ejs");
});
router.get("/bsa_sections", getBsaSectionsByChapter);
router.get("/bsa_section", getBsaSection);
router.get("/bsa_section", getBsaSectionById);
router.get("/bsa_sections/search", searchBsaSections);
router.get("/bsa_sections/search/:chapterNumber", searchBsaSectionsInChapter);
router.get("/bsa_sections/:chapterNumber", getBsaSectionsByChapterJSON);

module.exports = router;
