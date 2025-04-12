export const environment = {
  production: false,
  mongo: {
    uri:
      process.env['MONGO_URI'] ??
      'mongodb://duality:dualitySocialDb!@localhost:27017/duality?authSource=admin',
  },
};
