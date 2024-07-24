const TodoModel = require('../models/TodoModel');

module.exports = async (req, res) => {
  const {id} = req.params;
  console.log("ID = " + id)
  const todo = await TodoModel.findByIdAndDelete(id);
  // await todo.remove();
  res.status(204).json(todo);
}