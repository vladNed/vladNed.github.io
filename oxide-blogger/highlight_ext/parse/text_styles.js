const StylePatters = {
    Bold: /\*\*[^\*\n]+\*\*/gm,
    Italic: /[^\*]\*[^\*\n]+\*/gm,
    Link: /\[[\w|\(|\)|\s|\*|\?|\-|\.|\,]*(\]\(){1}[^\)]*\)/gm,
    Paragraph: /.+?\n\n/gs
}

export function parseTextStyles(textBody) {
    parseBoldText(textBody);
    parseItalicText(textBody);
    parseLinkText(textBody);
    parseParagraphs(textBody);
}

/**
 * Parses markup text bold text
 * @param {String} textBody The text title
 */
function parseBoldText(textBody) {
    if (!StylePatters.Bold.test(textBody)) return;

    let matches = content.match(StylePatters.Bold);
    matches.forEach(element => {
        let extractedText = element.slice(2, -2);
        textBody = textBody.replace(element, `<strong>${extractedText}</strong>`);
    });
}


/**
 * Parses markup text italics text
 * @param {String} textBody The text title
 */
function parseItalicText(textBody) {
    if (!StylePatters.Italic.test(textBody)) return;

    let matches = content.match(StylePatters.Italic);
    matches.forEach(element => {
        let extractedText = element.slice(2, -1);
		textBody = textBody.replace(element, ` <em>${extractedText}</em>`);
    });
}


/**
 * Parses markup text link text
 * @param {String} textBody The text title
 */
function parseLinkText(textBody) {
    if (!StylePatters.Link.test(textBody)) return;

    let matches = content.match(StylePatters.Link);
    matches.forEach(element => {
        let text = element.match(/^\[.*\]/)[0].slice(1, -1);
		let url = element.match(/\]\(.*\)/)[0].slice(2, -1);
		textBody = textBody.replace(element, `<a href="${url}">${text}</a>`);
    });
}

function parseParagraphs(textBody) {
    let matches = content.match(StylePatters.Paragraph);

    matches.forEach(p => {
        if (p.startsWith('<') || p.startsWith(' ') || p.startsWith('\n')) return;

        textBody = textBody.replace(p, `<p>${p}</p>`)
    })
}