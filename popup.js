function setOptions(value) {
    chrome.extension.sendRequest({setLinkType : value});
}

function updateRadio() {
    chrome.extension.sendRequest({getLinkType : true}, function (response) {
        var radio = document.getElementById(response);
        radio.checked = true;
    });
}

function getCheckedRadioId(name) {
    var elements = document.getElementsByName(name),
        length   = elements.length;

    for (var i=0, len=length; i<len; ++i) {
        if (elements[i].checked) {
            return elements[i].value;
        }
    }
}

function refreshTabs() {
    var matchPattern = '*://www.pogdesign.co.uk/cat/';
    
    // get all tabs with URL matching the pattern and reload them
    chrome.tabs.query({url : matchPattern}, function (foundTabs) {
        for (var i = 0, j = foundTabs.length; i < j; i++) {
            chrome.tabs.reload(foundTabs[i].id);
        }
    });
}

updateRadio();

var typeSubmit = document.getElementById('submitType');
typeSubmit.addEventListener('click', function() {
    var type = getCheckedRadioId('linkType');
    setOptions(type);
    refreshTabs();
    window.close();
});