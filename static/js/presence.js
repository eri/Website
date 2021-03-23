var sessionBox = document.getElementById("spotify-session");
var statusIcon = document.getElementById("status-icon");
var listening = document.getElementById("listening");
var mainDesc = document.getElementById("main-desc");


setInterval(update_presence, 3000);

function update_presence() {
    const url='https://api.lanyard.rest/v1/users/187316528100802560';
    $.getJSON(url, function(data) {
        if (data['success'] == true) {
            update_status(data['data']['discord_status'])
                
            if (data['data']['listening_to_spotify'] == true) {
                listening_on();
                var artist = data['data']['spotify']['artist'].split(";")[0].split(",")[0];
                var song = data['data']['spotify']['song'].split("(")[0];
                listening.innerHTML = "Listening to <b class='font-semibold'>"
                                    + song + "</b> by <b class='font-semibold'>" + artist + "</b>";
            } else {
                listening_off();
            } 
        } else { 
            listening_off();
        }
    })   
};

function update_status(status) {
    var color = ""
    if (status=="online") { 
        color="green" } else if (status=="idle") {
            color="yellow"} else if (status=="dnd") {
                color="red"} else {color="gray"};

    statusIcon.classList.replace(statusIcon.classList[statusIcon.classList.length-1], "bg-"+color+"-500")
}

function listening_on() {
    mainDesc.classList.replace("visible", "hidden");
    sessionBox.classList.replace("hidden", "visible");
}

function listening_off() {
    mainDesc.classList.replace("hidden", "visible");
    sessionBox.classList.replace("visible", "hidden");
}