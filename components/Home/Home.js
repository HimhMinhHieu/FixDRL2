import { useContext, useEffect, useState } from "react";
import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import userContext from "../../Context/userContext/userContext";
import MyFAB from "../MyFAB/MyFAB";
import Api, { authApi, endpoints } from "../../ApisService/Api";
import {
  ActivityIndicator,
  Avatar,
  Button,
  Card,
  Chip,
  Divider,
  IconButton,
  MD2Colors,
  MD3Colors,
  Menu,
  Modal,
  Portal,
  TextInput,
} from "react-native-paper";
import RenderHTML from "react-native-render-html";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Moment from "moment";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LeftContent = (props) => <Avatar.Icon {...props} icon="lighthouse-on" />;
const { height } = Dimensions.get("window");

// const Stack = createNativeStackNavigator();

// function ActivityDetail(params) {
//   return (
//     <Stack.Navigator
//       screenOptions={{
//         headerShown: true,
//       }}
//     >
//       <Stack.Screen
//         name="Activity Detail"
//         component={HoatDongDetail}
//         initialParams={params}
//       />
//     </Stack.Navigator>
//   );
// }

const Home = ({ navigation }) => {
  const [user] = useContext(userContext);
  const [hoatdongs, setHoatDongs] = useState(null);

  const [idHD, setIDHD] = useState(null);

  const [idHDLike, setIDHDLike] = useState(null);

  const [idHDComment, setIDHDComment] = useState(null);

  const [idHDSV, setIDHDSV] = useState(null);

  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setIDHD(false);

  const [isHover, setHover] = useState(false);

  const [visibleModal, setVisibleModal] = useState(false);

  const showModal = () => setVisibleModal(true);
  const hideModal = () => setVisibleModal(false);
  const containerStyle = { backgroundColor: "white", padding: 20 };

  const [visibleModalSV, setVisibleModalSV] = useState(false);

  const showModalSV = () => setVisibleModalSV(true);
  const hideModalSV = () => setVisibleModalSV(false);
  // const containerStyle = { backgroundColor: "white", padding: 20 };

  useEffect(() => {
    const loadHoatDongs = async () => {
      const res = await Api.get(endpoints["hoatdongs"]);
      setHoatDongs(res.data.results);
      console.info(res.data.results);
    };

    loadHoatDongs();
  }, []);

  const likeHD = async (hoatdongID) => {
    let token = await AsyncStorage.getItem('token-access');
    const res = await authApi(token).post(endpoints['hoatdong_like'](hoatdongID))
    console.warn(res)
  }

  const gotoDetail = (hoatdongID) => {
    navigation.navigate("Activity Detail", { hoatdongID: hoatdongID });
    // console.warn(hoatdongID)
    closeMenu();
  };

  return (
    <>
      <View>
        {hoatdongs === null ? (
          <ActivityIndicator animating={true} color={MD2Colors.red800} />
        ) : (
          <>
            <ScrollView>
              {hoatdongs.map((hd) => (
                <Card>
                  <Card.Title
                    title={hd.name}
                    subtitle={hd.ngay_dien_ra + " đến " + hd.ngay_het}
                    left={LeftContent}
                    right={() => (
                      <Text style={{ marginEnd: 10 }}>
                        +{hd.diem_cong} điểm
                      </Text>
                    )}
                  />
                  <Card.Content style={{ flexDirection: "row" }}>
                    <IconButton
                      icon= "thumb-up-outline"
                      iconColor={MD3Colors.neutralVariant60}
                      size={20}
                      onPress={() => {
                        setHover(!isHover);
                        setIDHDLike(hd.id);
                        likeHD(hd.id);
                      }}
                    />
                    <Text>{hd.like_set.length}</Text>
                    <IconButton
                      icon="comment-outline"
                      iconColor={MD3Colors.neutralVariant60}
                      size={20}
                      onPress={() => {
                        showModal();
                        setIDHDComment(hd.id);
                      }}
                    />
                    <Text>{hd.comment_set.length}</Text>
                    <Portal>
                      <Modal
                        visible={visibleModal && idHDComment === hd.id}
                        onDismiss={hideModal}
                        contentContainerStyle={containerStyle}
                      >
                        {hd.comment === null ? (
                          <>
                            <Text>Chưa có comment nào cả</Text>
                            <View style={styles.textAreaContainer}>
                              <TextInput
                                style={styles.textArea}
                                underlineColorAndroid="transparent"
                                placeholder="Type something"
                                placeholderTextColor="grey"
                                numberOfLines={10}
                                multiline={true}
                              />
                            </View>
                          </>
                        ) : (
                          <ScrollView>
                            {hd.comment_set.map((cmt) => (
                              <Card>
                                {/* <Card.Title
                                  title={
                                    cmt.user_id.last_name +
                                    " " +
                                    cmt.user_id.first_name
                                  }
                                  subtitle={Moment(cmt.created_date).fromNow()}
                                  left={() => {
                                    <Card.Cover
                                      source={{
                                        uri: cmt.user_id.avatar,
                                      }}
                                    />;
                                  }}
                                /> */}
                                <Card.Content>
                                  <ScrollView style={{ height: 0.05 * height }}>
                                    <RenderHTML
                                      source={{ html: cmt.content }}
                                    ></RenderHTML>
                                  </ScrollView>
                                </Card.Content>
                              </Card>
                            ))}
                          </ScrollView>
                        )}
                      </Modal>
                    </Portal>
                  </Card.Content>
                  <Card.Content>
                    <ScrollView style={{ height: 0.05 * height }}>
                      <RenderHTML source={{ html: hd.mo_ta }}></RenderHTML>
                    </ScrollView>
                  </Card.Content>

                  <Card.Actions>
                    {hd.tags.map((tag) => (
                      <Chip
                        style={{ alignContent: "flex-start" }}
                        icon="information"
                        onPress={() => console.log("Pressed")}
                      >
                        {tag.name}
                      </Chip>
                    ))}
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "center",
                        alignContent: "center",
                        alignItems: "center",
                        alignSelf: "center",
                      }}
                    >
                      <Menu
                        key={hd.id}
                        visible={idHD === hd.id && visible}
                        onDismiss={closeMenu}
                        anchor={
                          <IconButton
                            icon="backburger"
                            iconColor={MD3Colors.error0}
                            size={30}
                            onPress={() => {
                              setIDHD(hd.id);
                              openMenu();
                              console.info(hd.id);
                            }}
                          ></IconButton>
                        }
                      >
                        <Menu.Item
                          leadingIcon="eye-outline"
                          onPress={() => gotoDetail(hd.id)}
                          title="Xem Chi Tiết"
                        />
                        <Menu.Item
                          leadingIcon="format-list-numbered"
                          onPress={() => {
                            showModalSV();
                            setIDHDSV(hd.id);
                          }}
                          title="Xem Danh Sách Sinh Viên"
                        />
                        <Portal>
                          <Modal
                            visible={visibleModalSV && idHDSV === hd.id}
                            onDismiss={hideModalSV}
                            contentContainerStyle={containerStyle}
                          >
                            {hd.user_svs === null || hd.user_svs.length === 0 ? (
                              <Text>Chưa có sinh viên nào cả</Text>
                            ) : (
                              <View>
                                {hd.user_svs.map((nguoidung) => (
                                  <Card.Title
                                    title={
                                      nguoidung.last_name +
                                      " " +
                                      nguoidung.first_name
                                    }
                                    subtitle={nguoidung.email}
                                    left={() => (
                                      <Avatar.Image
                                        size={24}
                                        source={{ uri: nguoidung.avatar }}
                                      />
                                    )}
                                    right={(props) => (
                                      <IconButton
                                        {...props}
                                        icon="dots-vertical"
                                        onPress={() => {}}
                                      />
                                    )}
                                  />
                                ))}
                              </View>
                            )}
                          </Modal>
                        </Portal>
                        <Menu.Item
                          leadingIcon="close"
                          onPress={() => {}}
                          title="Bỏ Qua"
                        />
                      </Menu>
                    </View>
                    <Button buttonColor="green">Tham Gia</Button>
                  </Card.Actions>
                </Card>
                
              ))}
              
            </ScrollView>
            
          </>
          
        )}
        
      </View>
      <MyFAB />
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  textAreaContainer: {
    borderColor: MD2Colors.amber50,
    borderWidth: 1,
    padding: 5,
  },
  textArea: {
    height: 150,
    justifyContent: "flex-start",
  },
});
