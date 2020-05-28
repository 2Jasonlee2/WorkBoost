import firebase from 'firebase'

export function addNewUser() {
  var username = firebase.database().ref('users');
  const user = firebase.auth().currentUser;
  var newUser = username.child(`${user.uid}`);
  var habitLists = firebase.database().ref('habitLists');
  var habitList = habitLists.child(`habits_${user.uid}`);
  habitList.set({
    'user': user.email
  })
  // console.log(user.uid)
  newUser.set({
      'email': user.email,
      'habit_list_id': habitList.key
  });
}

export function saveHabit(title, description) {
  const user = firebase.auth().currentUser;
  var userId = firebase.database().ref(`habitLists/habits_${user.uid}`);
  var habitId = userId.push();
  // console.log(title)
  habitId.set({
      'name': title,
      'description': description
  });

}

  module.exports = {addNewUser, saveHabit}