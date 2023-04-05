const { DataTypes } = require("sequelize");
const Models = require("./Models");

//user has many products
Models.User.hasMany(Models.Product, {
  foreignKey: {
    name: "userId",
    type: DataTypes.INTEGER,
  },
});
Models.Product.belongsTo(Models.User);

//user has many orders
Models.User.hasMany(Models.Order, {
  foreignKey: {
    name: "userId",
    type: DataTypes.INTEGER,
  },
});
Models.Order.belongsTo(Models.User);

//order has many product and product belongsTo many orders
Models.Order.belongsToMany(Models.Product, {
  through: Models.OrderDetails,
});
Models.Product.belongsToMany(Models.Order, {
  through: Models.OrderDetails,
});
Models.Product.hasMany(Models.OrderDetails);
Models.OrderDetails.belongsTo(Models.Product);

Models.Order.hasMany(Models.OrderDetails);
Models.OrderDetails.belongsTo(Models.Order);
