import React, {useState} from 'react';
import {View, TouchableOpacity, Button, Text, TextInput} from 'react-native';
import {useStoreActions, useStoreState} from 'easy-peasy';

const Home = () => {
  const {
    validTodos,
    archivedTodos,
    completedCount,
    currentContext,
    incompleteCount,
    archivedCount,
  } = useStoreState(state => state.todoList);
  const contextChange = useStoreActions(
    actions => actions.contextList.contextChange,
  );
  const clearTodos = useStoreActions(actions => actions.todoList.clearTodos);
  const addTodo = useStoreActions(actions => actions.todoList.addTodoAsync);
  const modifyTodo = useStoreActions(actions => actions.todoList.modifyTodo);
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
      <Text
        style={{textAlign: 'center'}}>{`My Todos [${currentContext}]`}</Text>
      {validTodos.map((todo, index) => (
        <TouchableOpacity key={index} onPress={() => modifyTodo(todo)}>
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
      <Text>{`We have ${completedCount - archivedCount} completed todos`}</Text>
      <Text>{`We have ${incompleteCount} incomplete todos`}</Text>
      <Text>{`We have ${archivedCount} archived todos`}</Text>
      <Text style={{marginTop: 20, textAlign: 'center'}}>Archived Todos</Text>
      {archivedTodos.map((todo, index) => (
        <TouchableOpacity key={index} onPress={() => unarchiveTodo(todo)}>
          <Text>{`${index + 1}. ${todo.text} [${
            todo.completed ? 'X' : ' '
          }]`}</Text>
        </TouchableOpacity>
      ))}
      <Button onPress={() => clearTodos()} title="Clear All Todos" />
      <Button onPress={() => contextChange()} title="Switch context" />
    </View>
  );
};

export default Home;
