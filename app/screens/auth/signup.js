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
                <Text>Email</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={email => { setEmail(email), setIsError(false) }}
                    defaultValue={email}
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
                <TouchableOpacity style={[styles.button, { backgroundColor: '#b7a996' }]} onPress={() => navigation.push('signIn')}>
                    <Text style={{color: '#573b30'}}>Masuk</Text>
                </TouchableOpacity>
                {isSubmiting ?
                    <View style={[styles.button, { backgroundColor: '#573b30' }]}>
                        <ActivityIndicator size="large" color="#b7a996" />
                    </View>
                    :
                    <TouchableOpacity style={[styles.button, { backgroundColor: '#573b30' }]} onPress={() => signup()}>
                        <Text style={{ color: '#b7a996' }}>Daftar</Text>
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
