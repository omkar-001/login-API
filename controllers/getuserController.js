import db from "../models/index.js";

const { User } = db;

export const testusers = async (req, res) => {
  const users = await User.findAll({
    attributes: [
      "id",
      "name",
      "email",
      "age",
      "password",
      "createdAt",
      "updatedAt",
    ],
    // Example of filtered query using Sequelize operators
    // where: { age: { [Op.lte]: 23 } },  // Get users age <= 23
  });
  res.send(users);
};
export const getUserController = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ["id", "name", "email", "age"],
    });
    // console.log(req.headers("page"));

    const pageCount = Math.ceil(users.length / 10);
    let page = parseInt(req.query.page) || 1;

    if (page > pageCount) {
      page = pageCount;
    }
    res.json({
      page: page,
      users: users.slice(page * 10 - 10, page * 10),
    });
    // Get all users with selected fields only

    // res.send(users);
  } catch (error) {
    res.status(500).send(error);
  }
};
