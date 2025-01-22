const FREQUENCY = "AEOSRNIDMUCTLBPVGHFQJXZYWK".split("");

// Função para calcular a frequência das letras no texto
function calcFrequency(text) {
    let cont = {};

    for (let character of text.toUpperCase()) {
        if (/[A-Z]/.test(character)) {
            cont[character] = (cont[character] || 0) + 1;
        }
    }
    return Object.entries(cont).sort((a, b) => b[1] - a[1]);
}

// Função para tentar descobrir a chave por análise de frequência
function discoverKey(textEncrypted){
    const frequencyText = calcFrequency(textEncrypted);

    if (frequencyText.length === 0) {
        console.log("OPS! Não encontramos nenhuma letra válida no texto.");
        return null;
    }

    let frequentLetter = frequencyText[0][0];
    let possibleKey= [];

    for (let referenceLetter of FREQUENCY) {
        let displacement = (frequentLetter.charCodeAt(0) - referenceLetter.charCodeAt(0) + 26) % 26;
        possibleKey.push(displacement);
    }
    return possibleKey;
}

// Função para decifrar um texto usando uma chave de deslocamento
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
const textEncrypted = "VHJXUDQFD FLEHUQHWLFD";

const keyPossible = discoverKey(textEncrypted);
console.log("Possíveis chaves:", keyPossible);

keyPossible.forEach(key => {
    console.log(`Tentativa com chave ${key}:`, decodeCaesar(textEncrypted, key));
});
