import React, {useState} from 'react';
import {View, Button, Text, TextInput} from 'react-native';
import {useStoreActions, useStoreState} from 'easy-peasy';

const Home = () => {
  const {todos} = useStoreState(state => state.todoList);
  const addTodo = useStoreActions(actions => actions.todoList.addTodoAsync);
  const [todoItem, setTodoItem] = useState('');
  const addTodoToList = () => {
    if (todoItem) {
      addTodo({text: todoItem, completed: false});
      setTodoItem('');
    }
  };
  return (
    <View>
      <Text style={{textAlign: 'center'}}>My Todos</Text>
      {todos.map((todo, index) => (
        <Text>{`${index + 1}. ${todo.text}`}</Text>
      ))}
      <TextInput
        style={{
          padding: 20,
          marginHorizontal: 20,
          backgroundColor: 'lightgray',
        }}
        value={todoItem ? todoItem : ''}
        onChangeText={text => setTodoItem(text)}
      />
      <Button onPress={() => addTodoToList()} title="Add" />
    </View>
  );
};

export default Home;
