import React, { Component, useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert, Image, TouchableHighlight } from 'react-native';
import { Container, Header, Title, Content, Card, CardItem, Body, Left, Right, CheckBox } from "native-base";
import Modal from 'react-native-modal'
import Habit from '../components/Habit'
import AddButton from '../components/buttons/AddButton'
import habitData from '../sample_habit_data.json'
import AddHabitForm from '../screens/AddHabitPage'
import EditHabitForm from '../screens/EditHabitPage'
import CompHabitForm from '../screens/CompleteHabitPage'
import { removesHabit, removesHabitModel } from '../../model/dbModel';
import { right } from 'inquirer/lib/utils/readline';
const {saveHabitModel, pullHabitDataModel, editsHabitModel, completeHabitModel} = require('../../model/dbModel.js');

export default function HabitPage() {

    const [habits, setHabits] = useState([])
    const [addModalVisible, setAddModalVisible] = useState(false)

    //add habits
    addHabit = (title, description) => {   
        saveHabitModel(title, description)
        pullHabitDataModel(setData)
    }

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
        setHabits(arr)
    }
    
    //On app startup, pull the data from db and sort it based on completion
    useEffect(() => {
        pullHabitDataModel(setData)
        let tmpHabits = habits.slice()
        tmpHabits.sort((a,b) => {return a.completed - b.completed})
        setHabits(tmpHabits)
    }, [])

    //update completion and streaks
    handleHabitCompletion = (key, streak, complete) => {
        completeHabitModel(key, streak, complete, setData)
    }

    //remove habit
    remove = (key) => {
        //call to model
        removesHabitModel(key, setData)
    }

    showAddForm = () => setAddModalVisible(prev => !prev);

    //edit habit
    editHabit = (key, title, description, frequency) => {
        editsHabitModel(key, title, description, frequency)
        pullHabitDataModel(setData)
    }

    EmptyView = () => {
        return(
            <View>
                <Text>
                    There are no habits. Click the "plus" button to add a new habit!
                </Text>
            </View>
        )
    }
     

    return(
        <View style={styles.container}> 
            <Modal style={{margin:0, marginTop:60, backgroundColor:"#FFF"}}
                   isVisible={addModalVisible}
                   onSwipeComplete={() => showAddForm()}
                   swipeDirection="down">
                <AddHabitForm showAddForm={this.showAddForm}
                              addHabit={this.addHabit}/>
            </Modal>

            <View style={styles.addTaskRow}>
                <View styles={styles.textStyle}>
                    <Text style={styles.fontStyle}>
                        Habits
                    </Text>
                </View>
                <View style={styles.addButtonStyle}>
                    <AddButton showAddForm={this.showAddForm}
                                    addHabit={this.addHabit}/>
                </View >
            </View>
            
            <FlatList
                data = {habits}
                ListEmptyComponent={this.EmptyView}
                renderItem = {({ item, index }) => <Habit item={item}
                                                          index={index}
                                                          editHabit={this.editHabit}
                                                          remove={this.remove}
                                                          handleHabitCompletion={this.handleHabitCompletion}/>}   
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