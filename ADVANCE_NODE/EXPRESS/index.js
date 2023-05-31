const express = require("express")
require("dotenv").config();
const bodyParser = require("body-parser");
const swaggerUI = require("swagger-ui-express");
const YAML = require("yamljs")

const connectDB = require("./Utils/connection");
const { userRoutes, productRoutes, reviewRoutes } = require("./Routes")

const swaggerDoc = YAML.load("./api.yaml")
const app = express();

// middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

app.use('/api-doc', swaggerUI.serve, swaggerUI.setup(swaggerDoc))
app.use("/user", userRoutes)
app.use("/product", productRoutes)
app.use("/review", reviewRoutes)

app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        success: false,
        message: err.message,
    });
});

app.listen(process.env.PORT, async () => {
    try {
        await connectDB();
        console.log("Server is Up and Running");

    } catch (error) {
        console.log("DB connection Failed ");
    }
})