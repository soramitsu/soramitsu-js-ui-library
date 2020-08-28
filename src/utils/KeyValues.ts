export class KeyValues {
  private static readonly digits = /[0-9]/

  public static isDigit (digit: string): boolean {
    return this.digits.test(digit)
  }
}
