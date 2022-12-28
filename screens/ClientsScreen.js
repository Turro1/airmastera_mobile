import React, { useState, useEffect, useRef } from 'react';
import { FlatList, Alert, View, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styled from 'styled-components/native';
import Swipeable from 'react-native-swipeable-row';
import { clientsApi } from '../utils/api';
import { phoneFormat } from '../utils';
import { Appointment, SectionTitle, PlusButton } from '../components';

const ClientsScreen = props => {
  const { navigation } = props;
  const [data, setData] = useState(null);
  const [searchValue, setSearchValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const fetchClients = () => {
    setIsLoading(true);
    clientsApi
    .get()
      .then(({ data }) => {
        setData(data.data);
      })
      .finally(e => {
        setIsLoading(false);
      });
  };

  const fetchClientss = () => {
    clientsApi
    .get()
      .then(({ data }) => {
        setData(data.data);
      })
      .finally(e => {
      });
  };

  const refrashClients = () => {
  
    setIsLoading(true);

      try {
        fetchClients()
      }
      finally
      {
        setIsLoading(false);
      };
    }
  useEffect(fetchClients, []);
  useEffect(fetchClients, [navigation.state.params]);
  const onSearch = e => {
    setSearchValue(e.nativeEvent.text);
  };

  const removeClient = id => {
    Alert.alert(
      'Удаление авто',
      'Вы действительно хотите удалить авто?',
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
            clientsApi
              .remove(id)
              .then(() => {
                fetchClients();
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
    fetchClientss();
}, 2000);

  return (
    <Container>
      {data && (
        <>
          <View style={{ padding: 20 }}>
            <View style={{ paddingLeft: 15, borderRadius: 30 }} regular>
              <Input onChange={onSearch} placeholder="Поиск..." />
            </View>
          </View>
          <FlatList
            data={data.filter(
              item =>
                item.fullname
                  .toLowerCase()
                  .indexOf(searchValue.toLowerCase()) >= 0
            )}

            keyExtractor={item => item._id}
            onRefresh={fetchClients}
            refreshing={isLoading}
            renderItem={({ item }) => (
              <Swipeable
              rightButtons={[
                <SwipeViewButton 
                navigate={navigation.navigate}
                navigation={navigation}
                onPress={navigation.navigate.bind(this, 'UpdateClient', {
                  client: item
                })}
                style={{ backgroundColor: '#B4C1CB' }}>
                  <Ionicons name="md-create" size={28} color="white" />
                </SwipeViewButton>,
                <SwipeViewButton
                  onPress={removeClient.bind(this, item._id)}
                  style={{ backgroundColor: '#F85A5A' }}
                >
                  <Ionicons name="ios-close" size={48} color="white" />
                </SwipeViewButton>
              ]}
            >
            
                <Appointment
                  navigate={navigation.navigate}
                  navigation={navigation}
                  item={{
                    client: item,
                    car: item._id,
                    diagnosis: phoneFormat(item.phone),
                    
                  }}
                />
                </Swipeable>
            )}
            renderSectionHeader={({ section: { title } }) => (
              <SectionTitle>{title}</SectionTitle>
            )}
          />
        </>
      )}
      <PlusButton onPress={navigation.navigate.bind(this, 'AddClient')
                  } />
    </Container>
  );
};

const Input = styled.TextInput`
border-bottom-color: black;
width: auto;
border-bottom-width: 1px;
`;

const SwipeViewButton = styled.TouchableOpacity`
  width: 75px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

ClientsScreen.navigationOptions = {
  title: 'Клиенты',
  headerTintColor: '#2A86FF',
  headerStyle: {
    elevation: 0.8,
    shadowOpacity: 0.8
  }
};

const Container = styled.View`
  flex: 1;
`;

export default ClientsScreen;
