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
  Platform
} from "react-native";
import {
  Ionicons
} from "@expo/vector-icons";
import Unorderedlist from "react-native-unordered-list";
import { useRecoilState, useRecoilValue } from "recoil";
import axios from "axios";
import { tokenState } from "../../recoil/recoil";
import { apiservice } from "../../service/api";
import { useIsFocused } from "@react-navigation/native";
import { Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
// import { Platform } from "react-native-web";
const { width, height } = Dimensions.get("screen");
export default function Home({ navigation }) {
  const [token, setToken] = useRecoilState(tokenState);

  const [data, setData] = useState([]);
  const [score, setScore] = useState([]);

  const [userData, setUserData] = useState();
  const isfocused = useIsFocused();
  useEffect(() => {
    if (isfocused) {
      getLesson();
      getProfile();
      getScore(token);
    }
  }, [isfocused]);

  const getLesson = async () => {
    // const res = await apiservice({
    //   path: "/lesson/getalllesson",
    //   method: "get",
    // });
    const res = await axios({
      method: "get",
      url: "http://165.22.251.6:5000/api/lesson/getalllesson",
      headers: {
        "Content-Type": "application/json",
      }
    });

    if (res.status == 200) {
      setData(res.data);
    } else {
    }
  };

  const getScore = async () => {
    const res = await apiservice({
      path: "/lesson/score",
      method: "get",
      token: token.accessToken,
    });

    if (res.status == 200) {
      setScore(res.data);
    }
  };
  const getProfile = async () => {
    const res = await apiservice({
      path: "/authen/user",
      method: "get",
      token: token.accessToken,
    });

    if (res.status == 200) {
      setUserData(res.data.result);
    } else {
    }
  };

  if (userData == undefined) {
    return <View></View>;
  }

  if (score == undefined) {
    return <View></View>;
  }
  return (
    <View style={styles.container}>
      <SafeAreaView>
        <View style={{ marginTop: Platform.OS === "ios" ? 0 : 30 }} />
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            width: "100%",
            minHeight: "100%",
            backgroundColor: "#f0e9e4",
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
          }}
        >
          <View style={[styles.viewDetail]}>
            <View style={{ paddingHorizontal: 29 }}>
              <View style={[styles.viewHeader]}>
                {/* <Text style={
                  {width:'10%'}
                }>
                </Text> */}
                <TouchableOpacity
                  onPress={() => {
                    // setModalVisible(true);
                    navigation.navigate("HomeGuide");
                  }}
                >
                  <Ionicons name="alert-circle-outline" size={24} color="black" />
                </TouchableOpacity>
                <Text
                  style={[styles.textBold, { fontSize: 18, alignSelf: "center" }]}
                >
                  HOME
                </Text>
                <Text style={
                  { width: '10%' }
                }>
                </Text>
              </View>
              <Text
                style={[styles.textRegular, { marginTop: 35, marginBottom: 8 }]}
              >
                {"Welcome, " + userData.first_name + "!"}
              </Text>
              <Text style={styles.textLight}>
                Good Ideas Start With Great Coffee
              </Text>
              <Text style={[styles.textBold, { fontSize: 18, marginTop: 12 }]}>
                Lesson
              </Text>
            </View>

            <FlatList
              numColumns={1}
              style={{ marginBottom: Platform.OS == 'android' ? height * 0.1 : 20, }}
              data={data}
              extraData={score}
              renderItem={({ item, index }) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("Pretest", item);
                    }}
                    style={[styles.viewHistory,
                    {
                      backgroundColor: "#FBF9F8",
                      borderRadius: 10,
                      borderColor: "#FBF9F8",
                      width: "92%"
                    }]}
                  >
                    <View style={{ width: "65%" }}>
                      <Text style={styles.textRegular}>{item.title}</Text>
                      <View style={{
                        justifyContent: "center",
                        width: '90%',
                        // alignSelf: 'center',
                      }}>
                        <Text style={[{
                          textAlign: 'left',
                          marginTop: 10,
                          marginBottom: 10,
                          fontFamily: "Roboto",
                          fontSize: 12,
                          color: "#888888",
                          textAlign: 'justify',
                        }
                        ]}>{item.description}</Text>
                      </View>

                      <Text
                        style={[
                          styles.textLight,
                          { fontSize: 13, color: "#484848" },
                        ]}
                      >
                        Pre-test:{"  "}
                        {score.filter((items) => {
                          return (
                            items.lesson_id == item.id &&
                            items.Type == "PRETEST"
                          );
                        })[0]?.score == undefined
                          ? "-"
                          : score.filter((items) => {
                            return (
                              items.lesson_id == item.id &&
                              items.Type == "PRETEST"
                            );
                          })[0]?.score + " %"}
                      </Text>
                      <Text
                        style={[
                          styles.textLight,
                          { fontSize: 13, color: "#484848" },
                        ]}
                      >
                        Post-test:{" "}
                        {score.filter((items) => {
                          return (
                            items.lesson_id == item.id &&
                            items.Type == "POSTTEST"
                          );
                        })[0]?.score == undefined
                          ? "-"
                          : score.filter((items) => {
                            return (
                              items.lesson_id == item.id &&
                              items.Type == "POSTTEST"
                            );
                          }).sort((a, b) => b.score - a.score)[0]?.score + " %"}
                      </Text>
                    </View>

                    <View style={styles.viewImgHistorty}>
                      <Image
                        style={{ width: 100, height: 100 }}
                        source={{
                          uri:
                            "http://165.22.251.6:5000/api/image/getimage/" +
                            item.image_url,
                        }}
                      />
                    </View>
                  </TouchableOpacity>
                );
              }}
            />

          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 12,
  },
  viewHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    // paddingHorizontal: 29,
    alignItems: "center",
  },
  viewDetail: {
    width: "100%",
    height: "100%",
    backgroundColor: "#f0e9e4",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 25,
  },
  textBold: { fontFamily: "RobotoBold", color: "#484848" },
  textRegular: { fontFamily: "Roboto", color: "#484848", fontSize: 18 },
  textLight: { fontSize: 15, fontFamily: "RobotoLight", color: "#888888" },
  buttonLesson: {
    width: 60,
    height: 60,
    backgroundColor: "#FFFFFF",
    borderRadius: 5,
    alignItems: "center",

    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  viewHistory: {
    width: "95%",
    borderWidth: 0.6,
    borderColor: "#484848",
    flexDirection: "row",
    minHeight: 154,
    marginTop: 12,
    paddingTop: 25,
    paddingBottom: 6,
    alignSelf: "center",
    borderRadius: 5,
    paddingLeft: 22,
  },
  viewImgHistorty: { width: "30%", alignItems: "flex-end", paddingTop: 5 },
});
