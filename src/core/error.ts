export class HttpError {
  declare message: string;
  declare field?: string;
  declare value?: unknown;

  constructor({ message, field, value }: HttpError) {
    this.field = field;
    this.value = value;
    this.message = message;
  }
}
