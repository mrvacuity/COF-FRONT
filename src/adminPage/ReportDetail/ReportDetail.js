import React, { useState } from "react";
import {
    View,
    Text,
    SafeAreaView,
    StyleSheet,
    TouchableOpacity,
} from "react-native";
import {
    Entypo,
    Feather,
} from "@expo/vector-icons";

export default function ReportDetail({ navigation, route }) {
    const [data,setData] = useState(route.params);
    return (
      <View style={styles.container}>
        <SafeAreaView />
        <View style={{ marginTop: Platform.OS === "ios" ? 0 : 30 }} />

        <View style={[styles.viewDetail]}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingHorizontal: 29,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                navigation.goBack("");
              }}
              style={{ width: "10%" }}
            >
              <Entypo name="chevron-thin-left" size={24} color="#484848" />
            </TouchableOpacity>
            <Text style={styles.textTitle}>Report Detail</Text>

            <TouchableOpacity
              style={{ width: "10%", alignItems: "flex-end" }}
              onPress={() => {
                setToken("");
                navigation.navigate("Login");
              }}
            >
              <Feather name="log-out" size={24} color="#484848" />
            </TouchableOpacity>
          </View>
          <Text style={[styles.textSubject,]}>UserID: {data.uid}</Text>
          <Text style={styles.textSubject} >Title: {data.title}</Text>
          <Text style={styles.textSubject} >Description: {data.description}</Text>
        </View>
      </View>
    );
  }
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#FFF",
      paddingHorizontal: 12,
    },
    viewDetail: {
      width: "100%",
      height: "100%",
      backgroundColor: "#f0e9e4",
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      paddingVertical: 25,
      paddingHorizontal: 25,
    },
    textTitle: {
      fontSize: 18,
      fontFamily: "RobotoBold",
      color: "#484848",
      alignSelf: "center",
      textAlign: "center",
      marginBottom: 10,
    },
    button: {
      width: "100%",
      height: 65,
      borderWidth: 0.4,
      borderColor: "#484848",
      justifyContent: "center",
      paddingHorizontal: 22,
      borderRadius: 5,
      marginTop: 24,
    },
    textSubject: {
      fontSize: 18,
      fontFamily: "Roboto",
      color: "#484848",
    },
  });
