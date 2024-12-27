const logger = (req, res, next) => {
  console.log(`\n--------------${req.method} ${req.path} --------------\n`);
  next();
};

export default logger;
