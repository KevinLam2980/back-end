const recipesModel = require('../recipes/recipes-model');

module.exports = (req, res, next) => {
  const { id } = req.params;
  recipesModel
    .findById(id)
    .then((recipe) => {
      if (recipe.user_id === req.jwt.subject) {
        next();
      } else {
        res
          .status(401)
          .json({
            message: 'You do not have permission to modify this recipe.',
          });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: err });
    });
};
