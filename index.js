//@ts-check
"use strict";

/**
 * @type {Map<string, string>}
 */
const cellsContent = new Map();

/**
 * @param {MouseEvent} event 
 */
function rowButtonOnClick(event) {
    const target = /** @type {HTMLButtonElement} */ (event.target);
    throw new Error('Method not implemented');
}

/**
 * @param {MouseEvent} event 
 */
function columnButtonOnClick(event) {
    const target = /** @type {HTMLButtonElement} */ (event.target);
    throw new Error('Method not implemented');
}

/**
 * @param {FocusEvent} event
 */
function cellOnFocus(event) {
    const target = getCellElementByEvent(event);
    if (target === null) return;
    const cellContent = cellsContent.get(target.id);
    if (cellContent === undefined) return;
    target.value = cellContent;
}

/**
 * @param {FocusEvent} event
 */
function cellOnFocusLost(event) {
    const target = getCellElementByEvent(event);
    if (target === null) return;
    if (target.value.trim().length === 0) {
        cellsContent.delete(target.id);
        return;
    }
    cellsContent.set(target.id, target.value);
    Array.from(cellsContent.entries()).forEach(([cellId, cellValue]) => {
        const cellElement = getCellElementById(cellId);
        if (cellElement === null) return;
        cellElement.value = processInputFormula(cellValue);
    });
}

/**
 * @param {KeyboardEvent} event
 */
function cellOnKeyUp(event) {
    if (!event.code.includes('Enter')) return;
    const target = getCellElementByEvent(event);
    if (target === null) return;
    const match = target.id.match(/[A-Z]+|[0-9]+/g);
    if (match === null) return;
    getCellElementById(`${match[0]}${parseInt(match[1]) + 1}`)?.focus();
}

/**
 * @param {string} input
 * @returns {string}
 */
function processInputFormula(input) {
    if (!input.startsWith("=")) return input;
    let formula = input.substring(1);
    formula = formula.replace(/[A-Z]+[0-9]+/g, (cellId) => {
        const cell = getCellElementById(cellId);
        if (cell === null) return cellId;
        return cell.value || "0";
    });
    try {
        return eval(formula);
    } catch (e) {
        return input;
    }
}

/**
 * @param {string} cellId
 * @return {HTMLInputElement | null}
 */
function getCellElementById(cellId) {
    return /** @type {HTMLInputElement | null} */ (document.getElementById(cellId));
}

/**
 * @param {Event} event
 * @return {HTMLInputElement | null}
 */
function getCellElementByEvent(event) {
    return /** @type {HTMLInputElement | null} */ (event.target);
}