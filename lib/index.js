"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Ajv = require('ajv');
function validateSchema(data, schema) {
    return SchemaValidator.validate(data, schema);
}
exports.validateSchema = validateSchema;
class SchemaValidator {
    static validate(data, schema) {
        if (!SchemaValidator.instance)
            SchemaValidator.instance = new SchemaValidator();
        const validation = SchemaValidator.instance.isValid(data, schema);
        if (validation === true) {
            return Promise.resolve(data);
        }
        return Promise.reject(validation);
    }
    isValid(data, schema) {
        const ajv = new Ajv({ allErrors: true });
        const validator = ajv.compile(schema);
        const valid = validator(data);
        if (!valid) {
            return ajv.errorsText(validator.errors);
        }
        return true;
    }
}
exports.SchemaValidator = SchemaValidator;
//# sourceMappingURL=index.js.map