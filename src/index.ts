import {JSONSchema4} from "json-schema";

const Ajv = require('ajv');

export interface SchemaOf<T> extends JSONSchema4{}

export function validateSchema<T>(data: any, schema: SchemaOf<T>): Promise<T>{
    return SchemaValidator.validate(data, schema);
}

export class SchemaValidator{

    private static instance: SchemaValidator;

    static validate<T>(data: any, schema: SchemaOf<T>): Promise<T>{

        if(!SchemaValidator.instance) SchemaValidator.instance = new SchemaValidator();

        const validation = SchemaValidator.instance.isValid(data, schema);

        if(validation === true) {
            return Promise.resolve(data as any as T);
        }

        return Promise.reject(validation)
    }

    isValid(data: any, schema: JSONSchema4): true | string{

        const ajv = new Ajv({allErrors: true});
        const validator = ajv.compile(schema);
        const valid = validator(data);

        if(!valid) {
            return ajv.errorsText(validator.errors);
        }

        return true;

    }

}