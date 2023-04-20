export class ApiError {
  constructor(
    public code: number,
    public message: string,
    public explanation: string,
    public action: string,
    public see?: string
  ) {
    this.code = code;
    this.message = message;
    this.explanation = explanation;
    this.action = action;
    this.see = see;
  }

  public static badRequest(message: string, explanation: string, action: string, see?: string) {
    return new ApiError(400, message, explanation, action, see);
  }

  public static notFound(message: string, explanation: string, action: string, see?: string) {
    return new ApiError(404, message, explanation, action, see);
  }

  public static internal(message: string, explanation: string, action: string, see?: string) {
    return new ApiError(500, message, explanation, action, see);
  }

  public static unauthorized(message: string, explanation: string, action: string, see?: string) {
    return new ApiError(401, message, explanation, action, see);
  }

  public static forbidden(message: string, explanation: string, action: string, see?: string) {
    return new ApiError(403, message, explanation, action, see);
  }
}
