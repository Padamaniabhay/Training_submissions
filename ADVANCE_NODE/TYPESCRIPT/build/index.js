"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const connection_1 = __importDefault(require("./Utils/connection"));
const user_routes_1 = __importDefault(require("./Routes/user.routes"));
const product_routes_1 = __importDefault(require("./Routes/product.routes"));
const review_routes_1 = __importDefault(require("./Routes/review.routes"));
const app = (0, express_1.default)();
// middleware
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
app.use("/user", user_routes_1.default);
app.use("/product", product_routes_1.default);
app.use("/review", review_routes_1.default);
app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        success: false,
        message: err.message,
    });
});
app.listen(process.env.PORT, () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, connection_1.default)();
        console.log("Server is Up and Running");
    }
    catch (error) {
        console.log("DB connection Failed ");
    }
}));
