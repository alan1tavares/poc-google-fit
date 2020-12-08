/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  Alert,
  Switch,
  FlatList,
} from 'react-native';

import GoogleFit, {Scopes} from 'react-native-google-fit';

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
    })
    .catch(() => {
      Alert.alert('Deu erro');
    });
};

const _Button = ({onPress, title}) => {
  return (
    <View style={styles.button}>
      <Button onPress={onPress} title={title} />
    </View>
  );
};

const Card = ({item, index, separators}) => {
  return (
    <View style={styles.card}>
      <Text>Data: {item.startDate}</Text>
      <Text>Peso: {item.value}</Text>
    </View>
  );
};

const item = {
  startDate: '12/10/2020',
  value: 30,
  key: 1,
};

const App = () => {
  const [isAuthorized, setIsAuthorized] = React.useState(false);
  const [data, setData] = React.useState([item]);

  GoogleFit.checkIsAuthorized().then(() => {
    setIsAuthorized(GoogleFit.isAuthorized);
  });

  const handleGetPeso = () => {
    const opt = {
      unit: 'kg', // required; default 'kg'
      startDate: '2017-01-01T00:00:17.971Z', // required
      endDate: new Date().toISOString(), // required
      bucketUnit: 'DAY', // optional - default "DAY". Valid values: "NANOSECOND" | "MICROSECOND" | "MILLISECOND" | "SECOND" | "MINUTE" | "HOUR" | "DAY"
      bucketInterval: 1, // optional - default 1.
      ascending: false, // optional; default false
    };
  
    GoogleFit.getWeightSamples(opt).then((res) => {
      setData(res);
      console.log('peso', res);
    });
  };

  return (
    <>
      <View style={styles.container}>
        <Switch
          thumbColor={isAuthorized ? '#f5dd4b' : '#f4f3f4'}
          value={isAuthorized}
        />
        <_Button
          title="Get Credentials"
          onPress={() => handleGetCredentials()}
        />
        <_Button title="Get Weight" onPress={() => handleGetPeso()} />
        <Text>Hello World</Text>

        <FlatList data={data} renderItem={Card}/>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 16,
    alignItems: 'center',
  },

  button: {
    marginVertical: 10,
  },
  card: {
    borderWidth: 1,
  },
});

export default App;
