import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CoreUtilsService {
  constructor() {}

  stringFormater(word: string, splitBy?: string, concatString?: string) {
    if (word.length < 3) {
      return word.toUpperCase()
    }
    if (word.indexOf(splitBy) != -1) {
      if (word === 'ultra-sun-ultra-moon') {
        return 'Ultra Sun/Ultra Moon';
      } else {
        let words: Array<string> = word.split(splitBy);
        let _words: Array<string> = [];

        words.forEach((word) => {
          let _word = word[0].toUpperCase() + word.slice(1);
          _words.push(_word);
        });

        let _word: string = _words[0];
        for (let i = 1; i < _words.length; i++) {
          _word += concatString + _words[i];
        }
        return _word;
      }
    } else {
      return word[0].toUpperCase() + word.slice(1);
    }
  }

  stringsFormats(list: string[]): string[] {
    let _list: string[] = [];
    list.forEach((word) => _list.push(this.stringFormater(word)));
    return _list;
  }

  toSnakeCase(word: string) {
    if (word.indexOf(" ") != -1) {
      let words: Array<string> = word.split(" ");
      let _words: Array<string> = [];

      words.forEach((word) => _words.push(word.toLowerCase()) );

      let _word: string = _words[0];
      for (let i = 1; i < _words.length; i++) {
        _word += "-" + _words[i];
      }

      return _word;
    } else {
      return word.toLowerCase();
    }
  }

}
