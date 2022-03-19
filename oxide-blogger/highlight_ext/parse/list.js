const ListPatterns = {
    Lists: /^((\s*((\*|\-)|\d(\.|\))) [^\n]+))+$/gm,
    UnorderedList: /^[\*|\+|\-]\s.*$/,
    UnorderedSubList: /^\s\s\s*[\*|\+|\-]\s.*$/,
    OrderedList: /^\d\.\s.*$/,
    OrderedSubList: /^\s\s+\d\.\s.*$/
}

export function parseLists(textBody) {
    return new Promise((res, _) => {
        if (!ListPatterns.Lists.test(textBody)) res(textBody);

        let listsMatches = textBody.match(ListPatterns.Lists);
        listsMatches.forEach(element => {
            let listArray = element.split('\n');
            let formattedList = listArray.map((currentValue, index, array) => {
                let parsedValue = parseUnorderedList(currentValue, index, array);
                parsedValue = parseUnorderedSubList(parsedValue, index, array);
                parsedValue = parseOrderedList(parsedValue, index, array);
                parsedValue = parseOrderedSubList(parsedValue, index, array);

                return parsedValue;
            });
            formattedList = formattedList.join('');
            textBody = textBody.replace(element, formattedList);
        });
        res(textBody);
    })
}

function parseUnorderedList(currentValue, index, array) {
    if (!ListPatterns.UnorderedList.test(currentValue)) return currentValue;

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

    return currentValue
}

function parseUnorderedSubList(currentValue, index, array) {
    if (!ListPatterns.UnorderedSubList.test(currentValue)) return currentValue;

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

    return currentValue;
}

function parseOrderedList(currentValue, index, array) {
    if (!ListPatterns.OrderedList.test(currentValue)) return currentValue;

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

    return currentValue;
}

function parseOrderedSubList(currentValue, index, array) {
    if(!ListPatterns.OrderedSubList.test(currentValue)) return currentValue;

    currentValue = currentValue.trim();
    currentValue = `<li>${currentValue.slice(2)}</li>`;

    if (!ListPatterns.OrderedSubList.test(array[index - 1])) {
        currentValue = '<ol>' + currentValue;
    }

    if (ListPatterns.OrderedList.test(array[index + 1]) && !ListPatterns.OrderedSubList.test(array[index + 1])) {
        currentValue = currentValue + '</ol>';
    }

    if (!ListPatterns.OrderedList.test(array[index + 1]) && !ListPatterns.OrderedSubList.test(array[index + 1])) {
        currentValue = currentValue + '</ol></li></ol>';
    }

    return currentValue;
}