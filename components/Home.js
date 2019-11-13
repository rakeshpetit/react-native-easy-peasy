import React, {useState} from 'react';
import {View, TouchableOpacity, Button, Text, TextInput} from 'react-native';
import {useStoreActions, useStoreState} from 'easy-peasy';

const Home = () => {
  const {
    validTodos,
    archivedTodos,
    completedCount,
    incompleteCount,
  } = useStoreState(state => state.todoList);
  const addTodo = useStoreActions(actions => actions.todoList.addTodoAsync);
  const removeTodo = useStoreActions(actions => actions.todoList.removeTodo);
  const unarchiveTodo = useStoreActions(
    actions => actions.todoList.unarchiveTodo,
  );
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
      {validTodos.map((todo, index) => (
        <TouchableOpacity key={index} onPress={() => removeTodo(todo)}>
          <Text>{`${index + 1}. ${todo.text} [${
            todo.completed ? 'X' : ' '
          }]`}</Text>
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
      <Text>{`We have ${completedCount} completed todos`}</Text>
      <Text>{`We have ${incompleteCount} incomplete todos`}</Text>
      <Text style={{marginTop: 20, textAlign: 'center'}}>Archived Todos</Text>
      {archivedTodos.map((todo, index) => (
        <TouchableOpacity key={index} onPress={() => unarchiveTodo(todo)}>
          <Text>{`${index + 1}. ${todo.text} [${
            todo.completed ? 'X' : ' '
          }]`}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default Home;
