import React, {useState} from 'react';
import {View, TouchableOpacity, Button, Text, TextInput} from 'react-native';
import {useStoreActions, useStoreState} from 'easy-peasy';

const Home = () => {
  const {todos} = useStoreState(state => state.todoList);
  const addTodo = useStoreActions(actions => actions.todoList.addTodoAsync);
  const removeTodo = useStoreActions(actions => actions.todoList.removeTodo);
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
        <TouchableOpacity onPress={() => removeTodo(todo)}>
          <Text>{`${index + 1}. ${todo.text}`}</Text>
        </TouchableOpacity>
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
