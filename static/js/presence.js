// Define some usefull variables
var sessionBox = document.getElementById("spotify-session");
var statusIcon = document.getElementById("status-icon");
var listening = document.getElementById("listening");
var mainDesc = document.getElementById("main-desc");

// Update the presence every 5 seconds
setInterval(update_presence, 4000);

function update_presence() {
  const url = "https://api.lanyard.rest/v1/users/187316528100802560";

  $.getJSON(url, function (data) {
    if (data["success"] == true) {
      if (statusIcon != null) {
        // Update the status icon only if it exists
        update_status(data["data"]["discord_status"]);
      }

      if (data["data"]["listening_to_spotify"] == true) {
        // Enable the listening mode, Spotify is active
        listening_on();
        var artist = data["data"]["spotify"]["artist"]
          .split(";")[0]
          .split(",")[0];
        var song = data["data"]["spotify"]["song"].split("(")[0];
        // Update the text directly from the HTML
        listening.innerHTML =
          "Listening to <b class='font-semibold'>" +
          song +
          "</b> by <b class='font-semibold'>" +
          artist +
          "</b>";
      } else {
        if (sessionBox != null) {
          // Not listening to anything, disable listening if it was enabled
          listening_off();
        }
      }
    } else {
      // Error occured or no data returned from the API, disable listening
      listening_off();
    }
  });
}

function update_status(status) {
  var color = "";
  var text = "";
  
  // Define the color and tippy text based of the status
  if (status == "online") {
    color = "green";
    text = "Online on Discord";
  } else if (status == "idle") {
    color = "yellow";
    text = "AFK on Discord";
  } else if (status == "dnd") {
    color = "red";
    text = "DND on Discord";
  } else {
    color = "gray";
    text = "Offline on Discord";
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
    "bg-" + color + "-500"
  );
  // Update Tippy on status change (appearing on hover)
  statusIcon._tippy.setContent(text);
}

function listening_on() {
  // Make the listening mode appear if Spotify is active
  mainDesc.classList.replace("visible", "hidden");
  sessionBox.classList.replace("hidden", "visible");
}

function listening_off() {
  // Make the listening mode disappear if Spotify is inactive
  mainDesc.classList.replace("hidden", "visible");
  sessionBox.classList.replace("visible", "hidden");
}
