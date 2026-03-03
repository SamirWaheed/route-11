export default async function errorHandler(err,req,res,next) {
    if (err.code === 11000) {
    return res.status(409).json({
      message: "Author already exists"
    });
  }
    console.error(err.stack);
    res.status(err?.cause?.status || 500).json({
        status: 'error',
        message: err?.message || 'Internal Server Error'
    });
}
