import React from 'react'
import {
    Text,
    View,
    Alert,
    SafeAreaView,
    ActivityIndicator,
} from 'react-native'
import { AuthContext } from "../../config/context";
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { TouchableOpacity } from 'react-native-gesture-handler';
import http from '../../components/http';
import { theme, profileStyle } from "../../components/styles";

export default function profile({ navigation }) {
    const [isLoading, setIsloading] = React.useState(true);
    const { signOut } = React.useContext(AuthContext);
    const [username, setUsername] = React.useState('');
    const [email, setEmail] = React.useState('');

    React.useEffect(() => {
        profile();
    }, [])

    const profile = async () => {
        let id = await AsyncStorage.getItem('id');
        http.get(`user/${id}`,{
            headers: {
                Accept: 'application/json',
                'x-access-token': await AsyncStorage.getItem('token')
            }
        })
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
            <SafeAreaView style={theme.blankContainer}>
                <View style={theme.centerBar}>
                    <View style={theme.centerCircle}>
                        <ActivityIndicator size="large" color="#b7a996" />
                    </View>
                </View>
            </SafeAreaView>
        )
    }
    return (
        <SafeAreaView style={theme.container}>
            <View style={theme.headerSection}>
                <TouchableOpacity style={theme.iconBox} onPress={() => navigation.push('listNote')}>
                    <MaterialIcon
                        size={24}
                        name='arrow-back'
                        color='black'
                    />
                </TouchableOpacity>
                <TouchableOpacity style={theme.iconBox} onPress={() => signOutConfirmation()}>
                    <MaterialIcon
                        size={24}
                        name='logout'
                        color='Black'
                    />
                </TouchableOpacity>
            </View>
            <View style={profileStyle.profileSection}>
                <View style={profileStyle.profile}>
                    <Text style={profileStyle.profileText}>{username.substring(0, 1)}</Text>
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Text>{username}</Text>
                    <Text>{email}</Text>
                </View>
            </View>
            <View style={profileStyle.footerSection}>
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
