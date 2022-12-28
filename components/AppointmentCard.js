import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Alert, SafeAreaView } from "react-native";
import styled from "styled-components";
import GrayText from "./GrayText";
import  Badge from "./Badge";
import { Foundation, Ionicons } from '@expo/vector-icons';
import {carsApi,clientsApi, appointmentsApi} from '../utils/api';
import carNumberFromat from "../utils/carNumberFromat";
import { carNumberFormat } from "../utils";
import { ScrollView, RefreshControl } from 'react-native-gesture-handler';

const AppointmentCard = ({ navigation, navigate, item }) => {
    let popupRef = React.createRef()
    const {_id ,avatar,appointments, car} = item;
    const [isLoading, setIsLoading] = useState(true);
    const onShowPopup = () => {
        popupRef.show()
    }
    const onClosePopup = () => {
     popupRef.close()
    }

    const fetchAppointments = (id) => {
      carsApi
        .show(id)
        .then(({ data }) => {
          setCars(data.data.appointments);
          setIsLoading(true);
        })
        .catch(() => {
          setIsLoading(false);
        }).finally(e => {
          setIsLoading(false);
        });;
    };
    
    const removeAppointment = id => {
      Alert.alert(
        'Удаление ремонта',
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
                  fetchAppointments();
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
    return (appointments.map(appointment => (
      <ScrollView>
<Card>
                          <MoreButton onPress={removeAppointment.bind(this,
                            appointment._id)}>
                            <Ionicons
                              name="trash-outline"
                              size={24}
                              color="rgba(0, 0, 0, 0.4)"
                            />
                          </MoreButton>
                          <AppointmentCardRow>
                            <Ionicons name="md-car-sport-outline" size={26} color="#A3A3A3" />
                            <AppointmentCardLabel>
                            Вид: {appointment.diagnosis}
                            </AppointmentCardLabel>
                          </AppointmentCardRow>
                          <AppointmentCardRow>
                            <Foundation
                              name="wrench"
                              size={26}
                              color="#A3A3A3"
                            />
                            <AppointmentCardLabel>
                              Элемент: {appointment.elNumber}

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
                        </Card>
                        </ScrollView>
        ))
    )}
AppointmentCard.defaultProps = {
    title: 'Untitled',
    items: [],
}

const Block = styled.View`
display: flex;
flex-direction: row;
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

const PatientDetails = styled.View`
padding: 25px;
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

const Card = styled.View`
  shadow-color: black;
  elevation: 3;
  shadow-opacity: 1;
  shadow-radius: 1;
  padding: 20px 25px;
  border-radius: 10px;
  background: white;
  margin-bottom: 20px;
`;

export default AppointmentCard;