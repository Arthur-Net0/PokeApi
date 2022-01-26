import { KeyAndValue } from "./KeyAndValue";
import { KeyAndValueAction } from "./KeyAndValueAction";

export class ObjectUtils <T> {
  obj: T;

  constructor (obj: T) {
    this.obj = obj;
  }

  for( action: KeyAndValueAction ) {
    ObjectUtils.for(this.obj, action);
  }
  static for(images, action: KeyAndValueAction): void {
    Object.entries(images).map( value => new KeyAndValue(value))
                        .forEach( value => action(value.key, value.value) )
  }

  static isValid(obj): boolean {
    if (!Boolean(obj)) {
      return false
    }
    else {
      if ( obj instanceof Array) {
        if (obj.length === 0) {
          return false
        }
        else {
          obj.forEach( item => {
            if(this.isValid(item)) {
              return true
            }
          })
          return false
        }
      }
      else if (obj instanceof String || typeof(obj) === "string") {
        obj = obj.trim()
        return Boolean(obj !== "")
      }
      else {
        const values = Object.values(obj)
        if (values.length !== 0) {
          values.forEach( value => {
            if (this.isValid(value)) {
              return true
            }
          })
        }
        return false
      }
    }
  }
}

