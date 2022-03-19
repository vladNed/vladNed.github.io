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
    return new Promise((res, _) => {
        let codeDivElement = document.createElement('div');
        codeDivElement.classList.value = 'coder';
        let codePreElement = document.createElement('pre');
        let codeElement = document.createElement('code');
        codeElement.classList.value = `language-${languageDefault} coder`;
        codeDivElement.appendChild(codePreElement);
        codePreElement.appendChild(codeElement);

        if (!MatchPatterns.Code.test(textBody)) res(textBody);
        for (const chunk of textBody.split(MatchPatterns.CodeSnippet)) {
            // Default only for python coding for now
            if (!chunk.startsWith(languageDefault)) continue;

            let codeChunk = chunk.replace(languageDefault, '```'+languageDefault);
            codeChunk += '```';
            let codeLines = chunk.replace(languageDefault, '');
            codeElement.textContent = codeLines + '\n';
            textBody = textBody.replace(codeChunk, codeDivElement.outerHTML);
        }
        res(textBody);
    });
}
/**
 * Parses inline code snippets
 * @param {String} textBody
 */
export function parseCodeSnippets(textBody) {
    return new Promise((res, _) => {
        if (!MatchPatterns.CodeTextSnippet.test(textBody)) res(textBody);

        let elements = textBody.match(MatchPatterns.CodeTextSnippet);
        elements.forEach(snippet => {
            let spanElement = document.createElement('span');
            spanElement.classList += 'snipp';
            spanElement.textContent = snippet.replace('`', '');

            textBody = textBody.replace(snippet, spanElement.outerHTML);
        });

        res(textBody);
    });
}