export default class Utils {
  static trimAll(obj: any) {
    Object.keys(obj).map((key) => {

      if (typeof obj[key] === 'string')
        obj[key] = obj[key].trim();
      else if (
        typeof obj[key] === 'object' &&
        obj[key] !== null &&
        obj[key] !== undefined
      )
        obj[key] = Utils.trimAll(obj[key]);

      return obj[key];
    });
    return obj;
  }

  static emptyToNull(obj: any) {
    Object.keys(obj).map((key) => {
      if (typeof obj[key] === 'string' && obj[key] === '')
        obj[key] = null;
      return obj[key];
    });
    return obj;
  }
}
