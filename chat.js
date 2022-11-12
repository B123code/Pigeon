var firebaseConfig = {
  apiKey: "AIzaSyARRaVGQ-g9PUcTv2iE06IHyamLEoWL0rk",
  authDomain: "pigeon-89874.firebaseapp.com",
  databaseURL: "https://pigeon-89874-default-rtdb.firebaseio.com",
  projectId: "pigeon-89874",
  storageBucket: "pigeon-89874.appspot.com",
  messagingSenderId: "514443961429",
  appId: "1:514443961429:web:4454b0f30a8938bedfe0dc"
};
firebase.initializeApp(firebaseConfig);
username = localStorage.getItem("username");
room_name = "main";


function send() {
  msg = document.getElementById("msg-input").value;
  firebase.database().ref(room_name).push({
    name: username,
    message: msg,
    like: 0
  });
  document.getElementById("msg-input").value="";
}

function getData() {
  firebase.database().ref("/" + room_name).on('value', function (snapshot) {
      document.getElementById("msg-container").innerHTML = "";
      snapshot.forEach(function (childSnapshot) {
          childKey = childSnapshot.key;
          childData = childSnapshot.val();
          if (childKey != "purpose") {
              firebase_message_id = childKey;
              message_data = childData;
              //Start code
              console.log(firebase_message_id);
              console.log(message_data);
              name = message_data['name'];
              message = message_data['message'];
              like = message_data['like'];
              name_with_tag = "<h4 class='username'> " + name + "<img class='user_tick' src='tick.png'></h4>";
              message_with_tag = "<h4 class='message_h4'>" + message + "</h4>";
              like_button = "<button class='like' id=" + firebase_message_id + " value=" + like + " onclick='updateLike(this.id)'>";
              span_with_tag = "<span class='glyphicon glyphicon-thumbs-up'>👍 " + like + "</span></button><hr>";

              row = name_with_tag + message_with_tag + like_button + span_with_tag;
              document.getElementById("msg-container").innerHTML += row;
              //End code
          }
      });
  });
}
getData();

function updateLike(message_id) {
  console.log("clicked on like button - " + message_id);
  button_id = message_id;
  likes = document.getElementById(button_id).value;
  updated_likes = Number(likes) + 1;
  console.log(updated_likes);

  firebase.database().ref(room_name).child(message_id).update({
      like: updated_likes
  });

}