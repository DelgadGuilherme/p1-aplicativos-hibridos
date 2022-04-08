import { useState, useEffect, useRef } from "react";
import { View, Text, Image, Modal, TouchableOpacity } from "react-native";
import { Camera } from 'expo-camera';
import { StyleSheet } from "react-native";

export default function camera(props) {
    const ref = useRef(null);
    const [picture, setPicture] = useState();
    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  async function take() {
    const data = await ref.current.takePictureAsync();
    console.log(data.uri);
    setPicture(data.uri);
    setIsOpen(true);
    }

 function finalizar() {
     console.log(picture);
     props.finalizarNotificacao();
 }

  return (
    <View style={styles.container}>
        <View style={styles.container}>
            <Camera style={styles.camera} type={type} ref={ref}>
                <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => { take() }}>
                    <Text style={styles.text}> Take </Text>
                </TouchableOpacity>
                </View>
            </Camera>
        </View>
        <Modal transparent={true} visible={isOpen}>
            <Image style={styles.img} source={{ uri: picture }} />
            <TouchableOpacity style={styles.buttonImgRep} onPress={setIsOpen}>
                <Text style={styles.text}>Rep</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonImgOk} onPress={finalizar}>
                <Text style={styles.text}>Ok</Text>
            </TouchableOpacity>
        </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    camera: {
      flex: 1,
    },
    buttonContainer: {
      flex: 1,
      backgroundColor: 'transparent',
      flexDirection: 'row',
      margin: 20,
    },
    button: {
        position: "absolute",
        bottom: 50,
        left: 130,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FF5F00",
        margin: 20,
        width: 50,
        height: 50,
        borderRadius: 50,
    },
    buttonImgRep: {
        position: "absolute",
        bottom: 150,
        left: 130,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FF5F00",
        margin: 20,
        width: 50,
        height: 50,
        borderRadius: 50,
    },
    buttonImgOk: {
        position: "absolute",
        bottom: 150,
        right: 130,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FF5F00",
        margin: 20,
        width: 50,
        height: 50,
        borderRadius: 50,
    },
    text: {
      fontSize: 18,
      color: 'white',
    },
    img: {
        width: "100%",
        height: "80%"
      },
  });
  