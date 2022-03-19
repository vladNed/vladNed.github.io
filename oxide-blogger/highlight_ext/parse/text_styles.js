const StylePatters = {
    Bold: /\*\*[^\*\n]+\*\*/gm,
    Italic: /[^\*]\*[^\*\n]+\*/gm,
    Link: /\[[\w|\(|\)|\s|\*|\?|\-|\.|\,]*(\]\(){1}[^\)]*\)/gm,
    Paragraph: /.+?\n\n/gs
}

/**
 * Parses all text styles in the text body.
 * @param {String} textBody
 * @returns {Promise<String>} The parsed text styles in text body
 */
export function parseTextStyles(textBody) {
    return new Promise((res, _) => {
        let parsedBody = parseBoldText(textBody);
        parsedBody = parseItalicText(parsedBody);
        parsedBody = parseLinkText(parsedBody);
        parsedBody = parseParagraphs(parsedBody);

        res(parsedBody);
    });
}

/**
 * Parses markup text bold text
 * @param {String} textBody The text title
 */
function parseBoldText(textBody) {
    if (!StylePatters.Bold.test(textBody)) return textBody;
    let matches = textBody.match(StylePatters.Bold);
    matches.forEach(element => {
        let extractedText = element.slice(2, -2);
        textBody = textBody.replace(element, `<strong>${extractedText}</strong>`);
    });

    return textBody;
}


/**
 * Parses markup text italics text
 * @param {String} textBody The text title
 */
function parseItalicText(textBody) {
    if (!StylePatters.Italic.test(textBody)) return textBody;
    let matches = textBody.match(StylePatters.Italic);
    matches.forEach(element => {
        let extractedText = element.slice(2, -1);
		textBody = textBody.replace(element, ` <em>${extractedText}</em>`);
    });

    return textBody;
}


/**
 * Parses markup text link text
 * @param {String} textBody The text title
 */
function parseLinkText(textBody) {
    if (!StylePatters.Link.test(textBody)) return textBody;
    let matches = textBody.match(StylePatters.Link);
    matches.forEach(element => {
        let text = element.match(/^\[.*\]/)[0].slice(1, -1);
		let url = element.match(/\]\(.*\)/)[0].slice(2, -1);
		textBody = textBody.replace(element, `<a href="${url}">${text}</a>`);
    });

    return textBody;
}

function parseParagraphs(textBody) {
    let matches = textBody.match(StylePatters.Paragraph);
    matches.forEach(p => {
        if (p.startsWith('<') || p.startsWith(' ') || p.startsWith('\n')) return;

        textBody = textBody.replace(p, `<p>${p}</p>`)
    });

    return textBody;
}