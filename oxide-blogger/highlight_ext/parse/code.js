// NOTE: Default this to python for now
const languageDefault = "python";
const MatchPatterns = {
    Code: /^(`{3}|\s{4}).*/gm,
    CodeSnippet: /`{3}/gm,
    CodeTextSnippet: /`\w.*`/gm
};

/**
 * Parses code language related markup
 * @param {String} textBody
 */
export function parseCode(textBody) {
    let codeDivElement = document.createElement('div');
    codeDivElement.classList.value = 'coder';
    let codePreElement = document.createElement('pre');
    let codeElement = document.createElement('code');
    codeElement.classList.value = `language-${forLanguage} coder`;
    codeDivElement.appendChild(codePreElement);
    codePreElement.appendChild(codeElement);

    if (!textBody.test(MatchPatterns.Code)) return;

    for (let chunk in textBody.split(MatchPatterns.CodeSnippet)) {

        // Default only for python coding for now
        if (!chunk.startsWith(languageDefault)) continue;

        let codeChunk = chunk.replace(languageDefault, '```'+languageDefault);
        codeChunk += '```';
        let codeLines = chunk.replace(languageDefault, '');
        codeElement.textContent = codeLines + '\n';

        textBody = textBody.replace(codeChunk, codeDivElement.outerHTML);
    }
}
/**
 * Parses inline code snippets
 * @param {String} textBody
 */
export function parseCodeSnippets(textBody) {
    if (!MatchPatterns.CodeTextSnippet.text(textBody)) return;

    let elements = textBody.match(MatchPatterns.CodeTextSnippet);
    elements.forEach(snippet => {
        let spanElement = document.createElement('span');
        spanElement.classList += 'snipp';
        spanElement.textContent = snippet.replace('`', '');

        textBody = textBody.replace(snippet, spanElement.outerHTML);
    })
}