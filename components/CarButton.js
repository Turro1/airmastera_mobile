import React, { useEffect, useState,useRef } from 'react';
import { View, Text, TouchableOpacity, Alert, SafeAreaView, ActivityIndicator } from "react-native";
import styled from "styled-components";
import GrayText from "./GrayText";
import  Badge from "./Badge";
import {carsApi,clientsApi, appointmentsApi} from '../utils/api';
import carNumberFromat from "../utils/carNumberFromat";
import { carNumberFormat } from "../utils";
import BottomSheet from 'react-native-gesture-bottom-sheet';
import {Ionicons, Foundation, AntDesign } from '@expo/vector-icons';
import Container from './Container';
import { ScrollView } from 'react-native-gesture-handler';

const CarButton = ({ navigation, navigate, item }) => {
    let popupRef = React.createRef()
    const {_id ,avatar,carname,carmodel,carnumber,diagnosis, active, time,car} = item;
    const [appointments, setAppointments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

      
      useEffect(() => {
        const id = item._id;
        carsApi
          .show(id)
          .then(({ data }) => {
            setAppointments(data.data.appointments);
            setIsLoading(true);
          })
          .catch(() => {
            setIsLoading(false);
          });
      },[]);

      const fetch = () => {
        const id = item._id;
        carsApi
          .show(id)
          .then(({ data }) => {
            setAppointments(data.data.appointments);
            setIsLoading(true);
          })
          .catch(() => {
            setIsLoading(false);
          });
      };

      const bottomSheet = useRef();

      const removeAppointment = id => {
        Alert.alert(
          'Удаление авто',
          'Вы действительно хотите удалить ремонт?',
          [
            {
              text: 'Отмена',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel'
            },
            {
              text: 'Удалить',
              onPress: () => {
                setIsLoading(true);
                appointmentsApi
                  .remove(id)
                  .then(() => {
                    fetchCars();
                  })
                  .catch(() => {
                    setIsLoading(false);
                  });
              }
            }
          ],
          { cancelable: false }
        );
      };

      setTimeout(() => {
        fetch();
    }, 2000);

    return (
<SafeAreaView>
      <BottomSheet
        draggable={false}
        hasDraggableIcon
        ref={bottomSheet}
        height={450}>
        <BlockSheet>
                
                <AvatarSheet source={{uri: item.avatar}} />
          <CarName>{item.carname} {item.carmodel}</CarName>
          
          <TouchableOpacity onPress={navigate.bind(this, 'AddAppointment', {
          carId: item._id
        })}>
          <AntDesign style={{marginRight: 10}} name="pluscircleo" size={40} color="gray" />
          </TouchableOpacity>
            </BlockSheet>
            
              <ScrollView>
          {(
            appointments.map(appointment => (
              <AppointmentCard key={appointment._id}>
                <MoreButton onPress={removeAppointment.bind(this,appointment._id)}>
                  <Ionicons
                    name="open-outline"
                    size={24}
                    color="rgba(0, 0, 0, 0.4)"
                  />
                </MoreButton>
                <AppointmentCardRow>
                  <Ionicons name="md-medical" size={16} color="#A3A3A3" />
                  <AppointmentCardLabel>
                    Элемент:{' '}
                    <Text style={{ fontWeight: '600' }}>
                      {appointment.elNumber}
                    </Text>
                  </AppointmentCardLabel>
                </AppointmentCardRow>
                <AppointmentCardRow>
                  <Foundation
                    name="clipboard-notes"
                    size={16}
                    color="#A3A3A3"
                  />
                  <AppointmentCardLabel>
                    Вид:{' '}
                    <Text style={{ fontWeight: '600' }}>
                      {appointment.diagnosis}
                    </Text>
                  </AppointmentCardLabel>
                </AppointmentCardRow>
                <AppointmentCardRow
                  style={{ marginTop: 15, justifyContent: 'space-between' }}
                >
                  <Badge style={{ width: 155 }} active>
                    {appointment.date} - {appointment.time}
                  </Badge>
                  <Badge color="green">{appointment.price} Р</Badge>
                </AppointmentCardRow>
              </AppointmentCard>
            ))
          )}
          
          </ScrollView>
      </BottomSheet>
        <GroupItem onPress={() => bottomSheet.current.show()}>
            <Block>
                
                <Avatar source={{uri: item.avatar}} />
                <View>
                    <FullName>{item.carname} {item.carmodel}</FullName>
                    <GrayText>{carNumberFormat(item.carnumber)} </GrayText>
                </View>
            </Block>
            {time && <Badge active={active}>{time}</Badge>}
        </GroupItem>
        </SafeAreaView>
        
    );
}
CarButton.defaultProps = {
    title: 'Untitled',
    items: [],
}

const Block = styled.View`
display: flex;
flex-direction: row;
`;

const BlockSheet = styled.View`
margin-top: 10px;

display: flex;
flex-direction: row;

`;

const FullName = styled.Text`
font-weight: 600;
font-size: 14px;
color: #000000;
`;

const CarName = styled.Text`
font-weight: bold;
margin-left: auto;
margin-right: auto;
font-size: 20px;
color: #000000;
`;
const Avatar = styled.Image`
width: 40px;
height: 40px;
margin-right: 15px;
/*border-radius: 50px;*/
`;
const AvatarSheet = styled.Image`
width: 50px;
height: 50px;
margin-left: 10px;
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





const MoreButton = styled.TouchableOpacity`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 10px;
  top: 10px;
  height: 32px;
  width: 32px;
`;

const AppointmentCardLabel = styled.Text`
  font-size: 16px;
  margin-left: 10px;
`;

const AppointmentCardRow = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 3.5px;
  margin-bottom: 3.5px;
`;

const AppointmentCard = styled.View`
  shadow-color: gray;
  elevation: 0.5;
  shadow-opacity: 0.4;
  shadow-radius: 10;
  padding: 20px 25px;
  border-radius: 10px;
  background: white;
  margin-bottom: 20px;
`;

const PatientDetails = styled(Container)`
  flex: 0.3;
`;

const PatientAppointments = styled.View`
  flex: 1;
  background: #f8fafd;
`;

const FormulaButtonView = styled.View`
  flex: 1;
`;

const PhoneButtonView = styled.View`
  margin-left: 10px;
  width: 45px;
`;

const PatientButtons = styled.View`
  flex: 1;
  flex-direction: row;
  margin-top: 20px;
`;

const PatientFullname = styled.Text`
  font-weight: 800;
  font-size: 24px;
  line-height: 30px;
  margin-bottom: 3px;
`;

export default CarButton;