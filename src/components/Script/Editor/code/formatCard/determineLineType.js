
export function determineLineType({ lineText, prevLineType, prevLineText, prevLineExists, nextLineText }) {
    let lineType = null;
    const match = matchLineType(lineText);
    const firstLineOrPrevEmpty = !prevLineExists || !prevLineText;

    // Rule: Decorate "pars" lines after character or dialogue
    if ((prevLineType === 'char' || prevLineType === 'dia') && match === 'pars') {
        lineType = 'pars';
        return lineType
    }

    // Rule: Dialogue lines after character lines
    if ((prevLineType === 'char' || prevLineType === 'dia' || prevLineType === 'pars') && lineText) {
        lineType = 'dia';
        return lineType
    }

    // Rule: Character lines (uppercase, not empty, longer than 1 char, followed by text)
    if (!match && !prevLineType && (!prevLineText || prevLineExists === false) && isUpperCase(lineText) && lineText.length > 1 && nextLineText) {
        lineType = 'char';
        return lineType
    }

    // Rule: Scene, section, trans, center, synopsis lines
    const arr = ['scene', 'section', 'trans', 'center', 'synopsis', 'char'];
    if (arr.includes(match) && firstLineOrPrevEmpty) {
        lineType = match;
        return lineType
    }

    // If no match, return null
    return lineType
}


function matchLineType(lineText) {
    if (!lineText) return null;
    if (lineText.match(/^\>.*\<$/)) return 'center';
    if (lineText.match(/^@/)) return 'char';
    if (lineText.match(/^(INT|EXT|TO:|\.(?!\.))/)) return 'scene';
    if (lineText.match(/^>|TO:$/)) return 'trans';
    if (lineText.match(/^\=/)) return 'synopsis';
    if (lineText.match(/^\(.*\)$/)) return 'pars';
    if (lineText.match(/^\#/)) return 'section';

    return null;
}


function isUpperCase(str) {
    return str === str.toUpperCase();
}
