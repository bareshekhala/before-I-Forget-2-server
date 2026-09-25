//Middleware to handle 404 and generic errors in the application
import {
  type Express,
  type Request,
  type Response,
  type NextFunction,
} from "express";

function handleErrors(app: Express) {
  
  // (404 Not Found)
  app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(404).json({ message: "This route does not exist" });
  });

  // Centralized generic error handling middleware. whenever you call next(error), this middleware will handle the error
  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {

    // always logs the error
    console.error("ERROR", req.method, req.path, err);

    // Sends a generic server error response if headers haven't been sent
    if (!res.headersSent) {
      res
        .status(500)
        .json({
          message: "Internal server error. Check the server console for details",
        });
    }
  });
};

export default handleErrors