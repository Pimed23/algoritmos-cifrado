const fs = require("fs");
const Encrypt = require('./algorithms.js');

// CIFRADO VIGNERE
let data0 = "HOLA COMO ESTAS";
let preprocessed_data0_mod27 = Encrypt.preprocessing_mod27(data0);
let encrypt_data_vignere = Encrypt.vignere(preprocessed_data0_mod27, "WORLD", 0);
console.log(encrypt_data_vignere);

let decrypt_data_vignere = Encrypt.decrypt_vignere(encrypt_data_vignere, "WORLD", 0);
console.log(decrypt_data_vignere);

// CIFRADO TRANSPOSICION DE COLUMNA DOBLE
let data1 = "TENGO UN GATO MUY DORMILON";
let preprocessed_data1_mod27 = Encrypt.preprocessing_mod27(data1);
let encrypt_data_columnar = Encrypt.columnar_doble(preprocessed_data1_mod27, "MININO");
console.log(encrypt_data_columnar);

let decrypt_data_columnar = Encrypt.decrypt_columnar(encrypt_data_columnar, "MININO");
console.log(decrypt_data_columnar);



