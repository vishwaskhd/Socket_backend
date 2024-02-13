module.exports = (sequelize, Sequelize) => {

    const messages=sequelize.define("messages",{
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER(11)
      },
    room: {type:Sequelize.STRING(255)},
    message: {type:Sequelize.STRING(255)},
    timestamp: { type: Sequelize.DATE, defaultValue: Sequelize.fn('now') }
    }
    );
    return messages;
  };