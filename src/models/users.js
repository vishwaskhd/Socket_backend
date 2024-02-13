module.exports = (sequelize, Sequelize) => {

  const users=sequelize.define("users",{
  id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER(11)
    },
    name: {type:Sequelize.STRING(255),unique: {
      args: true,
      msg: 'Name is already in use!'
  }},
    password: {type:Sequelize.STRING(255)}
  }
  );
  return users;
};