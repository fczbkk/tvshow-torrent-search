chrome.extension.onRequest.addListener(function(request, sender, callback) {
    if (request.setLinkType) {
        localStorage.setItem('linkType', request.setLinkType);
    }

    if (request.getLinkType) {
        var linkType = localStorage.getItem('linkType') || 'linkBelow';
        callback(linkType);
    }
});