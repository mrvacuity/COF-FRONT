import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  Dimensions,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from "react-native";
import {
  MaterialCommunityIcons,
  Entypo,
  FontAwesome,
  MaterialIcons,
  Feather,
  AntDesign,
  FontAwesome5,
  Ionicons,
  EvilIcons,
} from "@expo/vector-icons";
const { width, height } = Dimensions.get("screen");
import { useRecoilState, useRecoilValue } from "recoil";
import { tokenState } from "../../recoil/recoil";
import { apiservice } from "../../service/api";
import { useIsFocused } from "@react-navigation/native";
// import { apiservice } from "../service/api";


export default function ReportList({ navigation }) {
  const [token, setToken] = useRecoilState(tokenState);
  const [data,setData] = useState(null);
  const focus = useIsFocused();

  const getReport = async () => {
    const res = await apiservice({
      path: "/lesson/allreport",
      method: "get",
      token: token.accessToken,
    });
    if (res.status == 200) {
      setData(res.data);
    }
  };
  useEffect(() => {
    if (focus) {
        getReport()
    }
  }, [focus]);
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
          <Text style={styles.textTitle}>Report</Text>

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

        <FlatList
          numColumns={1}
          style={{ marginBottom: 20 }}
          data={data.sort((a, b) => b.id - a.id)}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity
                style={[styles.button]}
                onPress={() => {
                  navigation.navigate("ReportDetail", item);
                }}
              >
                <Text style={[styles.textSubject,]}>UserID: {item.uid}</Text>
                <Text style={styles.textSubject} numberOfLines={1} >Title: {item.title}</Text>
              </TouchableOpacity>
            );
          }}
        />
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
