import { useContext, useEffect } from "react";
import {
  ActivityIndicator,
  Avatar,
  Card,
  MD2Colors,
  Text,
} from "react-native-paper";
import userContext from "../../Context/userContext/userContext";
import { StyleSheet, View } from "react-native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";

// const StackNavigate = createNativeStackNavigator();

export default NguoiDungDetail = () => {
  const [user] = useContext(userContext);

  useEffect(() => {
    const load = () => {
      console.log(user.userdata.avatar);
    };
    load();
  }, []);

  return (
    <>
      <View>
        {user === null ? (
          <ActivityIndicator animating={true} color={MD2Colors.red800} />
        ) : (
          <>
            <Avatar.Image
              style={{ alignSelf: "center" }}
              size={150}
              source={{ uri: user.userdata.avatar }}
            />
            <Card>
              <Card.Content>
                <Text style={{ alignSelf: "center" }} variant="titleLarge">
                  {user.userdata.mssv}
                </Text>
                <View style={style.row}>
                  <Text variant="titleMedium">Họ và Tên: </Text>
                  <Text style={style.end} variant="titleMedium">
                    {" "}
                    {user.userdata.last_name} {user.userdata.first_name}
                  </Text>
                </View>
                <View style={style.row}>
                  <Text variant="titleMedium">Email: </Text>
                  <Text style={style.end} variant="titleMedium">
                    {user.userdata.email}
                  </Text>
                </View>
                <View style={style.row}>
                  <Text variant="titleMedium">Phone: </Text>
                  <Text style={style.end} variant="titleMedium">
                    {user.userdata.phone}
                  </Text>
                </View>
                <View style={style.row}>
                  <Text variant="titleMedium">username: </Text>
                  <Text style={style.end} variant="titleMedium">
                    {user.userdata.username}
                  </Text>
                </View>
                <View style={style.row}>
                  <Text variant="titleMedium">Ngày Sinh: </Text>
                  <Text style={style.end} variant="titleMedium">
                    {user.userdata.ngay_sinh}
                  </Text>
                </View>
                <View style={style.row}>
                  <Text variant="titleMedium">Ngày Nhập Học: </Text>
                  <Text style={style.end} variant="titleMedium">
                    {user.userdata.ngay_nhap_hoc}
                  </Text>
                </View>
              </Card.Content>
            </Card>
          </>
        )}
      </View>
    </>
  );
};

const style = StyleSheet.create({
  row: {
    flexDirection: "row",
  },
  end: {
    textAlign: "right",
    right: 0,
    position: "absolute",
  },
});
