import { JSONSchema4 } from "json-schema";
export interface SchemaOf<T> extends JSONSchema4 {
}
export declare function validateSchema<T>(data: any, schema: SchemaOf<T>): Promise<T>;
export declare class SchemaValidator {
    private static instance;
    static validate<T>(data: any, schema: SchemaOf<T>): Promise<T>;
    isValid(data: any, schema: JSONSchema4): true | string;
}
