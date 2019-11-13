import React from 'react';
import {View, Button, Text} from 'react-native';
import {useStoreActions, useStoreState} from 'easy-peasy';
const Home = () => {
  const {todos} = useStoreState(state => state.todoList);
  console.log(todos);
  return (
    <View>
      <Text style={{textAlign: 'center'}}>My Todos</Text>
      {todos.map((todo, index) => (
        <Text>{`${index+1}. ${todo.text}`}</Text>
      ))}
    </View>
  );
};

export default Home;
