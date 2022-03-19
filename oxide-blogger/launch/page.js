/**
 * Method to be coupled to a button or href. It will launch a blog page
 * with the specified blog page name and number
 *
 * @param {String} blogPageName The name of the markdown page
 */
export function launchBlogPage(blogPageName) {
    var baseBlogPage = 'pages/blog_page.html'
    var blogPageParam = `logname=${blogPageName}`

    // Redirect the browser to the base blog page for loading
    location.href = `${baseBlogPage}?${blogPageParam}`
}