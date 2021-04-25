// Define some usefull variables
var statusIcon = document.getElementById("statusIcon");
var listeningStatus = document.getElementById("listeningStatus");
var listeningContent = document.getElementById("listeningContent");

// Initialize websocket session
const lanyard = new WebSocket("wss://api.lanyard.rest/socket");

var dscdata = {};
var received = false;

// Subscribe for Discord ID
lanyard.onopen = function () {
  lanyard.send(
    JSON.stringify({
      op: 2,
      d: {
        subscribe_to_id: "187316528100802560",
      },
    })
  );
};

// Send a heartbeat every 30 seconds
setInterval(() => {
  if (received) {
    lanyard.send(
      JSON.stringify({
        op: 3,
      })
    );
  }
}, 30000);

// Update once a new data is received
lanyard.onmessage = function (event) {
  received = true;
  dscdata = JSON.parse(event.data);

  if (dscdata.t === "INIT_STATE" || dscdata.t === "PRESENCE_UPDATE") {
    update_presence();
  }
};

function update_presence() {
  if (statusIcon != null) {
    // Update the status icon only if it exists
    status_on();
    update_status(dscdata.d.discord_status);
  }

  if (dscdata.d.listening_to_spotify == true) {
    // Enable the listening mode, Spotify is active
    listening_on();

    // Escape artist names including other artist names
    var artist = `<b class='font-semibold'>${
      dscdata.d.spotify.artist.split(";")[0].split(",")[0]
    }</b>`;
    // Escape song names with uneeded information
    var song = `<b class='font-semibold'>${
      dscdata.d.spotify.song.split("(")[0]
    }</b>`;

    // Update the text directly from the HTML if changed
    if (listeningContent.innerHTML.includes(song) == false) {
      listeningContent.innerHTML = `Listening to ${song} by ${artist}`;
    }
  } else {
    // Spotify session is not active (anymore)
    listening_off();
  }
}

function update_status(status) {
  var color = "";
  var text = "";

  // Define the color and tippy text based of the status
  if (status == "online") {
    color = "green-500";
    text = `Online`;
  } else if (status == "idle") {
    color = "yellow-500";
    text = `Away`;
  } else if (status == "dnd") {
    color = "red-500";
    text = `Don't disturb`;
  } else {
    color = "gray-400";
    text = `Offline`;
  }

  // Remove the loading animation if it's loading
  var check_animation = statusIcon.classList[statusIcon.classList.length - 2];
  if (check_animation.includes("animate")) {
    statusIcon.classList.remove(
      statusIcon.classList[statusIcon.classList.length - 2]
    );
  }
  // Update the status color and replace the old one
  statusIcon.classList.replace(
    statusIcon.classList[statusIcon.classList.length - 1],
    `bg-${color}`
  );
  // Update Tippy on status change (appearing on hover)
  statusIcon._tippy.setContent(text);
}

function listening_on() {
  // Make the listening mode appear if Spotify is active
  if (listeningStatus.classList.value.includes("hidden")) {
    // Only appear if hidden
    listeningStatus.classList.replace("hidden", "block");
  }
}

function listening_off() {
  // Make the listening mode disappear if Spotify is inactive
  if (listeningStatus.classList.value.includes("block")) {
    listeningStatus.classList.replace("block", "hidden");
  }
}

function status_on() {
  // Make the status appear with the Discord data
  statusIcon.classList.replace("hidden", "inline-flex");
}

function status_off() {
  // Hide the status appear if no Discord data received
  statusIcon.classList.replace("inline-flex", "hidden");
}
