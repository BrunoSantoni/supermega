import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Constants from "expo-constants";
import * as ImagePicker from "expo-image-picker";
import Lottie from "lottie-react-native";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Image,
  ImageBackground,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import error from "../../../assets/animations/error.json";
import success from "../../../assets/animations/success.json";
import background from "../../../assets/img/background.jpg";
import api from "../../services/api";
import InputMask from "../../utils/inputMask";
import styles from "./styles";

export default function RegisterScreen() {
  const navigation = useNavigation();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [senha, setSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [confirmSenha, setConfirmSenha] = useState("");
  const [mostrarSenha2, setMostrarSenha2] = useState(false);
  const [foto, setFoto] = useState(null);
  const [submit, setSubmit] = useState(false);

  const getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        alert("Desculpe, você precisa permitir o acesso para continuar!");
      }
    }
  };

  useEffect(() => {
    getPermissionAsync();
  }, []);

  const handleImg = async () => {
    try {
      let res = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        base64: true,
      });
      if (!res.cancelled) {
        setFoto(res);
      }
    } catch (E) {
      alert(E);
    }
  };

  async function handleRegister() {
    if (senha === confirmSenha) {
      const data = new FormData();

      data.append("user_name", nome);
      data.append("user_mail", email);
      data.append("user_cpf", cpf);
      data.append("user_password", senha);
      data.append("user_picture", `data:image/jpeg;base64,${foto.base64}`);

      try {
        await api.post("usercadastro", data);
      } catch (err) {
        Alert.alert(err);
      }
      setSubmit(true);
      setTimeout(() => navigation.navigate("Login"), 1000);
    } else {
      Alert.alert("Ops", "Senhas não conferem");
    }
  }

  if (!submit) {
    return (
      <>
        <ImageBackground source={background} style={styles.background} />

        <KeyboardAwareScrollView contentContainerStyle={styles.container}>
          {foto ? (
            <Image
              source={{ uri: foto.uri }}
              style={styles.pic}
              onPress={handleImg}
            />
          ) : (
            <TouchableOpacity
              title="Selecione uma imagem"
              onPress={handleImg}
              style={styles.selectPic}
            >
              <FontAwesome5 name={"user-circle"} size={40} color={"#171D24"} />
              <Text style={styles.textStyle}>Foto de perfil</Text>
            </TouchableOpacity>
          )}

          <View style={styles.inputSection}>
            <FontAwesome5
              name="user"
              size={20}
              color="#FFF"
              style={styles.inputIcon}
            />
            <TextInput
              value={nome}
              onChangeText={(texto) => setNome(texto)}
              placeholder="Qual é o seu nome?"
              placeholderTextColor="#A9A9A9"
              style={styles.input}
            />
          </View>

          <View style={styles.inputSection}>
            <FontAwesome5
              name="at"
              size={20}
              color="#FFF"
              style={styles.inputIcon}
            />
            <TextInput
              value={email}
              onChangeText={(texto) => setEmail(texto)}
              placeholder="Digite o seu melhor e-mail"
              placeholderTextColor="#A9A9A9"
              keyboardType="email-address"
              style={styles.input}
            />
          </View>

          <View style={styles.inputSection}>
            <FontAwesome5
              name="address-card"
              size={20}
              color="#FFF"
              style={styles.inputIcon}
            />
            <TextInput
              value={cpf}
              onChangeText={(texto) => {
                setCpf(InputMask.cpf(texto));
              }}
              placeholder="Informe o seu CPF"
              placeholderTextColor="#A9A9A9"
              keyboardType="numeric"
              maxLength={14}
              style={styles.input}
            />
          </View>

          <View style={styles.inputSection}>
            <FontAwesome5
              name="key"
              size={20}
              color="#FFF"
              style={styles.inputIcon}
            />
            <TextInput
              value={senha}
              onChangeText={(texto) => setSenha(texto)}
              placeholder="Crie uma senha infalível!"
              placeholderTextColor="#A9A9A9"
              secureTextEntry={!mostrarSenha}
              style={styles.input}
            />
            <TouchableOpacity
              onPress={() => setMostrarSenha(!mostrarSenha)}
              style={styles.inputRightIcon}
            >
              {mostrarSenha ? (
                <FontAwesome5 name="eye-slash" size={20} color="#FFF" />
              ) : (
                <FontAwesome5 name="eye" size={20} color="#FFF" />
              )}
            </TouchableOpacity>
          </View>

          <View style={styles.inputSection}>
            <FontAwesome5
              name="key"
              size={20}
              color="#FFF"
              style={styles.inputIcon}
            />
            <TextInput
              value={confirmSenha}
              onChangeText={(texto) => setConfirmSenha(texto)}
              placeholder="Confirme a senha"
              placeholderTextColor="#A9A9A9"
              secureTextEntry={!mostrarSenha2}
              style={styles.input}
            />
            <TouchableOpacity
              onPress={() => setMostrarSenha2(!mostrarSenha2)}
              style={styles.inputRightIcon}
            >
              {mostrarSenha2 ? (
                <FontAwesome5 name="eye-slash" size={20} color="#FFF" />
              ) : (
                <FontAwesome5 name="eye" size={20} color="#FFF" />
              )}
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={handleRegister}
            style={styles.confirmButton}
          >
            <FontAwesome5 name="arrow-right" size={18} color="#FFF" />
          </TouchableOpacity>
        </KeyboardAwareScrollView>
      </>
    );
  } else if (submit) {
    return (
      <View style={styles.container}>
        <ImageBackground source={background} style={styles.background} />
        <Lottie source={success} autoPlay />
      </View>
    );
  } else {
    return (
      <View>
        <ImageBackground source={background} style={styles.background} />
        <Lottie source={error} autoPlay />
      </View>
    );
  }
}
