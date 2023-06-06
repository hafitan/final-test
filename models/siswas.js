'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class siswas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  siswas.init({
    nama: DataTypes.STRING,
    email: DataTypes.STRING,
    tgl_lahir: DataTypes.DATE,
    kelas: DataTypes.STRING,
    alamat: DataTypes.TEXT,
    tempat: DataTypes.STRING,
    no_telp: DataTypes.STRING,
    nama_orang_tua: DataTypes.STRING,
    no_ortu: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'siswas',
  });
  return siswas;
};