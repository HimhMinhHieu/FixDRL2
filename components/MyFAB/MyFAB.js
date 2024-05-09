import * as React from "react";
import { FAB, Portal, PaperProvider } from "react-native-paper";
import userContext from "../../Context/userContext/userContext";

export default MyFAB = () => {
  const [state, setState] = React.useState({ open: false });

  const onStateChange = ({ open }) => setState({ open });

  const { open } = state;

  const [, dispatch] = React.useContext(userContext);

  const logout = () => {
    console.info("Log Out");
    dispatch({
      type: "logout",
    });
  };

  return (
    <PaperProvider>
      <Portal>
        <FAB.Group
          open={open}
          visible
          icon={open ? "settings-helper" : "account-settings"}
          actions={[
            { icon: "logout", onPress: () => logout() },
          ]}
          onStateChange={onStateChange}
          onPress={() => {
            if (open) {
              // do something if the speed dial is open
            }
          }}
        />
      </Portal>
    </PaperProvider>
  );
};
