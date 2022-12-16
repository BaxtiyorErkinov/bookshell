export default class Validator {
  constructor(schema) {
    if (typeof schema !== 'object') {
      return;
    }

    this.schema = schema;
  }
  check(name, value) {
    const { type, match, minLength, maxLength } = this.schema[name];

    if (type && type !== typeof value) {
      return [false, "Noto'gri tipdagi ma'lumot!"];
    }
    if (match && !match.regex.test(value)) {
      return [false, match.message];
    }
    if (minLength && typeof value === 'string' && value.length < minLength) {
      return [false, `Eng kamida ${minLength} ta belgi!`];
    }
    if (maxLength && typeof value === 'string' && value.length > maxLength) {
      return [false, `Ko'pi bilan ${maxLength} ta belgi!`];
    }

    return [true, null];
  }
  checkAgainstSchema(form) {
    const validationResults = {};
    let isValid = true;

    for (const name in this.schema) {
      if (Object.hasOwnProperty.call(this.schema, name)) {
        if (!Object.hasOwnProperty.call(form, name) || !form[name]) {
          validationResults[name] = `Buni kiritish majburiy!`;
          isValid = false;
          continue;
        }

        const [valid, error] = this.check(name, form[name]);

        if (!valid) {
          validationResults[name] = error;
          isValid = false;
        }
      }
    }
    return [isValid, validationResults];
  }
}
