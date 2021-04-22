// Define some usefull variables
var statusIcon = document.getElementById("statusIcon");
var listeningStatus = document.getElementById("listeningStatus");
var listeningContent = document.getElementById("listeningContent");

var discordIcon = `<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="inline-flex mb-0.5 mx-1"
width="15" height="15" viewBox="0 0 24 24">
<path
    d="M20.222 0c1.406 0 2.54 1.137 2.607 2.475V24l-2.677-2.273-1.47-1.338-1.604-1.398.67 2.205H3.71c-1.402 0-2.54-1.065-2.54-2.476V2.48C1.17 1.142 2.31.003 3.715.003h16.5L20.222 0zm-6.118 5.683h-.03l-.202.2c2.073.6 3.076 1.537 3.076 1.537-1.336-.668-2.54-1.002-3.744-1.137-.87-.135-1.74-.064-2.475 0h-.2c-.47 0-1.47.2-2.81.735-.467.203-.735.336-.735.336s1.002-1.002 3.21-1.537l-.135-.135s-1.672-.064-3.477 1.27c0 0-1.805 3.144-1.805 7.02 0 0 1 1.74 3.743 1.806 0 0 .4-.533.805-1.002-1.54-.468-2.14-1.404-2.14-1.404s.134.066.335.2h.06c.03 0 .044.015.06.03v.006c.016.016.03.03.06.03.33.136.66.27.93.4a8.18 8.18 0 001.8.536c.93.135 1.996.2 3.21 0 .6-.135 1.2-.267 1.8-.535.39-.2.87-.4 1.397-.737 0 0-.6.936-2.205 1.404.33.466.795 1 .795 1 2.744-.06 3.81-1.8 3.87-1.726 0-3.87-1.815-7.02-1.815-7.02-1.635-1.214-3.165-1.26-3.435-1.26l.056-.02zm.168 4.413c.703 0 1.27.6 1.27 1.335 0 .74-.57 1.34-1.27 1.34-.7 0-1.27-.6-1.27-1.334.002-.74.573-1.338 1.27-1.338zm-4.543 0c.7 0 1.266.6 1.266 1.335 0 .74-.57 1.34-1.27 1.34-.7 0-1.27-.6-1.27-1.334 0-.74.57-1.338 1.27-1.338z"
    fill="currentColor" />
</svg>`

// Update the presence every 20 seconds
// Websockets support will be added later
setInterval(update_presence, 10000);

function update_presence() {
  const url = "https://api.lanyard.rest/v1/users/187316528100802560";

  $.getJSON(url, function (data) {
    if (data["success"] == true) {
      // Data received - change stuff

      if (statusIcon != null) {
        // Update the status icon only if it exists
        status_on();
        update_status(data["data"]["discord_status"]);
      }

      if (data["data"]["listening_to_spotify"] == true) {
        // Enable the listening mode, Spotify is active
        listening_on();

        // Escape artist names including other artist names
        var artist = `<b class='font-semibold'>${
          data["data"]["spotify"]["artist"].split(";")[0].split(",")[0]
        }</b>`;
        // Escape song names with uneeded information
        var song = `<b class='font-semibold'>${
          data["data"]["spotify"]["song"].split("(")[0]
        }</b>`;

        // Update the text directly from the HTML if changed
        if (listeningContent.innerHTML.includes(song) == false) {
          listeningContent.innerHTML = `Listening to ${song} by ${artist}`;
        }
      } else {
        // Spotify session is not active (anymore)
        listening_off();
      }
    } else {
      // Error occured or no data returned from the API
      // Disable listening and hide status
      listening_off();
      status_off();
    }
  });
}

function update_status(status) {
  var color = "";
  var text = "";

  // Define the color and tippy text based of the status
  if (status == "online") {
    color = "green-500";
    text = `${discordIcon} Online`;
  } else if (status == "idle") {
    color = "yellow-500";
    text = `${discordIcon} Away`;
  } else if (status == "dnd") {
    color = "red-500";
    text = `${discordIcon} Don't disturb`;
  } else {
    color = "gray-400";
    text = `${discordIcon} Offline`;
  }

  // Remove the loading animation if it's loading
  var check_animation = statusIcon.classList[statusIcon.classList.length - 2];
  if (check_animation.includes("animate")) {
    statusIcon.classList.remove(
      statusIcon.classList[statusIcon.classList.length - 2]
    );
  };
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
