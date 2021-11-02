const fs = require("fs");

class Encrypt {
    
    static vignere(text, key, mode) {

        let encrypt_text = "";
        const vignere_table = {};
        let n_characters = this.#fill_vignere_table(vignere_table, mode);

        for (let i = 0, j = 0; i < text.length; ++i, ++j) {
            if (j === key.length) j = 0;
            let value_text_character = parseInt(vignere_table[text[i]]);
            let value_key_character = parseInt(vignere_table[key[j]]);
            let result = (value_text_character + value_key_character) % n_characters;
            encrypt_text += this.#get_key(vignere_table, result.toString());
        }
        
        return encrypt_text;
    }

    static decrypt_vignere(text, key, mode) {

        let decrypt_text = "";
        const vignere_table = {};
        let n_characters = this.#fill_vignere_table(vignere_table, mode);

        for (let i = 0, j = 0; i < text.length; ++i, ++j) {
            if (j === key.length) j = 0;
            let value_text_character = parseInt(vignere_table[text[i]]);
            let value_key_character = parseInt(vignere_table[key[j]]);
            let result = (value_text_character - value_key_character) % n_characters;

            if(result < 0)
                result = n_characters + result;

            decrypt_text += this.#get_key(vignere_table, result.toString());
        }

        return decrypt_text;
    }

    static autokey(text, key, mode) {

        let encrypt_text = "";
        const vignere_table = {};
        let n_characters = this.#fill_vignere_table(vignere_table, mode);
        let new_key = key + text;

        for (let i = 0; i < text.length; ++i) {
            let value_text_character = parseInt(vignere_table[text[i]]);
            let value_key_character = parseInt(vignere_table[new_key[i]]);
            let result = (value_text_character + value_key_character) % n_characters;
            encrypt_text += this.#get_key(vignere_table, result.toString());
        }

        return encrypt_text;
    }

    static decrypt_autokey(text, key, mode) {

        let decrypt_text = "";
        const vignere_table = {};
        let n_characters = this.#fill_vignere_table(vignere_table, mode);
        let new_key = key;

        for (let i = 0; i < text.length; ++i) {
            let value_text_character = parseInt(vignere_table[text[i]]);
            let value_key_character = parseInt(vignere_table[new_key[i]]);
            let result = (value_text_character - value_key_character) % n_characters;

            if(result < 0)
                result = n_characters + result;

            let letter = this.#get_key(vignere_table, result.toString());
            new_key += letter;
            decrypt_text += this.#get_key(vignere_table, result.toString());
        }

        return decrypt_text;
    }

    static columnar_doble(text, key) {

        let size = key.length;

        while(text.length % size != 0)
            text += 'X'; 

        const arr1 = this.#fill_columnar_table(text, size);

        let newtext = "";
        for(let i = 0; i < arr1[0].length; ++i)
            for(let j = 0; j < arr1.length; ++j)
                newtext += arr1[j][i];
        
        const arr2 = this.#fill_columnar_table(newtext, size);
        const keySorted = this.#order_key(key);
       
        let cyphertext = "";
        
        for(let i = 0; i < keySorted.length; ++i) {

            for(let j = 0; j < arr2.length; ++j) {
                cyphertext += arr2[j][keySorted[i][0]];
            }
        }
            
        return cyphertext;
    }

    static decrypt_columnar(text, key) {
        let size = text.length / key.length;
        const keySorted = this.#order_key(key);
        const arr = this.#fill_columnar_table(text, size);
        const obj = {};

        for(let i = 0; i < keySorted.length; ++i) {
            obj[keySorted[i][0]] = arr[i]; 
        }

        const arr1 = Object.values(obj);

        let newtext = "";
        for(let i = 0; i < arr1[0].length; ++i)
            for(let j = 0; j < arr1.length; ++j)
                newtext += arr1[j][i];
            
        const arr2 = this.#fill_columnar_table(newtext, size);
        
        let decrypttext = "";
        for(let i = 0; i < arr2[0].length; ++i)
            for(let j = 0; j < arr2.length; ++j)
                decrypttext += arr2[j][i];
            
        return decrypttext;
    }

    static #order_key(key) {
        let arrk = key.split('');
        const table = {};
        this.#fill_vignere_table(table, 0);
        let keyParser = {}

        for(let i = 0; i < key.length; ++i)
            keyParser[i] = parseInt(table[key[i]]);
        
        var sortable = [];
        for (var k in keyParser) {
            sortable.push([k, keyParser[k]]);
        }
        
        sortable.sort(function(a, b) {
            return a[1] - b[1];
        });

        return sortable;
    }

    static #fill_columnar_table(text, ksize) {
        const arr = [];
        var temp = [];
        for(let i = 1; i <= text.length; ++i) {
            if(i % ksize == 0 || i == text.length) {
                temp.push(text[i - 1]);
                arr.push(temp);
                temp = [];
            
            } else 
                temp.push(text[i - 1]);
        }
        return arr;
    }

    static preprocessing_mod27(text) {

        let preprocessed_text = "";
        
        for (let i = 0; i < text.length; ++i) {
            if(text[i] === 'Á' ||  text[i] === 'á')
                preprocessed_text += 'A';

            else if(text[i] === 'É' ||  text[i] === 'é')
                preprocessed_text += 'E';
            
            else if(text[i] === 'Í' ||  text[i] === 'í')
                preprocessed_text += 'I';
            
            else if(text[i] === 'Ó' ||  text[i] === 'ó')
                preprocessed_text += 'O';
            
            else if(text[i] === 'Ú' ||  text[i] === 'ú')
                preprocessed_text += 'U';
            
            else if(text[i] === 'Ñ' ||  text[i] === 'ñ')
                preprocessed_text += 'Ñ';
            
            else if(text[i] < 'A' || text[i] > 'z' || (text[i] > 'Z' && text[i] < 'a'))
                continue;

            else if(text[i] >= 'a')
                preprocessed_text += String.fromCharCode((text[i].charCodeAt(0) - 32));
            
            else
                preprocessed_text += text[i];
        }

        return preprocessed_text;
    }

    static preprocessing_mod191(text) {

        let preprocessed_text = "";

        for (let i = 0; i < text.length; ++i) {
            if(text[i] < '!' || text[i] > 'ÿ')
                continue;
            
            else
                preprocessed_text += text[i];
        }

        return preprocessed_text;
    }
    
    static frecuencies(text) {

        const frecuency_table = {};
        const ordered_frecuency_table = {};

        for (let i = 0; i < text.length; ++i) {
            if(frecuency_table[text[i]] !== undefined)
                frecuency_table[text[i]]++;

            else
                frecuency_table[text[i]] = 1;
        }

        Object.keys(frecuency_table).sort().forEach(function(key) {
            ordered_frecuency_table[key] = frecuency_table[key];
        });

        return ordered_frecuency_table;
    }


    static #fill_vignere_table(table, mode) {

        let filename;
        let n_characters;

        if (mode === 0) {
            filename = "mod27.txt";
            n_characters = 27;

        } else if (mode == 1) {
            filename = "mod191.txt";
            n_characters = 191;

        } else {
            console.log("Modo incorrecto...");
            throw new Error();
        }

        var data = fs.readFileSync(`./alphabet/${filename}`,'utf-8');
        const regular_expresion = /\r?\n/;
        const arr = data.split(regular_expresion);
        
        for(let i = 0; i < arr.length; ++i) {
            let temp = arr[i].split(' ');
            table[temp[0]] = temp[1];
        }

        return n_characters;
    }

    static #get_key(object, value) {
        return Object.keys(object).find(key => object[key] === value);
    }
}

module.exports = Encrypt;