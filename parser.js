const { prefix } = require('./config.json');
module.exports = {
    parse_message: (content) => {
        if (!content.toLowerCase().startsWith(prefix) || content.toLowerCase() === prefix) return;
        rows = content.trim().split("\n");
        if (rows.length > 2) {
            n_tries = parseInt(rows[0].split(" ").pop().split("/")[0]);
            tries = rows.slice(2).length;
            if (n_tries == tries) {
                return `${n_tries}`;
            }
        }
        return;
    }
};