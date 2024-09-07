const path = require("path").resolve(__dirname, "..");


async function showSignupPage(req, res) {
  res.render("signup", { root: path });
}

module.exports = {
  showSignupPage
}