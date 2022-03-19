import { parseCode, parseCodeSnippets } from "./parse/code.js";
import { extractTextTitle, parseHeadings } from "./parse/heading.js";
import { parseLists } from "./parse/list.js";
import { parseTextStyles } from "./parse/text_styles.js";

/**
 * Reads a log file
 * @param {String} filename The url to the static dev log file
 */
export function readBlogFile(filename) {
	return fetch(filename)
		.then(x => x.text())
		.then((content) => parseBlogMarkup(content))
}

/**
 * Parses the tile, subtitle, author and content for a blog
 * @param {String} content Blog article content
 */
 function parseBlogMarkup(content) {
	let blogBodyElement = document.getElementById("article-body");
	let blogTitleElement = document.getElementById("home-title");
    let blogTitle = extractTextTitle(textBody);
    let blogBody = highlightMarkup(content);

	blogBodyElement.innerHTML = blogBody;
    blogTitleElement.textContent = blogTitle;
}

function highlightMarkup(textBody) {
    parseCode(textBody);
    parseCodeSnippets(textBody);
    parseHeadings(textBody);
    parseLists(textBody);
    parseTextStyles(textBody);
}