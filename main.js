const fs = require("fs");
const { columnar_doble } = require("./vignere.js");
const Encrypt = require('./vignere.js');
/*
// VIGNERE
let data0 = "HOLA COMO ESTAS";
let preprocessed_text_mod27 = Encrypt.preprocessing_mod27(data0);
let encrypt_data = Encrypt.vignere(preprocessed_text_mod27, "WORLD", 0);
console.log(encrypt_data);

let decrypt_data = Encrypt.decrypt_vignere(encrypt_data, "WORLD", 0);
console.log(decrypt_data);
*/

let data0 = "HOLA COMO ESTAS";
let preprocessed_text_mod27 = Encrypt.preprocessing_mod27(data0);
let encrypt_data = Encrypt.columnar_doble(preprocessed_text_mod27, "WORLD");




