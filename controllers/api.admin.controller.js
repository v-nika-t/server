const service= require('../services/admin.service');


class AdminController {
    db = service;

    addRole = (req, res) => {
        this.db.add(req, res).then((data) => res.status(200).json(data));
    };
}

 module.exports = new AdminController;