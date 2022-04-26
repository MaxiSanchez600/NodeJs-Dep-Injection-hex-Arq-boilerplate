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
      allowNull: true,
      unique: false,
    },
    latitude: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: false,
    },
    longitude: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: false,
    },
    isOn: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });
  sequelize.define("FeederReport", {
    description: {
      type: DataTypes.STRING,
      allowNull: true,
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
      allowNull: true,
      unique: true,
    },
  });
  sequelize.define("Email", {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  sequelize.define("EmailFeeder", {});
};
