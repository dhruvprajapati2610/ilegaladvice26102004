const pool = require("../config/db.js");

exports.getAllIPC = async (req, res) => {
  try {
    const { rows: ipcSections } = await pool.query(
      `SELECT id,case when offence='nan' then null else '- ' || offence end as offence, substring(ipc_section from 5) as ipc_section FROM ipc_sections`
    );

    const noResults = ipcSections.length === 0;

    res.render("ipclist", { ipc: ipcSections, noResults });
  } catch (error) {
    console.error("Error fetching IPC sections:", error);
    res.status(500).send("Internal Server Error");
  }
};

exports.getIPCSection = async (req, res) => {
  try {
    id = req.query.id;
    const query = `select * from ipc_sections where id=$1`;
    const results = await pool.query(query, [id]);
    const ipc = results.rows.map((row) => ({
      id: row.id,
      triable: row.triable,
      bail: row.bail,
      cognizance: row.cognizance,
      conclusion: row.conclusion,
      importance: row.importance,
      practical_application: row.practical_application,
      punishment_detailed: row.punishment_detailed,
      offence_detailed: row.offence_detailed,
      ipc_section: row.ipc_section.substring(4),
      punishment: row.punishment,
      offence: row.offence,
      description_split: row.description_split,
      ipc_in_simple_words: row.ipc_in_simple_words,
    }));
    res.render("ipc", { ipc });
  } catch {
    console.log(error);
  }
};

exports.searchIPC = async (req, res) => {
  try {
    const searchQuery = req.query.search || "";
    const { rows: ipcSections } = await pool.query(
      `
        select id,
        substring(ipc_section from 5) as ipc_section,
        case when offence='nan' then null else '- '|| offence end as offence,
        description
        from ipc_sections
        where ipc_section ilike $1
        or offence ilike $1
        or description ilike $1
        `,
      [`%${searchQuery}%`]
    );

    const noResults = ipcSections.length === 0;

    res.render("ipclist", { ipc: ipcSections, noResults });
  } catch (error) {
    console.error("Error searching IPC sections:", error);
    res.status(500).send("Internal server error");
  }
};
