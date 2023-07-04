const { Review } = require("../Models");

const createReview = async (req, res, next) => {
    try {
        const review = await Review.create({ ...req.body.review, userId: req.user._id });
        return res.status(201).json({ success: true, review });
    } catch (error) {
        error.status = 403;
        return next(error);
    }
};

const getAllReview = async (req, res, next) => {
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


        const reviews = await Review.aggregate([
            {
                $facet: {
                    totalCount: [{ $count: "count" }],
                    reviews: [
                        { $skip: (page - 1) * limit },
                        { $limit: limit },
                    ],
                },
            },
            {
                $project: {
                    reviews: 1,
                    total_reviews: { $arrayElemAt: ["$totalCount.count", 0] },
                },
            },
        ]);

        return res.status(200).json({ success: true, reviews });
    } catch (error) {
        return next(error);
    }
};

module.exports = { getAllReview, createReview };