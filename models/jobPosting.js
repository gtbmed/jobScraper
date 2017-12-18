module.exports = function(sequelize, DataTypes) {
  const JobPosting = sequelize.define("JobPosting", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      set(val) {
      this.setDataValue('title', val.toUpperCase());
      }
    },
    link: {
      type: DataTypes.STRING,
      allowNull: false
    },
    saved: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    applied : {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  });
};
