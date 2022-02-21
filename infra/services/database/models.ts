const { DataTypes, Model } = require("sequelize");
export default (sequelize) => {
  sequelize.define("Feeders", {
    qrId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    latitude: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    longitude: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    isOn: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  sequelize.define("FeederReport", {
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM,
      values: [
        "FOOD_MISSING",
        "WATER_MISSING",
        "NO_MISSING",
        "FW_MISSING",
        "OK",
        "NO_OK",
      ],
      allowNull: false,
    },
    img: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  });
};
