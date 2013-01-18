var today = document.getElementsByClassName('today')[0],
    eps   = today.getElementsByClassName('ep')
    epsArray = Array.prototype.slice.call(eps, 0);


function getProperNumber(number) {
    if (number.length != 2) {
        number = '0' + number;
    }

    return number;
}

function getQuery(ep) {
    var links = ep.getElementsByTagName('a'),
        q;

    q = links[0].innerText.replace(/ /g,"+");
    epInfo = links[1].innerText.match(/\w+|"[^"]+"/g);
    q += 'S' + getProperNumber(epInfo[1]) + 'E' + getProperNumber(epInfo[3]);

    return q;
}

function composeLink(query, type) {
    var url = 'http://torrentz.eu/search?f=' + query;

    if (type === 'linkInTitle') {
        return url;
    };

    var link = document.createElement('a');
    link.href = url;
    link.setAttribute('target', '_blank');
    link.setAttribute('class', 'torrent');
    link.innerHTML  = 'Find torrent';

    return link;
}

function updateElements(epsArray) {
    chrome.extension.sendRequest({getLinkType : true}, function (type) {
        epsArray.forEach(function(el) {
            var q    = getQuery(el),
                link = composeLink(q, type),
                title;

            if (type === 'linkInTitle') {
                title = el.getElementsByTagName('a')[0];
                title.href = link;
                title.setAttribute('target', '_blank');
                return;
            };

            el.appendChild(link);
        });
    });
}

updateElements(epsArray);