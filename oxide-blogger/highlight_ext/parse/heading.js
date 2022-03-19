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
    if (!HeadingPatterns.H1.test(textBody)) throw "Can't parse text with no title";
    let textTitle = textBody.match(HeadingPatterns.H1);
    if (textTitle.length > 1) throw "Can't parse text with multiple H1 headings";

    return textTitle[0].slice(1);
}

export function parseHeadings(textBody) {
    return new Promise((res, _) => {
        let parsedBody = parseHeadingTwo(textBody);
        parsedBody = parseHeadingThree(parsedBody);
        parsedBody = removeBodyTitle(parsedBody);
        res(parsedBody);
    })
}

/**
 * Parses a markup text heading two into html heading.
 * @param {String} textBody The text content for parsing the headings
 */
function parseHeadingTwo(textBody) {
    if (!HeadingPatterns.H2.test(textBody)) return textBody;
    let headingTwoMatches = textBody.match(HeadingPatterns.H2);
    headingTwoMatches.forEach(el => {
        let extractedHeading = el.slice(2);
        textBody = textBody.replace(el, `<h2>${extractedHeading}</h2>`);
    });

    return textBody;
}


/**
 * Parses a markup text heading 3 into html heading.
 * @param {String} textBody The text content for parsing the headings
 */
function parseHeadingThree(textBody) {
    if (!HeadingPatterns.H3.test(textBody)) return textBody;

    let headingTwoMatches = textBody.match(HeadingPatterns.H3);
    headingTwoMatches.forEach(el => {
        let extractedHeading = el.slice(3);
        textBody = textBody.replace(el, `<h3>${extractedHeading}</h3>`);
    });

    return textBody;
}

function removeBodyTitle(textBody) {
    if (!HeadingPatterns.H1.test(textBody)) throw "Can't parse text with no title";
    let textTitle = textBody.match(HeadingPatterns.H1);
    if (textTitle.length > 1) throw "Can't parse text with multiple H1 headings";
    textBody = textBody.replace(textTitle[0], '')

    return textBody
}