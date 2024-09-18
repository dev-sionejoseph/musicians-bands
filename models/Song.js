const {Sequelize, db, DataTypes, Model} = require('../db');

// TODO - define the Song model
class Song extends Model {

}

Song.init({
    name: DataTypes.STRING,
    genre: DataTypes.STRING,
    sequelize: db,
    modelName: 'Song'
})

module.exports = {
    Song
};