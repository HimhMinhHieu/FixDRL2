import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../../components/Home/Home";
import HoatDongDetail from "../../components/ActivityDetail/ActivityDetail";
import userDetail from "../../components/userDetail/userDetail";

const Stack = createNativeStackNavigator();

const HomeRoute = () => {

    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={Home}/>
            <Stack.Screen name="UserDetail" component={userDetail} />
            <Stack.Screen name="Activity Detail" component={HoatDongDetail} />
        </Stack.Navigator>
    )
}

export default HomeRoute;