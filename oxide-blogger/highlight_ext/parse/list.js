const ListPatterns = {
    Lists: /^((\s*((\*|\-)|\d(\.|\))) [^\n]+))+$/gm,
    UnorderedList: /^[\*|\+|\-]\s.*$/,
    UnorderedSubList: /^\s\s\s*[\*|\+|\-]\s.*$/,
    OrderedList: /^\d\.\s.*$/,
    OrderedSubList: /^\s\s+\d\.\s.*$/
}

export function parseLists(textBody) {
    if (!ListPatterns.Lists.text(textBody)) return;

    let listsMatches = textBody.match(ListPatterns.Lists);
    listsMatches.forEach(element => {
        let listArray = element.split('\n');
        let formattedList = listArray.map((currentValue, index, array) => {
            parseUnorderedList(currentValue, index, array);
            parseUnorderedSubList(currentValue, index, array);
            parseOrderedList(currentValue, index, array);
            parseOrderedSubList(currentValue, index, array);

            return currentValue;
        });
        formattedList.join('');

        textBody = textBody.replace(element, formattedList);
    });
}

function parseUnorderedList(currentValue, index, array) {
    if (!ListPatterns.UnorderedList.test(currentValue)) return;

    currentValue = `<li>${currentValue.slice(2)}</li>`;
    if (!ListPatterns.UnorderedList.test(array[index - 1]) && !ListPatterns.UnorderedSubList.test(array[index - 1])) {
        currentValue = '<ul>' + currentValue;
    }

    if (!ListPatterns.UnorderedList.test(array[index + 1]) && !ListPatterns.UnorderedSubList.test(array[index + 1])) {
        currentValue = currentValue + '</ul>';
    }

    if (ListPatterns.OrderedSubList.test(array[index + 1]) || ListPatterns.OrderedSubList.test(array[index + 1])) {
        currentValue = currentValue.replace('</li>', '');
    }
}

function parseUnorderedSubList(currentValue, index, array) {
    if (!ListPatterns.UnorderedSubList.test(currentValue)) return;

    currentValue = currentValue.trim();
	currentValue = `<li>${currentValue.slice(2)}</li>`;

    if (!ListPatterns.UnorderedSubList.test(array[index - 1])) {
        currentValue = '<ul>' + currentValue;
    }

    if (!ListPatterns.UnorderedSubList.test(array[index + 1]) && ListPatterns.OrderedSubList.test(array[index + 1])) {
        currentValue = currentValue + '</ul></li>';
    }

    if (!ListPatterns.UnorderedSubList.test(array[index + 1]) && !ListPatterns.OrderedSubList.test(array[index + 1])) {
        currentValue = currentValue + '</ul></li></ul>';
    }
}

function parseOrderedList(currentValue, index, array) {
    if (!ListPatterns.OrderedList.test(currentValue)) return;

    currentValue = '<li>' + currentValue.slice(2) + '</li>';

    if (!ListPatterns.OrderedList.test(array[index - 1]) && !ListPatterns.OrderedList.test(array[index - 1])) {
        currentValue = '<ol>' + currentValue;
    }

    if (!ListPatterns.OrderedList.test(array[index + 1]) && !ListPatterns.OrderedList.test(array[index + 1]) && !ListPatterns.OrderedList.test(array[index + 1])) {
        currentValue = currentValue + '</ol>';
    }

    if (ListPatterns.UnorderedSubList.test(array[index + 1]) || ListPatterns.OrderedSubList.test(array[index + 1])) {
        currentValue = currentValue.replace('</li>', '');
    }
}

function parseOrderedSubList(currentValue, index, array) {
    currentValue = currentValue.trim();
    currentValue = '<li>' + currentValue.slice(2) + '</li>';

    if (!ListPatterns.OrderedSubList.test(array[index - 1])) {
        currentValue = '<ol>' + currentValue;
    }

    if (ListPatterns.OrderedList.test(array[index + 1]) && !ListPatterns.OrderedSubList.test(array[index + 1])) {
        currentValue = currentValue + '</ol>';
    }

    if (!ListPatterns.OrderedList.test(array[index + 1]) && !ListPatterns.OrderedSubList.test(array[index + 1])) {
        currentValue = currentValue + '</ol></li></ol>';
    }
}