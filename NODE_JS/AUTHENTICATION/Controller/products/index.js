const fs = require("fs")

const getProduct = (req, res, next) => {
    try {
        fs.readFile("./products.json", "utf-8", (err, data) => {
            if (err) next({ err, status: 505 });
            else {
                const products = data.toString() == "" ? [] : JSON.parse(data);

                return res
                    .status(200)
                    .render("product-list", { products, isAuth: req.user.isAuth });
            }
        });
    } catch (err) {
        return next({ err, status: 505 });
    }
}


const getAbouttUs = (req, res) => {
    return res.status(200).render("aboutUs", { isAuth: req.user.isAuth });
}

const getContactUs = (req, res) => {
    return res.status(200).render("contactUs", { isAuth: req.user.isAuth });
}

const postThankYou = (req, res) => {
    console.log(req.body);
    return res.status(200).render("thankYou", { isAuth: req.user.isAuth });
}

module.exports = { getProduct, getAbouttUs, getContactUs, postThankYou }