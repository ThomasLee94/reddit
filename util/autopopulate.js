/* eslint-disable arrow-parens */

module.exports = field => {
  return function(next) {
      this.populate(field);
      next();
  }
}