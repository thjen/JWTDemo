import React, {Component} from "react";
import {View, Text, StyleSheet, TextInput, TouchableOpacity} from "react-native";

export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            pass: "",
            result: "...",
            token: "...",
        }
    }

    login() {
        fetch("http://192.168.1.9/JWT/RnDemo/createToken.php", {
            method: "POST",
            header: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "Username": this.state.username,
                "Password": this.state.pass
            })
        })
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({
                result: responseJson.token
            })
        })
        .catch((error) => {
            console.log(error);
        });
    }

    render() {
        return (
            <View style = {styles.wrapper}>
                <View style = {styles.box}>
                    <Text>Login form</Text>
                </View>
                <View style = {styles.box}>
                    <TextInput
                        style = {{
                            height: 40,
                            width: 200,
                            borderColor: "gray",
                            borderWidth: 1,
                        }}
                        onChangeText = {(uninput) => this.setState({username: uninput})}
                        placeholder = "Username"
                        value = {this.state.username}>
                    </TextInput>
                </View>
                <View style = {styles.box}>
                    <TextInput
                        style = {{
                            height: 40,
                            width: 200,
                            borderColor: "gray",
                            borderWidth: 1,
                        }}
                        onChangeText = {(passinput) => this.setState({pass: passinput})}
                        placeholder = "Password"
                        value = {this.state.pass}>
                    </TextInput>
                </View>
                <View style = {styles.box}>
                    <TouchableOpacity
                        onPress = {() => this.login()}
                        style = {{flex: 1, alignItems: "center", justifyContent: "center"}}>
                        <Text>Login</Text>
                    </TouchableOpacity>
                </View>
                <View style = {styles.box3}>
                    <Text>{this.state.result}</Text>
                    <Text>{this.state.token}</Text>
                </View>
            </View>
        );
    }
}

var styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: "yellow",
        padding: 50,
    },
    box: {
        flex: 1,
       
        alignItems: "center",
        justifyContent: "center",
    },
    box3: {
        flex: 3,
        borderWidth: 1,
        alignItems: "center",
        justifyContent: "center",
    },
});