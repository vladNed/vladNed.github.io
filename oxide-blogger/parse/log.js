/**
 * Reads a log file
 * @param {String} filename The url to the static dev log file
 */
 export function readLogFile(filename) {
    return fetch(filename)
        .then(x => x.text())
        .then((content) => parseCoderFormat(content))
}

/**
 * Parses the tile, subtitle, author and content for a blog
 * @param {String} content Blog article content
 */
function parseCoderFormat(content) {
    var article_body = document.getElementById("article-body")
	var article_title = document.getElementById("home-title");
    var title = parse(content);
    article_body.innerHTML = title[0];
	article_title.textContent = title[1];
}

export function parse( content ) {
	// Regular Expressions
	const h1 = /^#{1}[^#].*$/gm;
	const h2 = /^#{2}[^#].*$/gm;
	const h3 = /^#{3}[^#].*$/gm;
	const bold = /\*\*[^\*\n]+\*\*/gm;
	const italics = /[^\*]\*[^\*\n]+\*/gm;
	const link = /\[[\w|\(|\)|\s|\*|\?|\-|\.|\,]*(\]\(){1}[^\)]*\)/gm;
	const lists = /^((\s*((\*|\-)|\d(\.|\))) [^\n]+))+$/gm;
	const unorderedList = /^[\*|\+|\-]\s.*$/;
	const unorderedSubList = /^\s\s\s*[\*|\+|\-]\s.*$/;
	const orderedList = /^\d\.\s.*$/;
	const orderedSubList = /^\s\s+\d\.\s.*$/;
    const code = /^(`{3}|\s{4}).*/gm;
	const paragraph = /^\w.*/gm

	var title = '';

	// Example: # Heading 1
	if( h1.test( content ) ) {
		const matches = content.match( h1 );

		matches.forEach( element => {
			const extractedText = element.slice(1);
			title = extractedText;
			content = content.replace( element, '');
		});
	}

	// Example: # Heading 2
	if( h2.test( content ) ) {
		const matches = content.match( h2 );

		matches.forEach( element => {
			const extractedText = element.slice( 2 );
			content = content.replace( element, '<h2>' + extractedText + '</h2>' );
		} );
	}

	// Example: # Heading 3
	if( h3.test( content ) ) {
		const matches = content.match( h3 );

		matches.forEach( element => {
			const extractedText = element.slice( 3 );
			content = content.replace( element, '<h3>' + extractedText + '</h3>' );
		} );
	}

	// Example: **Bold**
	if( bold.test( content ) ) {
		const matches = content.match( bold );

		matches.forEach( element => {
			const extractedText = element.slice( 2, -2 );
			content = content.replace( element, '<strong>' + extractedText + '</strong>' );
		} );
	}

	// Example: *Italic*
	if( italics.test( content ) ) {
		const matches = content.match( italics );

		matches.forEach( element => {
			const extractedText = element.slice( 2, -1 );
			content = content.replace( element, ' <em>' + extractedText + '</em>' );
		} );
	}

	// Example: [I'm an inline-style link](https://www.google.com)
	if( link.test( content ) ) {
		const links = content.match( link );

		links.forEach( element => {
			const text = element.match( /^\[.*\]/ )[ 0 ].slice( 1, -1 );
			const url = element.match( /\]\(.*\)/ )[ 0 ].slice( 2, -1 );

			content = content.replace( element, '<a href="' + url + '">' + text + '</a>' );
		} );
	}

	if( lists.test( content ) ) {
		const matches = content.match( lists );

		matches.forEach( list => {
			const listArray = list.split( '\n' );

			const formattedList = listArray.map( ( currentValue, index, array ) => {
				if( unorderedList.test( currentValue ) ) {
					currentValue = '<li>' + currentValue.slice( 2 ) + '</li>';

					if( !  unorderedList.test( array[ index - 1 ] ) && ! unorderedSubList.test( array[ index - 1 ] ) ) {
						currentValue = '<ul>' + currentValue;
					}

					if( !  unorderedList.test( array[ index + 1 ] )  &&  ! unorderedSubList.test( array[ index + 1 ] ) ) {
						currentValue = currentValue + '</ul>';
					}

					if( unorderedSubList.test( array[ index + 1 ] ) || orderedSubList.test( array[ index + 1 ] ) ) {
						currentValue = currentValue.replace( '</li>', '' );
					}
				}

				if( unorderedSubList.test( currentValue ) ) {
					currentValue = currentValue.trim();
					currentValue = '<li>' + currentValue.slice( 2 ) + '</li>';

					if( ! unorderedSubList.test( array[ index - 1 ] ) ) {
						currentValue = '<ul>' + currentValue;
					}

					if( ! unorderedSubList.test( array[ index + 1 ] ) && unorderedList.test( array[ index + 1 ] ) ) {
						currentValue = currentValue + '</ul></li>';
					}

					if( ! unorderedSubList.test( array[ index + 1 ] ) && ! unorderedList.test( array[ index + 1 ] ) ) {
						currentValue = currentValue + '</ul></li></ul>';
					}
				}

				if( orderedList.test( currentValue ) ) {
					currentValue = '<li>' + currentValue.slice( 2 ) + '</li>';

					if( ! orderedList.test( array[ index - 1 ] ) && ! orderedSubList.test( array[ index - 1 ] ) ) {
						currentValue = '<ol>' + currentValue;
					}

					if( ! orderedList.test( array[ index + 1 ] ) && ! orderedSubList.test( array[ index + 1 ] ) && ! orderedList.test( array[ index + 1 ] ) ) {
						currentValue = currentValue + '</ol>';
					}

					if( unorderedSubList.test( array[ index + 1 ] ) || orderedSubList.test( array[ index + 1 ] ) ) {
						currentValue = currentValue.replace( '</li>', '' );
					}
				}

				if( orderedSubList.test( currentValue ) ) {
					currentValue = currentValue.trim();
					currentValue = '<li>' + currentValue.slice( 2 ) + '</li>';

					if( ! orderedSubList.test( array[ index - 1 ] ) ) {
						currentValue = '<ol>' + currentValue;
					}

					if( orderedList.test( array[ index + 1 ] ) && ! orderedSubList.test( array[ index + 1 ] ) ) {
						currentValue = currentValue + '</ol>';
					}

					if( ! orderedList.test( array[ index + 1 ] ) && ! orderedSubList.test( array[ index + 1 ] ) ) {
						currentValue = currentValue + '</ol></li></ol>';
					}
				}

				return currentValue;
			} ).join( '' );

			content = content.replace( list, formattedList );
		} );
	}

	// Code snippets: ```python```
    if( code.test(content) ) {

		// Create the div, pre, and code elements;
		var divElement = document.createElement("div");
		var preElement = document.createElement("pre");
		var codeElement = document.createElement("code");
		divElement.classList.value = "coder";
		codeElement.classList.value = "language-python coder"
		divElement.appendChild(preElement);
		preElement.appendChild(codeElement);

		for(const chunk of content.split(/`{3}/gm)){

			// If the chunk does not contain pyhton its not a code snippet
			if(!chunk.startsWith('python')){
				continue
			}

			// To be replaced in the content
			var code_chunk = chunk.replace('python', '```python');
			code_chunk += '```';

			// Add the python code lines to the code element
			var codeLines = chunk.replace('python', '');
			codeElement.textContent = codeLines + "\n";

			// Replace the code block in the content
			content = content.replace(code_chunk, divElement.outerHTML);
		}
	}

	// Paragraphs
	for(const paragraph of content.match(/.+?\n\n/gs)){
		if(paragraph.startsWith('<') || paragraph.startsWith(' ') || paragraph.startsWith('\n')){
			continue
		}
		content = content.replace(paragraph, `<p>${paragraph}</p>`)
	}

	// Code text snippets
	const codeTextSnippet = /`\w.*`/gm
	if(codeTextSnippet.test(content)){
		var elements = content.match(codeTextSnippet);
		elements.forEach(word => {
			var spanElement = document.createElement('span');
			spanElement.classList += 'snipp';
			spanElement.textContent = word.replaceAll('`','');

			content = content.replace(word, spanElement.outerHTML);
		})
	}

    return [content, title]
}
