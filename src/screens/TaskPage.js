import React, { Component, useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert, Image } from 'react-native';
import Modal from 'react-native-modal'
import Task from '../components/Task'
import AddButton from '../components/buttons/AddButton'
import AddTaskForm from '../screens/AddTaskPage'
const {saveTaskModel, pullTaskDataModel, removesTaskModel, editsTaskModel, completeTaskModel} = require('../../model/dbModel.js');

export default function TaskPage() {
    const [tasks, setTasks] = useState([])
    const [addModalVisible, setAddModalVisible] = useState(false)

    function setData(snapshot) {
        let arr = []
        snapshot.forEach(shot => {
            if(shot.key != "user") {
                obj = shot.val()
                obj.key = shot.key
                arr.push(obj)
            }
        })
        arr.sort((a,b) => {return a.completed - b.completed})
        setTasks(arr)
    }

    //logic for "component did mount" first time organizing of state based on completion
    useEffect(() => {
            pullTaskDataModel(setData)
            let tmpTasks = tasks.slice()
            tmpTasks.sort((a,b) => {return a.completed - b.completed})
            setTasks(tmpTasks)
    }, [])

    //add task
    addTask = (title, description) => {
        saveTaskModel(title, description)
        pullTaskDataModel(setData)
    }

    //remove task
    remove = (key) => {
        removesTaskModel(key, setData)
    }

    showAddForm = () => setAddModalVisible(prev => !prev);

    //updates completion
    handleTaskCompletion = (key, complete) => {
        completeTaskModel(key, complete, setData)
    }

    //edit task
    editTask =(key, title, description) => {
        editsTaskModel(key, title, description)
        pullTaskDataModel(setData)
    }
    
    EmptyView = () => {
        return(
            <View>
                <Text>
                    There are no Tasks. Click the "plus" button to add a new task!
                </Text>
            </View>
        )
    }

    return(
        <View> 
            <Modal style={{margin:0, marginTop:60, backgroundColor:"#FFF"}}
                   isVisible={addModalVisible}
                   onSwipeComplete={() => showAddForm()}
                   swipeDirection="down">
                <AddTaskForm showAddForm={this.showAddForm}
                             addTask={this.addTask}/>
            </Modal>
             <View style={styles.addTaskRow}>
                <View styles={styles.textStyle}>
                    <Text style={styles.fontStyle}>
                        Tasks
                    </Text>
                </View>
                <View style={styles.addButtonStyle}>
                    <AddButton showAddForm={this.showAddForm}
                                    addHabit={this.addTask}/>
                </View >
            </View>
            <FlatList
                data = {tasks}
                ListEmptyComponent={this.EmptyView}
                renderItem = {({ item, index }) => <Task item={item} 
                                                         index={index}
                                                         editTask={this.editTask}
                                                         remove={this.remove}
                                                         handleTaskCompletion={this.handleTaskCompletion}/>}   
                //to be used when firebase data comes in
                //keyExtractor={item => item.toString()}
            />
        </View> 

    )
}

const styles = StyleSheet.create({
    addTaskRow:{
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: 'lightgrey',
        width:'100%'
    },
    addButtonStyle: {
        flex: 1,
        alignContent: "flex-end",
        alignItems: "flex-end"
    },
    textStyle:{
        flex:1,
        alignItems:'center'
    },
    fontStyle:{
        fontWeight: 'bold',
        fontSize: 32,
        paddingLeft:'3%'
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
     }
});