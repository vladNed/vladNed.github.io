import { launchBlogPage } from "./launch/page.js";
import { makeBlack, openMenu } from "./makeup/navbar.js";
import { readBlogFile } from "./highlight_ext/main.js";
import { processCargoManifest } from "./launch/cargo_opener.js"

window.addEventListener('scroll', (event) => {
    makeBlack();
})

window.launchBlogPage = launchBlogPage;
window.makeBlack = makeBlack;
window.openMenu = openMenu;
window.readLogFile = readBlogFile;
window.processCargoManifest = processCargoManifest;