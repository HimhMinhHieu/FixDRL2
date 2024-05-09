import { useContext, useEffect } from "react";
import { Text, View } from "react-native";
import userContext from "../../Context/userContext/userContext";
import MyFAB from "../MyFAB/MyFAB";

const Home = () => {
  const [user] = useContext(userContext);

  return (
    <>
      <View>
        <Text>{user.username}</Text>
      </View>
      <MyFAB />
    </>
  );
};

export default Home;
