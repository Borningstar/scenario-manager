export class ModelNotFoundError extends Error {
  constructor(message: string, modelId: string) {
    super(message);

    this.modelId = modelId;
  }

  public modelId: string;
}
