import React from 'react';
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import {ITask, TasksContext, useTaskList} from '../../context/TasksContect';

export const TaskList = () => {
  // const {tasks} = React.useContext(TasksContext);
  const {tasks, removeTask} = useTaskList();

  const handleRemoveTask = (id: string) => {
    Alert.alert('Tem certeza?', 'Deseja Realmente Excluir a Tarefa?', [
      {
        text: 'Cancelar',
        onPress: () => {},
      },
      {
        text: 'Excluir',
        onPress: () => removeTask(id),
      },
    ]);
  };

  return (
    <FlatList
      data={tasks as unknown as ITask[]}
      keyExtractor={item => item.id}
      renderItem={({item}) => (
        <TouchableOpacity
          onPress={() => handleRemoveTask(item.id)}
          style={styles.buttonTask}>
          <Text style={styles.titleTask}>{item.title}</Text>
        </TouchableOpacity>
      )}
    />
  );
};

const styles = StyleSheet.create({
  buttonTask: {
    backgroundColor: '#29292e',
    padding: 10,
    marginTop: 10,
    borderRadius: 50,
    alignItems: 'center',
  },
  titleTask: {
    color: '#f1f1f1',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
