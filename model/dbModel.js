import firebase from 'firebase'

// First time sign up data creation
export function addNewUser() {
  var username = firebase.database().ref('users');
  const user = firebase.auth().currentUser;
  var newUser = username.child(`${user.uid}`);
  var habitLists = firebase.database().ref('habitLists');
  var habitList = habitLists.child(`habits_${user.uid}`);
  habitList.set({
    'user': user.email
  })

  var tasksLists = firebase.database().ref('taskLists');
  var taskList = tasksLists.child(`tasks_${user.uid}`);
  taskList.set({
    'user': user.email
  })

  newUser.set({
      'email': user.email,
      'habit_list_id': habitList.key,
      'task_list_id': taskList.key
  });

}

//Habit CRUD
//CREATE
export function saveHabit(title, description) {
  const user = firebase.auth().currentUser;
  var userId = firebase.database().ref(`habitLists/habits_${user.uid}`);
  var habitId = userId.push();
  // console.log(title)
  habitId.set({
      'name': title,
      'description': description,
      'streak': 0,
      'completed': false,
      'frequency': "daily"
  });
}
//READ
export function pullHabitData(callBack) {
  const user = firebase.auth().currentUser
  firebase.database()
    .ref(`habitLists/habits_${user.uid}`)
    .once('value')
    .then(snapshot => {
      callBack(snapshot)
    })
}
//UPDATE
export function editsHabit(key, title, description, frequency) {
  const user = firebase.auth().currentUser;
  var habit = firebase.database().ref(`habitLists/habits_${user.uid}/${key}`);
  habit.update({ name: title, description: description, frequency: frequency});
}
//DELETE
export function removesHabit(key) {
  const user = firebase.auth().currentUser;
  var habit = firebase.database().ref(`habitLists/habits_${user.uid}/${key}`);
  habit.remove()
    .then(function() {
      console.log("Remove succeeded.")
    })
    .catch(function(error) {
      console.log("Remove failed: " + error.message)
    });
}

//TASK CRUD
//CREATE
export function saveTask(title, description) {
  const user = firebase.auth().currentUser;
  var userId = firebase.database().ref(`taskLists/tasks_${user.uid}`);
  var taskId = userId.push();

  taskId.set({
      'name': title,
      'description': description,
      'completed': false
  });
}
//READ
export function pullTaskData(callBack) {
  const user = firebase.auth().currentUser
  firebase.database()
    .ref(`taskLists/tasks_${user.uid}`)
    .once('value')
    .then(snapshot => {
      callBack(snapshot)
    })
}
//UPDATE
export function editsTask(key, title, description) {
  const user = firebase.auth().currentUser;
  var task = firebase.database().ref(`taskLists/tasks_${user.uid}/${key}`);
  task.update({ name: title, description: description});
}
//DELETE
export function removesTask(key) {
  const user = firebase.auth().currentUser;
  var habit = firebase.database().ref(`taskLists/tasks_${user.uid}/${key}`);
  habit.remove()
    .then(function() {
      console.log("Remove succeeded.")
    })
    .catch(function(error) {
      console.log("Remove failed: " + error.message)
    });
}

module.exports = {addNewUser, saveHabit, saveTask, pullHabitData, pullTaskData, editsTask, editsHabit, removesHabit, removesTask}

