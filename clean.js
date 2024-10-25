const fs = require('fs');

function extractDialogueFromSRT(srtFilePath, outputFilePath) {
    fs.readFile(srtFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error("Error reading the file:", err);
            return;
        }

        const lines = data.split('\n');

        const dialogueLines = lines.filter(line => {
            const isTimestamp = line.match(/^\d{2}:\d{2}:\d{2},\d{3} --> \d{2}:\d{2}:\d{2},\d{3}$/);
            const isSubtitleIndex = line.match(/^\d+$/);
            const isEmptyLine = line.trim() === '';

            return !isTimestamp && !isSubtitleIndex && !isEmptyLine && !isAdvertisement;
        }).map(line => {
            return line.replace(/<\/?[^>]+(>|$)/g, '');
        });

        const dialogueOnly = dialogueLines.join('\n');

        fs.writeFile(outputFilePath, dialogueOnly, 'utf8', err => {
            if (err) {
                console.error("Error writing the file:", err);
                return;
            }
            console.log("Dialogue extracted successfully!");
        });
    });
}

// coloque o caminho da legenda aqui
const inputFilePath = 'legenda.srt aqui';
const outputFilePath = 'dialogue_only.txt';
extractDialogueFromSRT(inputFilePath, outputFilePath);
