((window, document) =>
{
    'use strict'

    const redirects = window.redirects || {}

    function redirect(e)
    {
        if (!location.hash || redirects[location.hash] === undefined)
        {
            return
        }

        window.location = '../' + redirects[location.hash]
    }

    window.addEventListener('DOMContentLoaded', redirect)
    window.addEventListener('popstate', redirect)
})(window, document)
