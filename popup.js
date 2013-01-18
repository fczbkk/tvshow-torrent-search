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

updateRadio();

var typeSubmit = document.getElementById('submitType');
typeSubmit.addEventListener('click', function() {
    var type = getCheckedRadioId('linkType');
    setOptions(type);
    window.close();
});