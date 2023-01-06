// Base error class that other application-specific errors inherit from.
// Instances of ApplicationError should not be thrown directly.

class BaseError extends Error {
    public name: string;
  
    public message: string;
  
    public status: number;
  
    constructor(message?: string, status?: number) {
      super();
  
      // Creates a .stack property on the error instance, useful for
      // logging and reporting the source of the error.
      Error.captureStackTrace(this, this.constructor);
  
      this.name = this.constructor.name;
  
      this.message = message || 'Server Error';
      this.status = status || 500;
    }
  }
  
  export default BaseError;
  