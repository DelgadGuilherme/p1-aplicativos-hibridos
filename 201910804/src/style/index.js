import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    titleText:{
        fontSize: 24,
        color: "#B20600",
        fontWeight: "bold",
    },
    titleTextCongrats:{
      fontSize: 50,
      color: "#B20600",
      fontWeight: "bold",
  },
    inputText: {
        borderRadius: 20,
        fontSize: 18,
        fontWeight: "bold",
        backgroundColor: "#fff",
        color: "#FF5F00",
        margin: 7,
        padding: 7,
    },
    inputTextDescription: {
      borderRadius: 20,
      fontSize: 18,
      fontWeight: "bold",
      backgroundColor: "#fff",
      color: "#FF5F00",
      margin: 7,
      padding: 7,
      height: 100,
  },
    button: {
        margin: 10,
        backgroundColor: "#FF5F00",
        alignItems: "center",
        padding: 10,
        borderRadius: 40,
    },
      buttonFlip: {
        position: "absolute",
        bottom: 50,
        left: 30,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FF5F00",
        margin: 20,
        width: 50,
        height: 50,
        borderRadius: 50,
      },
      contentPhoto: {
        flex: 1,
        margin: 10,
      },
});

export default styles;