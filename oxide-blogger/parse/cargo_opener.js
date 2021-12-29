/**
 * Fetches the query parameters from the url and parses them as an object
 *
 * @returns object
 */
export function processCargoManifest() {
    var manifest = location.search
        .replaceAll("?", "")
        .replaceAll("%20", " ");
    var manifest_values = manifest.split("&");
    var cargo_values = {};

    manifest_values.forEach(value => {
        var key_value_pair = value.split("=");
        cargo_values[key_value_pair[0]] = key_value_pair[1];
    })

    return cargo_values;
}

/**
 * From the parsed query params it will replace all the values in the html body.
 *
 */
export function insertCargoValues() {
    var cargo = processCargoManifest();
    var pageContent = document.body.innerHTML;
    Object.entries(cargo).forEach(([template, value]) => {
        pageContent = pageContent.replace(`{{${template}}}`, value);
    })
    document.body.innerHTML = pageContent;
}

