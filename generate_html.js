const charACode = 65;
const charZCode = 90;
const numberOfLines = 30;

const fs = require('fs');

let html = `<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Spreadsheet</title>
    <style>
        #spreadsheet {
            --column-count: ${charZCode - charACode + 1}
        }
    </style>
    <link rel="stylesheet" href="style.css">
    <script src="index.js"></script>
</head>

<body>
    <div id="spreadsheet">
        <div></div>
        `;
for (let i = charACode; i <= charZCode; i++) {
    html += `<button type="button" id="${String.fromCharCode(i)}" onclick="columnButtonOnClick(event)">${String.fromCharCode(i)}</button>`;
}
for (let j = 1; j <= numberOfLines; j++) {
    html += '\n        ';
    html += `<button type="button" id="${j}" onclick="rowButtonOnClick(event)">${j}</button>`;
    for (let i = charACode; i <= charZCode; i++) {
        const cellId = `${String.fromCharCode(i)}:${j}`;
        html += `<input type="text" id="${cellId}" onfocus="cellOnFocus(event)" onfocusout="cellOnFocusLost(event)" onkeyup="cellOnKeyUp(event)">`;
    }
}

html += `\n    </div>
</body>
</html>`;

fs.writeFileSync('index.html', html);