import React, { useState } from "react";
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
  Platform,
} from "react-native";
import {
  MaterialCommunityIcons,
  Entypo,
  FontAwesome,
  MaterialIcons,
} from "@expo/vector-icons";
const { width, height } = Dimensions.get("screen");
import YoutubePlayer from "react-native-youtube-iframe";
export default function Lesson({ navigation, route }) {
  //const [page, setPage] = useState(1);
  const [testLight, setTestLight] = useState(false);
  const [testMedium, setTestMedium] = useState(false);
  const [testDark, setTestDark] = useState(false);
  const data = route.params.lesson;
  const data1 = route.params;
  const [tab, setTab] = useState(0);

  if (data == null) {
    return null;
  }
  return (
    <View style={styles.container}>
      <SafeAreaView />
      <View style={{ marginTop: Platform.OS === "ios" ? 0 : 30 }} />
      <ScrollView
        style={{
          minHeight: "100%",
          backgroundColor: "#f0e9e4",
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
        }}
      >
        <View style={[styles.viewDetail]}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingLeft: 29,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("MyTabs");
              }}
              style={{ width: "10%" }}
            >
              <Entypo name="chevron-thin-left" size={24} color="black" />
            </TouchableOpacity>
            <Text style={styles.textTitle}>{data1.title}</Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("TestHistory");
              }}
            >
              <MaterialCommunityIcons
                name="clock-time-four-outline"
                size={26}
                color="#484848"
              />
            </TouchableOpacity>
          </View>
          <View>
            <FlatList
              style={{}}
              data={data.sort((a, b) => a.id - b.id)}
              horizontal
              renderItem={({ item, index }) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      // console.log(index)
                      setTab(index);
                    }}
                    style={[
                      styles.selectPage2,
                      {
                        backgroundColor: (index == tab) ? "#FFFF" : (index % 2 == 0) ? "#E6E6E6" : "#DCDCDC",
                      },
                    ]}
                  >
                    <Text style={[styles.textLight, { textAlign: "center" }]}>
                      {item.title}
                    </Text>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
          <View style={styles.viewPage}>
            <View
              style={{
                flexDirection: "row",
                width: "120%",
                justifyContent: "space-between",
              }}
            >
              <Text style={{ fontSize: 18, fontFamily: "RobotoBold" }}>
                {data[tab].title}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Test", route.params);
                }}
                style={styles.buttonTest}
              >
                <Text style={styles.textLight}>{"Let's Test!"}</Text>
              </TouchableOpacity>
            </View>
            {data[tab].image_url.img != null && data[tab].image_url.img != "" && (
              <Image
                resizeMode="stretch"
                style={[styles.viewImgCoffee,]}
                source={{
                  uri:
                    "http://165.22.251.6:5000/api/image/getimage/" +
                    data[tab].image_url.img,
                }}
              />
            )}
            <Text style={styles.textLight}>{data[tab].description}</Text>
            {data[tab].video_url != "" && (
              <View style={{ marginTop: 10 }}>
                <YoutubePlayer
                  height={200}
                  play={false}
                  videoId={data[tab].video_url}
                />
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
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
    paddingRight: 29,
  },
  textTitle: {
    fontSize: 18,
    fontFamily: "Roboto",
    color: "#484848",
    width: "30%",
    textAlign: "center",
    marginBottom: 10,
  },
  textLight: {
    fontSize: 14,
    fontFamily: "RobotoLight",
    color: "#484848",
  },
  selextPage1: {
    width: 93,
    height: 39,
    borderTopRightRadius: 50,
    justifyContent: "center",
    paddingLeft: 20,
    zIndex: 5,
  },
  selectPage2: {
    width: 83,
    height: 39,
    borderTopRightRadius: 10,
    // borderTopLeftRadius: 10,

    justifyContent: "center",
    alignItems: "center",
    borderRightWidth: 0.2,
    // borderWidth: 0.2,
    // borderBottomWidth: 0,
    // borderLeftWidth: 0.2,
    zIndex: 4,
  },
  viewPage: {
    backgroundColor: "#FFFFFF",
    width: "100%",
    height: "100%",
    borderTopRightRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 19,
  },
  viewImgCoffee: {
    width: "100%",
    height: 300,
    backgroundColor: "#E5E5E5",
    borderRadius: Platform.OS == 'android' ? 0 : 20,
    marginVertical: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  text15: { fontSize: 15, fontFamily: "Roboto", color: "#484848" },
  buttonVideo: {
    backgroundColor: "#E0DAD6",
    width: "100%",
    height: 33,
    borderRadius: 5,
    marginVertical: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonTest: {
    width: '27%',
    height: 32,
    borderWidth: 0.2,
    borderTopLeftRadius: 50,
    borderBottomLeftRadius: 50,
    paddingLeft: 10,
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
  },
});
