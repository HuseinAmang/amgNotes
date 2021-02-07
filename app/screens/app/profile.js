import React from 'react'
import axios from 'react-native-axios';
import {
    Text,
    View,
    Alert,
    Platform,
    StyleSheet,
    SafeAreaView,
    ActivityIndicator,
} from 'react-native'
import { AuthContext } from "../../config/context";
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function profile({ navigation }) {
    const [isLoading, setIsloading] = React.useState(true);
    const { signOut } = React.useContext(AuthContext);
    const [token, setToken] = React.useState('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjEyNjY4NTAzLCJleHAiOjE2MTI3NTQ5MDN9.PEIU-SF9yfxi4DfY0w6UHgdBD8L0FncIHxnC6hzgCoo');
    const [username, setUsername] = React.useState('');
    const [email, setEmail] = React.useState('');

    React.useEffect(() => {
        getDataUser()
        setTimeout(() => profile(), 1000);
    }, [])

    const getDataUser = async () => {
        let data = await AsyncStorage.getItem('token');
        setToken(data);
    }

    const http = axios.create({
        baseURL: 'https://amg-app-v1.herokuapp.com/api',
        timeout: 2000,
        headers: {
            Accept: 'application/json',
            'x-access-token': token
        }
    });

    const profile = async () => {
        let id = await AsyncStorage.getItem('id');
        http.get(`user/${id}`)
            .then(function (response) {
                console.log(response.data);
                setUsername(response.data.username);
                setEmail(response.data.email);
                setIsloading(false);
            })
            .catch(function (error) {
                console.log(error);
                setIsloading(false);
            });
    }

    const signOutConfirmation = () => {
        Alert.alert(
            'Peringatan !',
            'Anda akan keluar dari aplikasi ?',
            [
                { text: 'NO', style: 'cancel' },
                { text: 'YES', onPress: () => signOut() },
            ]
        );
    }

    if (isLoading) {
        return (
            <SafeAreaView style={styles.blankContainer}>
                <View style={styles.centerBar}>
                    <View style={styles.centerCircle}>
                        <ActivityIndicator size="large" color="#b7a996" />
                    </View>
                </View>
            </SafeAreaView>
        )
    }
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerSection}>
                <TouchableOpacity style={styles.iconBox} onPress={() => navigation.push('listNote')}>
                    <MaterialIcon
                        size={24}
                        name='arrow-back'
                        color='black'
                    />
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconBox} onPress={() => signOutConfirmation()}>
                    <MaterialIcon
                        size={24}
                        name='logout'
                        color='Black'
                    />
                </TouchableOpacity>
            </View>
            <View style={styles.profileSection}>
                <View style={styles.profile}>
                    <Text style={styles.profileText}>{username.substring(0, 1)}</Text>
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Text>{username}</Text>
                    <Text>{email}</Text>
                </View>
            </View>
            <View style={styles.footerSection}>
                <Text>author</Text>
                <Text>M Farid H</Text>
                <FontAwesome
                    size={24}
                    name='github'
                    color='black'
                />
                <Text>github.com/HuseinAmang</Text>
                <FontAwesome
                    size={24}
                    name='gitlab'
                    color='black'
                />
                <Text>gitlab.com/husein1368</Text>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    blankContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#faf2d9'
    },
    centerBar: {
        backgroundColor: '#573b30',
        justifyContent: 'center',
        borderColor: '#b7a996',
        alignItems: 'center',
        alignSelf: 'stretch',
        borderWidth: 10,
        height: 70,
    },
    centerCircle: {
        width: 150,
        height: 150,
        borderRadius: 150 / 2,
        backgroundColor: '#573b30',
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: Platform.OS === 'android' ? 30 : 0,
        backgroundColor: '#faf2d9'
    },
    iconBox: {
        width: 50,
        borderRadius: 50 / 2,
        padding: 5,
        marginHorizontal: 5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#b7a996'
    },
    headerSection: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        backgroundColor: '#573b30',
        alignSelf: 'stretch',
        alignItems: 'center',
        height: 50,
        textAlign: 'center'
    },
    profile: {
        width: 200,
        height: 200,
        borderWidth: 10,
        borderRadius: 200 / 2,
        borderColor: '#573b30',
        backgroundColor: '#b7a996',
        justifyContent: 'center',
        alignItems: 'center'
    },
    profileText: {
        fontSize: 150,
        color: '#573b30'
    },
    profileSection: {
        flex: 2,
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    footerSection: {
        flex: 2,
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingVertical: 10,
    }
})
