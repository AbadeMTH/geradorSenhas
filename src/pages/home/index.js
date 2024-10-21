import Slider from "@react-native-community/slider"
import React, { useState } from "react"
import { Image, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { ModalPassword } from "../../components/modal"

let charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789*#"

export function Home() {
  const [size, setSize] = useState(10)
  const [passwordValue, setPasswordValue] = useState("")
  const [modalVisible, setModalVisible] = useState(false)

  function generatePassword() {
    let tempPassword = ""
    for (let i = 0; i < size; i++) {
      tempPassword += charset.charAt(Math.floor(Math.random() * charset.length))
    }
    setPasswordValue(tempPassword)
    setModalVisible(true)
  }

  return (
    <View style={styles.container}>
      <Image source={require("../../assets/logo.png")} style={styles.logo} />

      <Text style={styles.title}>{size} caracteres</Text>
      <View style={styles.areaSlider}>
        <Slider
          style={styles.slider}
          minimumValue={6}
          minimumTrackTintColor="#000"
          maximumValue={20}
          maximumTrackTintColor="#ff0000"
          thumbTintColor="#392de9"
          value={size}
          onValueChange={(value) => setSize(value.toFixed(0))}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={generatePassword}>
        <Text style={styles.buttonText}>Gerar Senha</Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} animationType="fade" transparent={true}>
        <ModalPassword password={passwordValue} handleClose={() => setModalVisible(false)}/>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F3FF",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    marginBottom: 48,
  },
  areaSlider: {
    marginTop: 14,
    marginBottom: 14,
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 8,
  },
  slider: {
    height: 40,
  },
  button: {
    backgroundColor: "#392de9",
    width: "80%",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    marginBottom: 18,
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
  },
})
