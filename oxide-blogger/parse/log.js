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
    const code = /(?=`{3}python).*(?<=`{3})/gms;
	const paragraph = /^\w.*/gm

	var title = '';

	// Example: Paragraphs
	if(paragraph.test(content)) {
		var paragraphs = content.match(paragraph);
		paragraphs.forEach(el => {
			content = content.replace(el, "<p>"+ el +"</p>")
		})
	}

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

    if( code.test(content) ) {
        var codeSnippets = content.match(code);
        var plainCodeRe = /(?<=`{3}python).*(?=`{3})/gms;

        var coderDiv = document.createElement("div");
        var preBlock = document.createElement("pre");
        var codeLanguageBlock = document.createElement("code");
        coderDiv.classList.value = "coder";
        codeLanguageBlock.classList.value = "language-python coder"
        coderDiv.appendChild(preBlock);
        preBlock.appendChild(codeLanguageBlock);

        codeSnippets.forEach( element => {
            var codeLines = element.match(plainCodeRe);
            codeLanguageBlock.textContent = codeLines;
            var codeBlock = `
<div class="coder">
    ${coderDiv.innerHTML}
</div>
            `
            content = content.replace(element, codeBlock);
        })
    }


    return [content, title]
}
