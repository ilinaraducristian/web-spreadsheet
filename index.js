//@ts-check
"use strict";

class Either {
    #value;
    constructor(value) {
        this.#value = value;
    }
    getValue() {
        return this.#value;
    }
}

class Left extends Either { }

class Right extends Either { }

const ERRORS = {
    MISSING_TABLE_HEADER_ROW: 'the table header row element is missing',
    MISSING_TABLE_BODY: 'the table body is missing'
};

window.onload = () => {
    const result = createTable();
    if (result instanceof Left) {
        console.error(result.getValue());
    }
};

/**
 * @returns {Either}
 */
function createTable() {
    let result = createHeaderButtons();
    if (result instanceof Left) return result;
    result = createCells();
    if (result instanceof Left) return result;
    return new Right();
}

/**
 * @returns {Either}
 */
function createHeaderButtons() {
    const headerRowElement = document.getElementById('table-header-row');
    if (headerRowElement === null) return new Left(ERRORS.MISSING_TABLE_HEADER_ROW);
    let thElement = document.createElement('th');
    thElement.appendChild(createButtonElementWithText("#"));
    headerRowElement.appendChild(thElement);
    for (let i = 65; i <= 90; i++) {
        thElement = document.createElement('th');
        thElement.appendChild(createButtonElementWithText(String.fromCharCode(i)));
        headerRowElement.appendChild(thElement);
    }
    return new Right();
}

/**
 * @param {string} text
 * @returns {HTMLButtonElement}
 */
function createButtonElementWithText(text) {
    const buttonElement = document.createElement('button');
    buttonElement.setAttribute('type', 'button');
    buttonElement.textContent = text;
    return buttonElement;
}

/**
 * @returns {Either}
 */
function createCells() {
    const headerRowElement = document.getElementById('table-body');
    if (headerRowElement === null) return new Left(ERRORS.MISSING_TABLE_BODY);
    for (let i = 1; i <= 30; i++) {
        headerRowElement.appendChild(createTableRow(i));
    }
    return new Right();
}

/**
 * @param {number} rowNumber
 */
function createTableRow(rowNumber) {
    const tr = document.createElement('tr');
    tr.appendChild(createCellElementWithChild(createButtonElementWithText(rowNumber.toString())));
    for (let i = 1; i <= 26; i++) {
        tr.appendChild(createCellElementWithChildAndClick(createSpanElement(), onCellClick));
    }
    return tr;
}

/**
 * @param {HTMLElement} child
 */
function createCellElementWithChild(child) {
    const td = document.createElement('td');
    td.appendChild(child);
    return td;
}

/**
 * @param {HTMLElement} child
 * @param {(this: GlobalEventHandlers, ev: MouseEvent) => any} onClick
 */
function createCellElementWithChildAndClick(child, onClick) {
    const td = createCellElementWithChild(child);
    td.onclick = onClick;
    return td;
}

function createSpanElement() {
    const spanElement = document.createElement('span');
    return spanElement;
}

/**
 * @param {MouseEvent} event
 */
function onCellClick(event) {
    if (event.target === null) throw new Error('cell target is null');
    if (!event.shiftKey)
        clearAllSelections();
    const td = /** @type {HTMLTableCellElement} */ (event.target);
    td.className = 'selected';
}

function clearAllSelections() {
    const tds = document.querySelectorAll('td');
    tds.forEach(td => {
        td.className = '';
    });
}