app
    .service('translitService', [function () {
        this.Translit = class Translit {
            constructor(string) {
                this.string = string;
                this.dependencies = {
                    "а": "a",
                    "б": "b",
                    "в": "v",
                    "г": "h",
                    "zг": "zgh",
                    "ґ": "g",
                    "д": "d",
                    "е": "e",
                    "є": "ie",
                    "Nє": "ye",
                    "ж": "zh",
                    "з": "z",
                    "и": "y",
                    "і": "i",
                    "ї": "i",
                    "Nї": "yi",
                    "й": "i",
                    "Nй": "y",
                    "к": "k",
                    "л": "l",
                    "м": "m",
                    "н": "n",
                    "о": "o",
                    "п": "p",
                    "р": "r",
                    "с": "s",
                    "т": "t",
                    "у": "u",
                    "ф": "f",
                    "х": "kh",
                    "ц": "ts",
                    "ч": "ch",
                    "ш": "sh",
                    "щ": "shch",
                    "ь": "",
                    "ю": "iu",
                    "Nю": "yu",
                    "я": "ia",
                    "Nя": "ya",
                    "'": "",
                    "’": "",
                    "№": "#"
                };
                this.translited = this.checkString();
            }

            checkString() {
                this.string = " " + this.string.toLowerCase();
                let test = this.string.match(/[a-z0-9ыъэё]/);
                return test ? 'Error' : this.translit()
            }

            translit() {
                for (let key in this.dependencies) {
                    this.string = this.string.replace(new RegExp(key, 'g'), this.dependencies[key]);
                }
                return this.string.substr(1);
            }

            capitalize(str = this.translited) {
                return str.split(" ").length === 1 ? this.capitalizeWord(str) : this.capitalizeString(str);
            }

            capitalizeWord(s) {
                return s.charAt(0).toUpperCase() + s.slice(1);
            }

            capitalizeString(s) {
                let arrayWords = s.split(" ");
                for (let i in arrayWords) {
                    arrayWords[i] = this.capitalizeWord(arrayWords[i]);
                }
                return arrayWords.join(' ');
            }
        }

    }])


    .service('translitService2', [function () {

        let serv = this;

        serv.dependencies = {
            "а": "a",
            "б": "b",
            "в": "v",
            "г": "h",
            "zг": "zgh",
            "ґ": "g",
            "д": "d",
            "е": "e",
            "є": "ie",
            "Nє": "ye",
            "ж": "zh",
            "з": "z",
            "и": "y",
            "і": "i",
            "ї": "i",
            "Nї": "yi",
            "й": "i",
            "Nй": "y",
            "к": "k",
            "л": "l",
            "м": "m",
            "н": "n",
            "о": "o",
            "п": "p",
            "р": "r",
            "с": "s",
            "т": "t",
            "у": "u",
            "ф": "f",
            "х": "kh",
            "ц": "ts",
            "ч": "ch",
            "ш": "sh",
            "щ": "shch",
            "ь": "",
            "ю": "iu",
            "Nю": "yu",
            "я": "ia",
            "Nя": "ya",
            "'": "",
            "’": "",
            "№": "#"
        };

        serv.checkString = (string) => {
            string = " " + string.toLowerCase();
            let test = string.match(/[a-z0-9ыъэё]/);
            return test ? 'Error' : serv.translit(string)
        };

        serv.translit = (string) => {
            for (let key in serv.dependencies) {
                string = string.replace(new RegExp(key, 'g'), serv.dependencies[key]);
            }
            return string.substr(1);
        };

        serv.capitalize = (translitedString) => {
            return translitedString.split(" ").length === 1 ? serv.capitalizeWord(translitedString) : serv.capitalizeString(translitedString);
        };

        serv.capitalizeWord = (s) => {
            return s.charAt(0).toUpperCase() + s.slice(1);
        };

        serv.capitalizeString = s => {
            let arrayWords = s.split(" ");
            for (let i in arrayWords) {
                arrayWords[i] = this.capitalizeWord(arrayWords[i]);
            }
            return arrayWords.join(' ');
        };

        serv.capitalizeAll = (string) => {
            let translitedStr = serv.checkString(string);
            return serv.capitalize(translitedStr);
        };
    }])

    .service('callsService', ['$http', 'RootFactory', 'toastsService', function ($http, RootFactory, toastsService) {
        let serv = this;
        serv.call = function (to) {
            if (to.length) {
                if (to.length > 4) {
                    toastsService.callMobile(to);
                } else {
                    toastsService.callIp(to);
                }
                $http.get(`https://atc.busmarket.ua/call.php?exten=SIP/${RootFactory.user.ipPhone}&number=${to.replace(/[\s+()-]+/g, "")}`);
            } else {
                toastsService.callError();
            }
        };
    }])
;