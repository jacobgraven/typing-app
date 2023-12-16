export function calculateAccuracy(input, expected) {
    let correct = 0;
    for(let i = 0; i < expected.length; i++) {
        if(input[i] === expected[i]) {
            correct++;
        }
    }
    return correct / expected.length;
}

export function calculateWPM(input, time) {
    let trimmedInput = input.replace(/\s/g, "")
    let adjustedWordCount = trimmedInput.length / 5;
    let minutes = time / 60000; // ms --> minutes
    return adjustedWordCount / minutes;
}

export function calculateCPM(input, time) {
    let minutes = time / 60000;
    const adjustedInput = input.replace(/\s/g, "");
    return adjustedInput.length / minutes;
}