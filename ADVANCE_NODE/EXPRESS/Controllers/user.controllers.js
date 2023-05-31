const { User, Product } = require("./../Models/")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const { default: mongoose } = require("mongoose");

const registerUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = await User.create({ email, password: hashedPassword });
        return res.status(201).json({ success: true, user });
    } catch (error) {
        return next(error);
    }
};

const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            const error = new Error("User Not Found");
            error.status = 404;
            throw error;
        }

        const comparePassword = await bcrypt.compare(password, user.password);

        if (!comparePassword) {
            const error = new Error("Incorrect Password");
            error.status = 401;
            throw error;
        }
        const token = jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: "3d" });

        return res.status(200).json({ success: true, token });
    } catch (error) {
        return next(error);
    }
};


const getAllUserPostedReviews = async (req, res, next) => {
    try {
        const users = await User.aggregate([
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(req.user._id),
                },
            },
            {
                $lookup: {
                    from: "reviews",
                    localField: "_id",
                    foreignField: "userId",
                    as: "reviews",
                    pipeline: [
                        {
                            $group: {
                                _id: "$productId",
                                reviews: { $push: { name: "$name", body: "$body" } },
                            },
                        },
                    ],
                },
            },
            {
                $project: {
                    _id: 0,
                    email: 1,
                    reviews: 1,
                },
            },
        ])

        return res.status(200).json({ success: true, user: users[0] });
    } catch (error) {
        return next(error);
    }
};

const getAllUsersWithProductCount = async (req, res, next) => {
    try {
        const users = await Product.aggregate([
            {
                $group: {
                    _id: "$userId",
                    total_product: { $sum: 1 },
                    product_name: { $push: "$name" }
                },
            },
            {
                $lookup: {
                    from: "users",
                    localField: "_id",
                    foreignField: "_id",
                    as: "users",
                },
            },
            {
                $addFields: {
                    email: {
                        $arrayElemAt: ["$users.email", 0],
                    },
                },
            },
            {
                $project: {
                    _id: 0,
                    users: 0,
                },
            },
        ]);
        return res.status(200).json({ success: true, users });
    } catch (error) {
        return next(error);
    }
};

module.exports = {
    loginUser,
    registerUser,
    getAllUserPostedReviews,
    getAllUsersWithProductCount
};
