/**
 * Created by val on 9/26/16.
 */

export default function (sequelize, DataTypes) {
  const Author = sequelize.define('Author', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    born: DataTypes.DATEONLY,
    died: DataTypes.DATEONLY,
    description: DataTypes.STRING,
  }, {
    classMethods: {
      associate(models) {
        Author.belongsToMany(models.Book, {
          through: models.BookHasAuthor,
          foreignKey: 'author_id',
          constraints: true,
        });
      },
    },
    tableName: 'author',
  });

  return Author;
}
