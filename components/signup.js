import { useState } from "react";
import * as React from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase/firebaseClient";
import { TextField, Button, Text, Colors } from "react-native-ui-lib";
import { KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard,Modal, StyleSheet, View, ScrollView } from "react-native";
import { Picker } from "@react-native-picker/picker";


export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [zip, setZip] = useState("");
  const [city, setCity] = useState("");
  const [username, setUsername] = useState("");
  const [number, setNumber] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const[errorm,setErrorm] = useState("");


  async function signupWithEmail() {
    createUserWithEmailAndPassword(auth, email, password)
      .then((cred) => {
        cred.user.sendEmailVerification();
        db.collection("users")
          .doc(cred.user.uid)
          .set({
            firstName: firstName,
            lastName: lastName,
            age: age,
            zipCode: zip,
            city: city,
            username: username,
            number: number,
            isAdmin: false,
          })
          .then(
            setEmail(""),
            setFirstName(""),
            setLastName(""),
            setPassword(""),
            setAge(""),
            setZip(""),
            setCity(""),
            setUsername(""),
            setNumber(""),
            setModalVisible(true)
          );
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
       setErrorm(errorMessage);
       console.log(errorm)
      });
  }

  return (
    <ScrollView>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.container}
        >
          <Text text30 style={{ color: Colors.text }}>
            Sign up for FANz PLAY!
          </Text>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={{ color: Colors.text }}>
                  Congratulations! Your FANz PLAY account has been created!
                </Text>
                <Button
                  backgroundColor={Colors.text}
                  onPress={() => setModalVisible(!modalVisible)}
                  label={"Go Home!"}
                  enableShadow
                ></Button>
              </View>
            </View>
          </Modal>
          <TextField
            migrate
            underlineColor = "transparent"
            editable={false}
            red50
            value={errorm}>
          </TextField>
          <TextField
            migrate
            value={email}
            style={styles.input}
            enableErrors
            placeholder={"Email"}
            floatingPlaceholder
            onChangeText={(email) => setEmail(email)}
            textContentType="emailAddress"
          />
          <TextField
            migrate
            style={styles.input}
            placeholder={"Password"}
            floatingPlaceholder
            value={password}
            onChangeText={(password) => setPassword(password)}
          />
          <TextField
            migrate
            value={firstName}
            style={styles.input}
            placeholder={"First Name"}
            floatingPlaceholder
            onChangeText={(firstName) => setFirstName(firstName)}
          />
          <TextField
            migrate
            value={lastName}
            style={styles.input}
            placeholder={"Last Name"}
            floatingPlaceholder
            onChangeText={(lastName) => setLastName(lastName)}
          />
          <TextField
            migrate
            value={username}
            style={styles.input}
            placeholder={"Username"}
            floatingPlaceholder
            onChangeText={(username) => setUsername(username)}
          />
          <TextField
            migrate
            value={number}
            style={styles.input}
            placeholder={"Phone Number"}
            floatingPlaceholder
            onChangeText={(number) => setNumber(number)}
            keyboardType="numeric"
          />
          <Text color="white">Age:</Text>
          <Picker
            selectedValue={age}
            style={styles.picker}
            onValueChange={(age, itemIndex) => setAge(age)}
          >
            <Picker.Item color="white" label="1-13" value="1-13" />
            <Picker.Item color="white" label="14-21" value="14-21" />
            <Picker.Item color="white" label="22-35" value="22-35" />
            <Picker.Item color="white" label="36-50" value="36-50" />
            <Picker.Item color="white" label="51-65" value="51-65" />
            <Picker.Item color="white" label="65+" value="65+" />
          </Picker>

          <TextField
            migrate
            value={zip}
            style={styles.input}
            placeholder={"Zip Code"}
            floatingPlaceholder
            onChangeText={(zip) => setZip(zip)}
            keyboardType="numeric"
          />
          <TextField
            migrate
            value={city}
            style={styles.input}
            placeholder={"City"}
            floatingPlaceholder
            onChangeText={(city) => setCity(city)}
          />
          <Button
            onPress={signupWithEmail}
            style={styles.button}
            color='#535546'
            label={"Submit"}
            backgroundColor={Colors.text}
            accessibilityLabel="Learn more about this purple button"
            enableShadow={true}
          />
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  picker: {
    width: 300,
    color: 'white'
  },

  container: {
    flex: 1,
    backgroundColor: "#2e2f33",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    height: 20,
    // margin: 12,
    width: 200,
    color: 'white'
    // borderWidth: 1,
    // padding: 0,
  },
  button: {
    marginBottom: 20
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

Colors.loadColors({
  text: "#cddc29",
});
