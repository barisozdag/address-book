export default class Utils {
  static formatPhone(val: string) {
    if (val.length <= 3) {
      val = val.replace(/^(\d{0,3})/, '$1');
    } else if (val.length <= 6) {
      val = val.replace(/^(\d{0,3})(\d{0,3})/, '$1 $2');
    } else if (val.length <= 9) {
      val = val.replace(/^(\d{0,3})(\d{0,3})(\d{0,4})/, '($1) $2 $3');
    } else {
      val = val.substring(0, 10);
      val = val.replace(/^(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/, '($1) $2 $3 $4');
    }

    return val;
  }
}
