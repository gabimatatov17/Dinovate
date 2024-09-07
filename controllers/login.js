const path = require("path").resolve(__dirname, "..");


async function showLoginPage(req, res) {
    res.render("login", { root: path });
  }

module.exports = {
    showLoginPage
}