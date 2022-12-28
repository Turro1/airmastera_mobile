import * as React from "react";
import { View, Text, TouchableOpacity, Alert, SafeAreaView } from "react-native";
import styled from "styled-components";
import GrayText from "./GrayText";
import  Badge from "./Badge";
import {carsAPI, appointmentsAPI} from '../utils/api';
import carNumberFromat from "../utils/carNumberFromat";

const AppointmentButton = ({ navigate, item }) => {
    let popupRef = React.createRef()
    const {_id ,car, carmodel, diagnosis, active, time} = item;
    const onShowPopup = () => {
        popupRef.show()
    }

    const onClosePopup = () => {
     popupRef.close()
    }
    
    const onSubmit = () => {
        carsAPI.remove(_id).then(() => {
          navigation.navigate('Home');
          alert('Клиент удален')
        }).catch(e => {
      alert('Ошибка!')
        });
      }
      
    return (
<SafeAreaView>
        <GroupItem onPress={navigate.bind(this, 'Client', item)}>
            <Block>
                
                <Avatar source={{uri: car.avatar}} />
                <View>
                    <FullName> {car.carname} {car.carmodel}</FullName>
                    <GrayText> {diagnosis} </GrayText>
                </View>
            </Block>
            {time && <Badge active={active}>{time}</Badge>}
        </GroupItem>
        </SafeAreaView>
        
    );
}
AppointmentButton.defaultProps = {
    title: 'Untitled',
    items: [],
}

const Block = styled.View`
display: flex;
flex-direction: row;
`;

const FullName = styled.Text`
font-weight: 600;
font-size: 14px;
color: #000000;
`;
const Avatar = styled.Image`
width: 40px;
height: 40px;
margin-right: 15px;
/*border-radius: 50px;*/
`;
const GroupItem = styled.TouchableOpacity`
align-items: center;
flex-direction: row;
padding: 20px;
border-bottom-width: 1px;
border-bottom-color: #E8E8E8;
display: flex;
justify-content: space-between;
`;

const GroupBlock = styled.View`
padding: 0 20px;
margin-bottom: 25px;
`;

export default AppointmentButton;