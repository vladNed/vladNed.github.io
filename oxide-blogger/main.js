import { launchBlogPage } from "./launch/page.js";
import { makeBlack, openMenu } from "./makeup/navbar.js";
import { readLogFile, parse } from "./parse/log.js";
import { processCargoManifest } from "./parse/cargo_opener.js"


window.addEventListener('load', (event) => {
})
window.addEventListener('scroll', (event) => {
    makeBlack();
})

window.launchBlogPage = launchBlogPage;
window.makeBlack = makeBlack;
window.openMenu = openMenu;
window.readLogFile = readLogFile;
window.parse = parse;
window.processCargoManifest = processCargoManifest;