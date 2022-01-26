export class KeyAndValue {
  key;
  value;
  constructor( keyAndValue: [string, any]) {
    this.key = keyAndValue[0];
    this.value = keyAndValue[1]
  }
}
