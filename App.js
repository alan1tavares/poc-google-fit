/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {StyleSheet, View, Text, Alert, Switch, FlatList} from 'react-native';

import FitButton from './src/components';

import GoogleFit, {Scopes} from 'react-native-google-fit';

const Item = ({item}) => {
  return (
    <View style={styles.item}>
      <Text>Data: {item.startDate}</Text>
      <Text>Peso: {item.value}</Text>
    </View>
  );
};

const App = () => {
  const [isAuthorized, setIsAuthorized] = React.useState(false);
  const [data, setData] = React.useState([]);

  GoogleFit.checkIsAuthorized().then(() => {
    setIsAuthorized(GoogleFit.isAuthorized);
    console.log(GoogleFit.isAuthorized);
  });

  const handleGetCredentials = () => {
    const options = {
      scopes: [
        Scopes.FITNESS_ACTIVITY_READ,
        Scopes.FITNESS_ACTIVITY_WRITE,
        Scopes.FITNESS_BODY_READ,
        Scopes.FITNESS_BODY_WRITE,
      ],
    };

    GoogleFit.authorize(options)
      .then((authResult) => {
        if (authResult.success) {
          Alert.alert('Está autorizado');
        } else {
          Alert.alert('Não está autorizado');
        }
        setIsAuthorized(authResult.success);
      })
      .catch(() => {
        Alert.alert('Deu erro');
        setIsAuthorized(false);
      });
  };

  const handleGetPeso = () => {
    const opt = {
      unit: 'kg',
      startDate: '2017-01-01T00:00:17.971Z',
      endDate: new Date().toISOString(),
      bucketUnit: 'DAY',
      bucketInterval: 1,
      ascending: false,
    };

    GoogleFit.getWeightSamples(opt).then((res) => {
      setData(res);
      console.log('peso', res);
    });
  };

  return (
    <>
      <View style={styles.container}>
        <View>
          <Switch
            thumbColor={isAuthorized ? '#f5dd4b' : '#f4f3f4'}
            value={isAuthorized}
          />
          <FitButton
            title="Get Credentials"
            onPress={() => handleGetCredentials()}
          />
          <FitButton title="Get Weight" onPress={() => handleGetPeso()} />
        </View>

        <FlatList
          data={data}
          renderItem={Item}
          keyExtractor={(data) => data.endDate}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
    marginHorizontal: 30,
  },
  item: {
    borderWidth: 1,
    marginVertical: 5,
    padding: 10,
  },
});

export default App;
