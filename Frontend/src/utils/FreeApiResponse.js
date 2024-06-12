class FreeApiResponse {
  constructor(data, message, statusCode, success) {
    this.data = data;
    this.message = message;
    this.statusCode = statusCode;
    this.success = success;
  }
}

export { FreeApiResponse };
