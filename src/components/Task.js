import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert, Image } from 'react-native';
import { Container, Card, CardItem, Body, Left, Right, IconNB, Footer, CheckBox } from "native-base";
import EditButton from './buttons/EditButton'

export default function Task(props) {
    return(
        <Card style={props.item.completed ? {opacity:0.5} : {}}
              key={props.item.key.toString()}>
            <CardItem header key={(props.item.key + 100).toString()} style={{ height: 55 }}>
                <Body>
                    <Text style={{fontWeight:"bold", fontSize:20}}>{props.item.name}</Text>
                </Body>
                <Right>
                    <CheckBox style = {{marginRight:11}}
                              onPress={() => props.handleCheck(props.index)}
                              checked={props.item.completed} />
                </Right>
            </CardItem>
            <CardItem key={(props.item.key + 1000).toString()} style={{ height: 43 }}>
                <Body>
                    <Text>{props.item.description}</Text>
                </Body>
                <Right>
                    <EditButton handleEdit={props.item.completed? ()=>{} : props.showEditForm}/>
                </Right>
            </CardItem>
        </Card>
    )
}