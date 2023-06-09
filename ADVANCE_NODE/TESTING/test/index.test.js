const request = require("supertest");
const mongoose = require("mongoose");
const app = require("./../src/index");
const Product = require("./../src/Models/Product");
const Review = require("./../src/Models/Review");
const User = require("./../src/Models/User");

beforeAll(async () => {
  // connection with mongodb
  await mongoose.connect("mongodb://localhost:27017/testdb", {});
  Product.collection.drop();
  Review.collection.drop();
  User.collection.drop();
});

afterAll(async () => {
  // Close the MongoDB connection
  await mongoose.connection.close();
});

let token;
let productId;

describe("User API", () => {
  it("POST /user/register -> register user", () => {
    return request(app)
      .post("/user/register")
      .send({
        email: "xyz@gmail.com",
        password: "xyz@gmail.com",
      })
      .expect(201)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            success: true,
            user: expect.any(String),
          })
        );
      });
  });

  it("POST /user/login -> login user", () => {
    return request(app)
      .post("/user/login")
      .send({
        email: "xyz@gmail.com",
        password: "xyz@gmail.com",
      })
      .expect(200)
      .then((response) => {
        token = response.body.token;
        expect(response.body).toEqual(
          expect.objectContaining({
            success: true,
            token: expect.any(String),
          })
        );
      });
  });
});
describe("Product API", () => {
  it("POST /product/new add product", () => {
    return request(app)
      .post("/product/new")
      .set({ authToken: token })
      .send({
        product: { name: "dsaf", description: "sfadd", price: 123 },
      })
      .expect(201)
      .then((response) => {
        productId = response.body.product._id;
        expect(response.body).toEqual(
          expect.objectContaining({
            success: true,
            product: expect.objectContaining({
              name: expect.any(String),
              description: expect.any(String),
              price: expect.any(Number),
              _id: expect.any(String),
              userId: expect.any(String),
            }),
          })
        );
      });
  });
  it("GET /product/ --> get all products", () => {
    return request(app)
      .get("/product")
      .expect(200)
      .then((res) => {
        expect(res.body).toEqual(
          expect.objectContaining({
            success: true,
            products: expect.arrayContaining([
              expect.objectContaining({
                name: expect.any(String),
                description: expect.any(String),
                price: expect.any(Number),
              }),
            ]),
          })
        );
      });
  });
});

describe("Review API", () => {
  it("POST /review/new add review", () => {
    return request(app)
      .post("/review/new")
      .set({ authToken: token })
      .send({
        review: {
          name: "dsaf",
          body: "sfadd",
          productId: productId,
        },
      })
      .expect(201)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            success: true,
            review: expect.objectContaining({
              name: expect.any(String),
              body: expect.any(String),
              _id: expect.any(String),
              userId: expect.any(String),
              productId: expect.any(String),
            }),
          })
        );
      });
  });

  it("GET /review/ --> get all reviews", () => {
    return request(app)
      .get("/review")
      .expect(200)
      .then((res) => {
        expect(res.body).toEqual(
          expect.objectContaining({
            success: true,
            reviews: expect.objectContaining({
              posted_reviews: expect.arrayContaining([
                expect.objectContaining({
                  name: expect.any(String),
                  body: expect.any(String),
                  _id: expect.any(String),
                  userId: expect.any(String),
                  productId: expect.any(String),
                }),
              ]),
              total_reviews: expect.any(Number),
            }),
          })
        );
      });
  });

  it("GET /user/reviews --> get all reviews posted by user", () => {
    return request(app)
      .get("/user/reviews")
      .set({ authToken: token })
      .expect(200)
      .then((res) => {
        expect(res.body).toEqual(
          expect.objectContaining({
            success: true,
            reviews: expect.arrayContaining([
              expect.objectContaining({
                productID: expect.any(String),
                productReviews: expect.arrayContaining([
                  expect.objectContaining({
                    name: expect.any(String),
                    body: expect.any(String),
                  }),
                ]),
              }),
            ]),
          })
        );
      });
  });

  it("GET /user/productcount --> get all users with posted product count", () => {
    return request(app)
      .get("/user/productcount")
      .expect(200)
      .then((res) => {
        expect(res.body).toEqual(
          expect.objectContaining({
            success: true,
            users: expect.arrayContaining([
              expect.objectContaining({
                total_product: expect.any(Number),
                product_name: expect.arrayContaining([expect.any(String)]),
                email: expect.any(String),
              }),
            ]),
          })
        );
      });
  });
});
