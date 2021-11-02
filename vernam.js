const fs = require ("fs")
class Vernam{
  constructor(filename = "", size = 0){
    if(!filename) return console.error("An alphabet has not been provided")
    if(!size) return console.error("Provide the size of your alphabet")
    this.alphabet = {}
    this.alphabetArray = []
    this.size = size
    var data = fs.readFileSync(`./alphabet/${filename}`,'utf-8');
    const regular_expresion = /\r?\n/;
    data.split(regular_expresion).forEach( val => {
      let part = val.split(' ')
      this.alphabet[part[0]] = parseInt(part[1])
      this.alphabetArray.push(part[0])
    })
    console.info(`Alphabet proccesed correctly`)
  }

  generateKey(text = ""){
    if(!text) console.info("Text has not been provided")
    let key = ""
    for(let i = 0; i < text.length; i++){
      let randomValue = Math.floor(Math.random()*(this.size - 1))
      key += this.alphabetArray[randomValue]
    }
    return key
  }

  encrypt(text = ""){
    if(!text) console.info("Text has not been provided")
    let key = this.generateKey(text)
    let cipherText = ""
    for(let i = 0; i< key.length; i++){
      let textSymbolInNumber = this.alphabet[text[i]]
      let keySymbolInNumber = this.alphabet[key[i]]
      let xorOperation = textSymbolInNumber ^ keySymbolInNumber
      cipherText += String.fromCharCode(xorOperation)
    }
    return [cipherText, key]
  }

  decrypt(cipherText = "", key = ""){
    if(!cipherText) console.info("Text has not been provided")
    if(!key) console.info("Key has not been provided")
    if(cipherText.length != key.length) console.error("Couldn decrypt the text different size of text and key")
    let plainText = ""
    for(let i = 0; i < key.length; i++){
      let cipherTextSymbolInNumber = cipherText[i].charCodeAt(0)
      let keySymbolInNumber = this.alphabet[key[i]]
      let xorOperation = cipherTextSymbolInNumber ^ keySymbolInNumber
      plainText += this.alphabetArray[xorOperation]
    }
    console.log(plainText)
  }
}
let v = new Vernam("mod191.txt", 191)
let [ct, k] = v.encrypt("ESTOESUNAPRUEBA")
console.log("decrypt")
v.decrypt(ct,k)