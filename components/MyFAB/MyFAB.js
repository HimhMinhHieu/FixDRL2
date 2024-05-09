import * as React from "react";
import { FAB, Portal, PaperProvider } from "react-native-paper";
import userContext from "../../Context/userContext/userContext";
import { useNavigation } from "@react-navigation/native";


export default MyFAB = () => {
  const [state, setState] = React.useState({ open: false });

  const onStateChange = ({ open }) => setState({ open });

  const { open } = state;

  const [user, dispatch] = React.useContext(userContext);

  const navigation = useNavigation();

  const logout = () => {
    console.info("Log Out");
    dispatch({
      type: "logout",
    });
  };

  const gotouserDetail = () => {
    navigation.navigate("userDetail")
  }

  return (
      <Portal>
        <FAB.Group
          open={open}
          visible
          icon={open ? "settings-helper" : "account-settings"}
          actions={[
            { icon: "logout", label: 'Log Out', onPress: () => logout() },
            {
              icon: 'account',
              label: user.userdata.first_name + " " + user.userdata.last_name,
              onPress: () => navigation.navigate('UserDetail'),
            },
          ]}
          onStateChange={onStateChange}
          onPress={() => {
            if (open) {
              // do something if the speed dial is open
            }
          }}
        />
      </Portal>
  );
};
