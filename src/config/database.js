module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'docker',
  password: 'docker',
  database: 'shared-gis',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
