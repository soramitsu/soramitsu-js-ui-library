export default class KeyValues {
  private static readonly digits = /[0-9]/
  private static readonly numbers = /[0-9.]/

  public static isDigit (digit: string): boolean {
    return this.digits.test(digit)
  }

  public static isNumber (number: string): boolean {
    return this.numbers.test(number)
  }
}
