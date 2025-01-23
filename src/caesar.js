const FREQUENCY = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

// Calcula a frequencia das letras no texto
function calcFrequency(text) {
    let cont = {};

    for (let character of text.toUpperCase()) {
        if (/[A-Z]/.test(character)) {
            cont[character] = (cont[character] || 0) + 1;
        }
    }
    return Object.entries(cont).sort((a, b) => b[1] - a[1]);
}

// Verifica a letra mais frequente no texto cifrado e tenta calcular o possivel deslocamento
function discoverKey(textEncrypted){
    const FREQUENCY_TEXT = calcFrequency(textEncrypted);

    if (FREQUENCY_TEXT.length === 0) {
        console.log("OPS! Não encontramos nenhuma letra válida no texto.");
        return null;
    }

    let frequencyLetter = FREQUENCY_TEXT[0][0];
    let possibleKeys= [];

    for (let referenceLetter of FREQUENCY) {
        let displacement = (frequencyLetter.charCodeAt(0) - referenceLetter.charCodeAt(0) + 26) % 26;
        possibleKeys.push(displacement);
    }
    return possibleKeys;
}

// Tenta decifrar o texto usando a chave identificada
function decodeCaesar(text, displacement) {
    return text
        .split("")
        .map(character => {
            if (/[A-Z]/.test(character.toUpperCase())) {
                let base = (character === character.toUpperCase()) ? 65 : 97;
                return String.fromCharCode(((character.charCodeAt(0) - base - displacement + 26) % 26) + base);
            }
            return character;
        })
        .join("");
}

/*
* A B C D E F G H I J  K  L  M  N  O  P  Q  R  S  T  U  V  W  X  Y  Z
* 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26
* */

let textEncrypted = "VHJXUDQFD FLEHUQHWLFD";
let possibleKey = discoverKey(textEncrypted);
console.log("Chaves: ", possibleKey);
possibleKey.forEach(key => {
    console.log(`Chave ${key}:`, decodeCaesar(textEncrypted, key));
});
