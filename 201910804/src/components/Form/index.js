import { useState, useEffect } from "react";
import { View, Text, TextInput, Modal, TouchableOpacity } from "react-native";
import {Picker} from "@react-native-picker/picker";
import styles from "../../style";
import Camera from "../Camera";
import * as Location from 'expo-location';

export default function Form() {

    const [selectedCity, setSelectedCity] = useState();
    const [street, setStreet] = useState(null);
    const [houseNumber, setHouseNumber] = useState(null);
    const [description, setDescription] = useState(null);
    const [district, setDistrict] = useState(null);
    const [canOpen, setCanOpen] = useState(false);
    const [congrats, setCongrats] = useState();
    const [location, setLocation] = useState();

    useEffect(() => {
        (async () => {
          let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
          }
    
          let location = await Location.getCurrentPositionAsync({});
          setLocation(location);
        })();
      }, []);

    function openCamera() {
        if (street != null && houseNumber != null && description != null && district != null && selectedCity != "default"){
            setCanOpen(true);
        } else {
            setCanOpen(false);
        }
        
    }

    
    function resetForm() {
        setSelectedCity('default');
        setStreet('');
        setHouseNumber('');
        setDistrict('');
        setDescription('');
    }

    function finalizarNotificacao() {
        getLocation();
        setCanOpen(false);
        resetForm();
        setCongrats('O planeta agradece, gratiluz :D');

        const data = [street, houseNumber, district, description];
        console.log(data);
    }


    async function getLocation() {
    
        let actualLocation = await Location.getCurrentPositionAsync({});
        setLocation(actualLocation.coords);
        console.log(actualLocation.coords);
      }

    return (
        <View>
            <View>
                <Text style={styles.titleTextCongrats}>{congrats}</Text>
                <Text style={styles.titleText}>Informe a cidade:</Text>
                <Picker 
                    style={styles.inputText}
                    selectedValue={selectedCity}
                    onValueChange={(itemValue, itemIndex) =>
                    setSelectedCity(itemValue)
                    }>
                    <Picker.Item label="Selecione uma opção" value="default" />
                    <Picker.Item label="Barra do Pirai" value="barra do pirai" />
                    <Picker.Item label="Mendes" value="mendes" />
                    <Picker.Item label="Paraiba do Sul" value="paraiba do sul" />
                    <Picker.Item label="Rio das Flores" value="rio das flores"/>
                    <Picker.Item label="Tres Rios" value="tres rios" />
                    <Picker.Item label="Vassouras" value="vassouras" />
                    <Picker.Item label="Valença" value="valenca" />

                </Picker>
                
                <Text style={styles.titleText}>Informe o bairro:</Text>
                <TextInput value={district} style={styles.inputText} onChangeText={setDistrict}/>

                <Text style={styles.titleText}>Informe a rua:</Text>
                <TextInput value={street} style={styles.inputText} onChangeText={setStreet}/>

                <Text style={styles.titleText}>Informe o numero:</Text>
                <TextInput value={houseNumber} style={styles.inputText} onChangeText={setHouseNumber}/>

                <Text style={styles.titleText}>Informe a descrição:</Text>
                <TextInput value={description} style={styles.inputTextDescription} onChangeText={setDescription}/>

                <TouchableOpacity style={styles.button} onPress={ () => openCamera()}>
                    <Text> Notificar </Text>
                </TouchableOpacity>
            </View>
            <View>
                <Modal transparent={true} visible={canOpen}>
                    <Camera
                        finalizarNotificacao={finalizarNotificacao}/>
                </Modal>
            </View>
        </View>
    )
}

  