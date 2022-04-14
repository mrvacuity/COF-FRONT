import React, { useEffect, useState } from "react";
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
  Modal,
  Alert,
  Share,
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
export default function AboutpHValue({ navigation, route }) {
  return (
    <View style={styles.container}>
      <View style={{ marginTop: Platform.OS === "ios" ? 0 : 30 }} />
      <View style={[styles.viewDetail]}>
        <View style={styles.viewHeader}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack("");
            }}
            style={{ width: "20%" }}
          >
            <Entypo name="chevron-thin-left" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.textTitle}>About pH Value</Text>
          <Text style={{ width: "10%" }}></Text>
        </View>
        <View style ={{
          alignItems: 'center',
        }}>
          <View style={{
            justifyContent: 'center',
            width: '90%',
            marginTop:'0%',
          }}
          >
            <Image
              style={{
                marginTop: '5%',
                marginLeft: '33%',
                width: '35%',
                height: '15%'
              }}
              source={require('../../img/roast.png')} />
            <Text>{'\n'}</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
              <Text style={{ fontFamily: "RobotoBold", fontSize: 16, textAlign: 'justify', }}>The average pH value </Text>
              <Text style={{ fontSize: 16, textAlign: 'justify', }}>is around </Text>
              <Text style={{ fontFamily: "RobotoBold", fontSize: 16, textAlign: 'justify', }}>4.85</Text>
              <Text style={{ fontSize: 16, textAlign: 'justify', }}>to </Text>
              <Text style={{ fontFamily: "RobotoBold", fontSize: 16, textAlign: 'justify', }}>5.10</Text>
            </View>
            <Text style={{ fontSize: 16 }}>{'         '}The longer the beans are roasted, the darker they become. The darker they become, the less acid they contain.</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
              <Text style={{ fontFamily: "RobotoBold", fontSize: 16, textAlign: 'justify', }}>{'      • '}Shorter roasting times</Text>
              <Text style={{ fontSize: 16, }}>{'          '}produce light roast coffee beans, which are the most acidic.</Text>
            </View>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
              <Text style={{ fontFamily: "RobotoBold", fontSize: 16, textAlign: 'justify', }}>{'      • '}Medium roast times</Text>
              <Text style={{ fontSize: 16, }}>{'          '}yield medium roasts with a light brown color and medium levels of acidity.</Text>
            </View>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
              <Text style={{ fontFamily: "RobotoBold", fontSize: 16, textAlign: 'justify', }}>{'      • '}Longer roasting times</Text>
              <Text style={{ fontSize: 16, }}>{'          '}processes produce dark beans, which contain the lowest levels of acid.</Text>
            </View>
            <Text>{'\n'}</Text>
            <View style={{
              flexDirection: 'row', flexWrap: 'wrap',
            }}
            >
              <Text style={{ fontFamily: "RobotoBold", fontSize: 16, }}>Hints</Text>
              <Text style={{ fontSize: 16 }}>{'          '}You can make coffee less acidic by simply adding milk. The calcium in milk neutralizes some of the acids in the coffee. </Text>
            </View>
            <Text style={{ fontSize: 16 }}>{'\n'}pH 4.80 - 4.89 = Very sour</Text>
            <Text style={{ fontSize: 16 }}>pH 4.90 - 5.09 = Sour</Text>
            <Text style={{ fontSize: 16 }}>pH 5.10 - 5.30 = Not too sour</Text>
          </View>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    paddingHorizontal: 12,
  },
  viewDetail: {
    width: "100%",
    minHeight: "100%",
    backgroundColor: "#f0e9e4",
    // backgroundColor: "red",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 25,
  },
  textTitle: {
    fontSize: 18,
    fontFamily: "RobotoBold",
    color: "#484848",
    width: "60%",
    textAlign: "center",
    marginBottom: 10,
  },
  viewHeader: {
    flexDirection: "row",
    paddingHorizontal: 20,
  },
  viewHeader1: {
    flexDirection: "row",
    alignItems: "center",
    width: "20%",
    marginTop: -5,
  },
  textRoboto: {
    fontSize: 12,
    fontFamily: "Roboto",
    color: "#484848",
  },
  textLight: {
    fontSize: 14,
    fontFamily: "RobotoLight",
    color: "#484848",
  },
  textDate: {
    fontSize: 10,
    fontFamily: "Roboto",
    color: "#484848",
  },
  viewComment: {
    width: "100%",
    borderWidth: 0.2,
    padding: 10,
    minHeight: 74,
    marginTop: 12,
    borderRadius: 5,
  },
  viewDate: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  viewInputComment: {
    width: "100%",
    height: 39,
    backgroundColor: "#FFFFFF",
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 13,
  },
  textComment: { fontSize: 16, fontFamily: "Roboto", color: "#484848" },
});
