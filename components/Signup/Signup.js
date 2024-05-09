import * as React from "react";
import { View } from "react-native";
import { Button, List, MD3Colors, TextInput } from "react-native-paper";
import MyStyle from "../../styles/MyStyle";
// import * as ImagePicker from 'expo-image-picker';

export default Signup = () => {
  const [text, setText] = React.useState("");

  const [showPass, setShow] = React.useState(false);

  const showPassword = () => {
    setShow(!showPass);
  };

  const picker = async () => {
    const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if(status!=="granted"){
        alert("Permission denied!");
    }else{
        const res = await ImagePicker.launchImageLibraryAsync();
        if(!res.canceled){
            change('avatar', res.assets[0]);
        }
    }
}

  return (
    <View>
      <List.Section>
        <List.Subheader>
          <TextInput.Icon icon="shield-account" />
          Security Account
        </List.Subheader>
        <List.Item
          title={() => <TextInput label="Username" />}
          left={() => <List.Icon icon="shield-account-outline" />}
        />
        <List.Item
          title={() => (
            <TextInput
              label="Password"
              secureTextEntry={!showPass}
              right={
                <TextInput.Icon
                  onPressIn={showPassword}
                  onPressOut={showPassword}
                  icon="eye"
                />
              }
            />
          )}
          left={() => (
            <List.Icon
              color={MD3Colors.tertiary70}
              icon="form-textbox-password"
            />
          )}
        />
      </List.Section>

      <List.Section>
        <List.Subheader>
          <TextInput.Icon icon="account-circle" />
          Personal Information
        </List.Subheader>
        <List.Item
          title={() => <TextInput label="First Name" />}
          left={() => (
            <List.Icon color={MD3Colors.primary40} icon="page-first" />
          )}
        />
        <List.Item
          title={() => <TextInput label="Last Name" />}
          left={() => (
            <List.Icon color={MD3Colors.tertiary50} icon="page-last" />
          )}
        />
        <List.Item
          title={() => <TextInput label="Phone" />}
          left={() => (
            <List.Icon color={MD3Colors.tertiary30} icon="cellphone" />
          )}
        />
        <List.Item
          title={() => <TextInput label="Email" />}
          left={() => (
            <List.Icon color={MD3Colors.error20} icon="email-outline" />
          )}
        />
        <List.Item
          title={() => (
            <Button
              icon="camera"
              mode="outlined"
              onPress={() => console.log("Pressed")}
            >
              Press me
            </Button>
          )}
        />
      </List.Section>
    </View>
  );
};
