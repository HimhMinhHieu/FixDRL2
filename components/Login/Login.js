import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator, Text, TextInput, TouchableOpacity, View } from "react-native";
import Api, { apiLogin, authApi, endpoints } from "../../ApisService/Api";
import { useContext, useState } from "react";
import Styles from "./Styles";
import MyStyle from "../../styles/MyStyle";


const Login = ({navigation})=>{
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [user, dispatch] = useContext(MyContext);
    const [loading, setLoading] = useState();

    const login = async () => {
        setLoading(true);
        try {
            let formdata = new FormData();
            formdata.append("client_id", "lnanBMCei1fYGROGsiOTVZargdCLhJnD0XIBqJZm");
            formdata.append("client_secret", "BvN8OmuX8VIcf2j7qMhCLTHeani9vxbDJINdXljmm4pNRLhx5FlS77Yv4d4GzLl1nWniTfNXVtyvgmg0OHb7S3PsRZslBQzaH7Nrs599uSt6tY39fibHOLTn7q0LNlvM");
            formdata.append("username", username);
            formdata.append("password", password);
            formdata.append("grant_type", "password");
            console.info(formdata)

            let res = await apiLogin().post(endpoints['login'], formdata)
            console.info(res.data)
            await AsyncStorage.setItem('token-access', res.data.access_token)
            let user = await authApi(res.data.access_token).get(endpoints['user_current']);
            console.info(user.data)
            dispatch({
                        'type': 'login',
                        'payload': {
                            'username': user.data.username
                        }
                    })
            navigation.navigate('Home');
        } catch (error) {
            console.error(error);
        } finally{
            setLoading(false);
        }
        // if(username==="admin"&&password==="123"){
        //     dispatch({
        //         'type': 'login',
        //         'payload': {
        //             'username': 'admin'
        //         }
        //     })
        // }else
        //     alert("Đăng nhập không thanh công!");
    }

    return <View style={MyStyle.container}>
        <Text style={MyStyle.subject}>ĐĂNG NHẬP</Text>
        <TextInput value={username} onChangeText={t=>setUsername(t)} placeholder="Enter username..." style={Styles.input}></TextInput>
        <TextInput secureTextEntry={true} value={password} onChangeText={t=>setPassword(t)} placeholder="Enter password..." style={Styles.input}></TextInput>
        {loading===true?<ActivityIndicator/>:<>
            <TouchableOpacity onPress={login}>
                <Text style={Styles.button}>Login</Text>
            </TouchableOpacity>
        </>}
    </View>
}

export default Login;