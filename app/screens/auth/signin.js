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
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [token, setToken] = React.useState('');
    const { signIn } = React.useContext(AuthContext);

    const signin = () => {
        setIsSubmiting(true)
        http.post('auth/signin', {
            username: username,
            password: password
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
        <View style={styles.container}>
            {isError ?
                <View style={styles.Message}>
                    <Text>{errorMessage}</Text>
                </View>
                : <Text />
            }
            <View style={styles.inputContainer}>
                <Text>Username</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={username => { setUsername(username), setIsError(false) }}
                    defaultValue={username}
                />
            </View>
            <View style={styles.inputContainer}>
                <Text>Password</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={password => { setPassword(password), setIsError(false) }}
                    defaultValue={password}
                    secureTextEntry={true}
                />
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={[styles.button, { backgroundColor: '#b7a996' }]} onPress={() => navigation.push('signUp')}>
                    <Text style={{color: '#573b30'}}>Daftar</Text>
                </TouchableOpacity>
                {isSubmiting ?
                    <View style={[styles.button, { backgroundColor: '#573b30' }]}>
                        <ActivityIndicator size="large" color="#b7a996" />
                    </View>
                    :
                    <TouchableOpacity style={[styles.button, { backgroundColor: '#573b30' }]} onPress={() => signin()}>
                        <Text style={{ color: '#b7a996' }}>Masuk</Text>
                    </TouchableOpacity>
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#faf2d9'
    },
    inputContainer: {
        alignSelf: 'stretch',
        margin: 10
    },
    input: {
        borderBottomWidth: 1,
        borderBottomColor: '#573b30',
        borderColor: 'black',
        alignSelf: 'stretch',
        padding: 5
    },
    Message: {
        backgroundColor: '#886e50',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        padding: 10
    },
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'stretch',
        justifyContent: 'space-around',
        margin: 10
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        width: 150,
        borderRadius: 5,
    }
})
