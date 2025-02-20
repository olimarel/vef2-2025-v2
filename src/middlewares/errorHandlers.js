export function notFoundHandler(req, res, next) {
    res.status(404).render('404', { message: 'Page not found' });
  }
  
  export function errorHandler(err, req, res, next) {
    console.error(err.stack);
    res.status(500).render('error', { message: 'Something went wrong', error: err });
  }
  