import React from 'react';
import {
    Text,
    View,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native'
import http from '../../components/http';
import { AuthContext } from "../../config/context";
import AsyncStorage from '@react-native-async-storage/async-storage'
import { authStyle } from "../../components/styles";

const saveStorage = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, value)
    } catch (e) {
        console.log(e);
    }
}

export default function login({ navigation }) {
    const [isSubmiting, setIsSubmiting] = React.useState(false);
    const [isError, setIsError] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState('');
    const { signIn } = React.useContext(AuthContext);
    const [form, setForm] = React.useState({
        username: '',
        password: ''
    });

    const setInput = (key, val) => {
        setForm({ ...form, [key]: val })
    }

    const signin = () => {
        setIsSubmiting(true)
        http.post('auth/signin', {
            username: form.username,
            password: form.password
        })
            .then(async (response) => {
                console.log(response);
                saveStorage('token', response.data.accessToken);
                saveStorage('id', response.data.id.toString());
                setIsSubmiting(false)
                setIsError(false)
                signIn();
            })
            .catch(function (response, error) {
                setIsSubmiting(false)
                setIsError(true)
                setErrorMessage('Kombinasi Username & Password Salah')
                console.log(response);
            });
    }

    return (
        <View style={authStyle.container}>
            {isError ?
                <View style={authStyle.Message}>
                    <Text>{errorMessage}</Text>
                </View>
                : <Text />
            }
            <View style={authStyle.inputContainer}>
                <Text>Username</Text>
                <TextInput
                    style={authStyle.input}
                    onChangeText={username => { setIsError(false), setInput('username', username) }}
                    defaultValue={form.username}
                />
            </View>
            <View style={authStyle.inputContainer}>
                <Text>Password</Text>
                <TextInput
                    style={authStyle.input}
                    onChangeText={password => { setIsError(false), setInput('password', password) }}
                    defaultValue={form.password}
                    secureTextEntry={true}
                />
            </View>
            <View style={authStyle.buttonContainer}>
                <TouchableOpacity style={[authStyle.button, { backgroundColor: '#b7a996' }]} onPress={() => navigation.push('signUp')}>
                    <Text style={{ color: '#573b30' }}>Daftar</Text>
                </TouchableOpacity>
                {isSubmiting ?
                    <View style={[authStyle.button, { backgroundColor: '#573b30' }]}>
                        <ActivityIndicator size="large" color="#b7a996" />
                    </View>
                    :
                    <TouchableOpacity style={[authStyle.button, { backgroundColor: '#573b30' }]} onPress={() => signin()}>
                        <Text style={{ color: '#b7a996' }}>Masuk</Text>
                    </TouchableOpacity>
                }
            </View>
        </View>
    )
}
