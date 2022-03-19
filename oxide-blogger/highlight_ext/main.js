import { parseCode, parseCodeSnippets } from "./parse/code.js";
import { extractTextTitle, parseHeadings } from "./parse/heading.js";
import { parseLists } from "./parse/list.js";
import { parseTextStyles } from "./parse/text_styles.js";

/**
 * Reads a log file
 * @param {String} filename The url to the static dev log file
 */
export async function readBlogFile(filename) {
    return await fetch(filename)
        .then(x => x.text())
        .then((content) => parseBlogMarkup(content))
}

/**
 * Parses the tile, subtitle, author and content for a blog
 * @param {String} content Blog article content
 */
async function parseBlogMarkup(textBody) {
    let blogBodyElement = document.getElementById("article-body");
    let blogTitleElement = document.getElementById("home-title");
    let blogTitle = extractTextTitle(textBody);
    let parsedBody = await highlightMarkup(textBody);
    blogBodyElement.innerHTML = parsedBody;
    blogTitleElement.textContent = blogTitle;
}

/**
 *
 * @param {String} textBody
 * @returns {Promise<String>}
 */
async function highlightMarkup(textBody) {
    let parsedBody = textBody;

    parsedBody = await parseCode(parsedBody);
    parsedBody = await parseCodeSnippets(parsedBody);
    parsedBody = await parseHeadings(parsedBody)
    parsedBody = await parseLists(parsedBody);
    parsedBody = await parseTextStyles(parsedBody);

    return parsedBody;
}