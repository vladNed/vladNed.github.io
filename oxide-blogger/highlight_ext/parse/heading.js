const HeadingPatterns = {
    H1: /^#{1}[^#].*$/gm,
    H2: /^#{2}[^#].*$/gm,
    H3: /^#{3}[^#].*$/gm
}

/**
 * Extract the title from a text based on the H1 heading
 * @param {String} textBody
 * @returns {String} The text title
 */
export function extractTextTitle(textBody) {
    if (!HeadingPatterns.H1.test(textBody)) return;
    let textTitle = textBody.match(HeadingPatterns.H1);
    if (textTitle.length() > 1) throw "Can't parse text with multiple H1 headings";
    textBody = textBody.replace(textTitle[0], '');

    return textTitle;
}

export function parseHeadings(textBody) {
    parseHeadingTwo(textBody);
    parseHeadingThree(textBody);
}

/**
 * Parses a markup text heading two into html heading.
 * @param {String} textBody The text content for parsing the headings
 */
function parseHeadingTwo(textBody) {
    if (!HeadingPatterns.H2.test(textBody)) return;

    let headingTwoMatches = textBody.match(HeadingPatterns.H2);
    headingTwoMatches.forEach(el => {
        let extractedHeading = el.slice(2);
        textBody = textBody.replace(el, `<h2>${extractedHeading}</h2>`);
    });
}


/**
 * Parses a markup text heading 3 into html heading.
 * @param {String} textBody The text content for parsing the headings
 */
function parseHeadingThree(textBody) {
    if (!HeadingPatterns.H3.test(textBody)) return;

    let headingTwoMatches = textBody.match(HeadingPatterns.H3);
    headingTwoMatches.forEach(el => {
        let extractedHeading = el.slice(3);
        textBody = textBody.replace(el, `<h3>${extractedHeading}</h3>`);
    });
}