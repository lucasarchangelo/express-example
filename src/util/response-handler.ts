import { Response } from 'express';

export class ResponseHandler {

    public format(responseObject: any) {
        return {
            data: responseObject,
        }
    }

    public formatError(error: any) {
        return {
            message: "Ocorreu um erro inesperado"
        }
    }
}