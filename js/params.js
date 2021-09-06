var get_uuid = uuid();

initLanding(get_uuid);

function uuid() {
    let uuid = "", i, random;
    for (i = 0; i < 32; i++) {
        random = Math.random() * 16 | 0;

        if (i == 8 || i == 12 || i == 16 || i == 20) {
            uuid += "-"
        }
        uuid += (i == 12 ? 4 : (i == 16 ? (random & 3 | 8) : random)).toString(16);
    }
    return uuid;
}

function initLanding(uuid){
    fetch(`http://airg.com/m/kfuele?id=c2a3613b-31c5-4e73-8b8a-a6d06175b52b&clickid=${uuid}`).then(response => response.json()).then(data => {
    });
}