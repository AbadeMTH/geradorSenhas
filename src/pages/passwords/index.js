import { useIsFocused } from "@react-navigation/native"
import React, { useEffect, useState } from "react"
import { Alert, FlatList, StyleSheet, Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import useStorage from "../../hooks/useStorage"
import { PasswordItem } from "./components/passwordItem"

export function Passwords() {
  const [listPasswords, setListPasswords] = useState([])
  const focused = useIsFocused()
  const { getItem, removeItem } = useStorage()

  useEffect(() => {
    async function loadPasswords() {
      const passwords = await getItem("@pass")
      if (passwords) {
        setListPasswords(passwords)
      } else {
        setListPasswords([])
      }
    }

    loadPasswords()
  }, [focused])

  async function handleDeletePassword(item) {
    Alert.alert("Deletar senha", "Deseja excluir esta senha?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Sim",
        style: "default",
        onPress: async () => {
          const passwords = await removeItem("@pass", item)
          if (passwords) {
            setListPasswords(passwords)
          } else {
            setListPasswords([])
          }
        },
      },
    ])
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.header}>
        <Text style={styles.title}>Minhas Senhas</Text>
      </View>
      <View style={styles.content}>
        <FlatList
          data={listPasswords}
          keyExtractor={(item) => String(item)}
          renderItem={({ item }) => (
            <PasswordItem
              data={item}
              removePassword={() => handleDeletePassword(item)}
            />
          )}
          style={styles.list}
        />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#392de9",
    paddingTop: 28,
    paddingBottom: 28,
    paddingLeft: 14,
    paddingRight: 14,
    justifyContent: "center",
  },
  title: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "bold",
  },
  content: {
    flex: 1,
    paddingLeft: 14,
    paddingRight: 14,
  },
  list: {
    flex: 1,
    paddingTop: 14,
  },
})
