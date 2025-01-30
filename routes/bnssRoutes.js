const express = require("express");
const { getBnssSectionsByChapter, getBnssSection, searchBnssSections, searchBnssSectionsByChapter, getBnssSectionsByChapterJSON } = require("../controllers/bnssController");

const router = express.Router();

router.get("/bnss", (req, res) => {
  res.render("bnsschapters.ejs");
});
router.get("/bnss_sections", getBnssSectionsByChapter);
router.get("/bnss_section", getBnssSection);
router.get("/bnss_sections/search", searchBnssSections);
router.get("/bnss_sections/search/:chapterNumber", searchBnssSectionsByChapter);
router.get("/bnss_sections/:chapterNumber", getBnssSectionsByChapterJSON);

module.exports = router;