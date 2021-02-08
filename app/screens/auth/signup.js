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
import { authStyle } from "../../components/styles";
export default function signup({ navigation }) {
    const [isSubmiting, setIsSubmiting] = React.useState(false);
    const [isError, setIsError] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState('');
    const [username, setUsername] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const signup = () => {
        setIsSubmiting(true)
        if (username != '' || email != '' || password != '') {
            http.post('auth/signup', {
                username: username,
                email: email,
                password: password
            })
                .then(async (response) => {
                    console.log(response);
                    setIsSubmiting(false)
                    setIsError(true)
                    setErrorMessage(response.data.message)
                    setTimeout(() => { setIsError(false), navigation.push('signIn') }, 2000);
                })
                .catch(function (response, error) {
                    setIsSubmiting(false)
                    setIsError(true)
                    setErrorMessage('Terjadi Kesalahan')
                    console.log(response);
                });
        } else {
            setIsSubmiting(false)
            setIsError(true)
            setErrorMessage('ada data yang belum anda masukkan')
        }
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
                    onChangeText={username => { setUsername(username), setIsError(false) }}
                    defaultValue={username}
                />
            </View>
            <View style={authStyle.inputContainer}>
                <Text>Email</Text>
                <TextInput
                    style={authStyle.input}
                    onChangeText={email => { setEmail(email), setIsError(false) }}
                    defaultValue={email}
                />
            </View>
            <View style={authStyle.inputContainer}>
                <Text>Password</Text>
                <TextInput
                    style={authStyle.input}
                    onChangeText={password => { setPassword(password), setIsError(false) }}
                    defaultValue={password}
                    secureTextEntry={true}
                />
            </View>
            <View style={authStyle.buttonContainer}>
                <TouchableOpacity style={[authStyle.button, { backgroundColor: '#b7a996' }]} onPress={() => navigation.push('signIn')}>
                    <Text style={{color: '#573b30'}}>Masuk</Text>
                </TouchableOpacity>
                {isSubmiting ?
                    <View style={[authStyle.button, { backgroundColor: '#573b30' }]}>
                        <ActivityIndicator size="large" color="#b7a996" />
                    </View>
                    :
                    <TouchableOpacity style={[authStyle.button, { backgroundColor: '#573b30' }]} onPress={() => signup()}>
                        <Text style={{ color: '#b7a996' }}>Daftar</Text>
                    </TouchableOpacity>
                }
            </View>
        </View>
    )
}
