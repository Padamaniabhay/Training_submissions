const Product = require("./../Models/Product")

const createProduct = async (req, res, next) => {
    try {
        const product = await Product.create({ ...req.body.product, userId: req.user._id });
        return res.status(201).json({ success: true, product });
    } catch (error) {
        return next(error);
    }
};

const getAllProduct = async (req, res, next) => {
    try {
        let { page = 1, limit = 5 } = req.query;

        page = parseInt(page);
        limit = parseInt(limit);

        if (Number.isNaN(page)) {
            const error = new Error("Page number must be in digit");
            error.status = 400;
            throw error;
        }

        if (Number.isNaN(limit)) {
            const error = new Error("limit must be in digit");
            error.status = 400;
            throw error;
        }


        const products = await Product.aggregate([
            {
                $facet: {
                    totalCount: [{ $count: "count" }],
                    products: [
                        { $skip: (page - 1) * limit },
                        { $limit: limit },
                    ],
                },
            },
            {
                $project: {
                    products: 1,
                    total_products: { $arrayElemAt: ["$totalCount.count", 0] },
                },
            },
        ]);

        return res.status(201).json({ success: true, products });
    } catch (error) {
        return next(error);
    }
};

const searchProduct = async (req, res, next) => {
    try {
        if (!req.query.search) {
            const error = new Error("please provide search text");
            error.status = 400;
            throw error;
        }
        const searchText = req.query.search;
        const products = await Product.aggregate([{
            $match: { $text: { $search: searchText } }
        },
        {
            $facet: {
                totalCount: [{ $count: "count" }],
                products: []
            },
        },
        {
            $project: {
                products: 1,
                total_products: { $arrayElemAt: ["$totalCount.count", 0] },
            },
        },
        ]);
        return res.status(201).json({ success: true, products });
    } catch (error) {
        return next(error);
    }
}


module.exports = { getAllProduct, searchProduct, createProduct }