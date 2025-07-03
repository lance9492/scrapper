export class AppError extends Error {
  constructor(
    message: string,
    public code?: string,
    public statusCode?: number
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export class ValidationError extends AppError {
  constructor(message: string, public field?: string) {
    super(message, 'VALIDATION_ERROR', 400);
    this.name = 'ValidationError';
  }
}

export class AuthenticationError extends AppError {
  constructor(message: string = 'Authentication required') {
    super(message, 'AUTH_ERROR', 401);
    this.name = 'AuthenticationError';
  }
}

export class AuthorizationError extends AppError {
  constructor(message: string = 'Insufficient permissions') {
    super(message, 'AUTHORIZATION_ERROR', 403);
    this.name = 'AuthorizationError';
  }
}

export class NotFoundError extends AppError {
  constructor(message: string = 'Resource not found') {
    super(message, 'NOT_FOUND', 404);
    this.name = 'NotFoundError';
  }
}

export const handleSupabaseError = (error: any): AppError => {
  if (error.code === 'PGRST116') {
    return new NotFoundError('Resource not found');
  }
  
  if (error.code === '23505') {
    return new ValidationError('This record already exists');
  }
  
  if (error.code === '23503') {
    return new ValidationError('Referenced record does not exist');
  }
  
  if (error.message?.includes('JWT')) {
    return new AuthenticationError('Session expired. Please log in again.');
  }
  
  if (error.message?.includes('RLS')) {
    return new AuthorizationError('You do not have permission to perform this action');
  }
  
  return new AppError(error.message || 'An unexpected error occurred');
};

export const getErrorMessage = (error: unknown): string => {
  if (error instanceof AppError) {
    return error.message;
  }
  
  if (error instanceof Error) {
    return error.message;
  }
  
  if (typeof error === 'string') {
    return error;
  }
  
  return 'An unexpected error occurred';
};