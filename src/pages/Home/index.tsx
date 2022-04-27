import React from 'react';
import {
  Platform, //saber qual plataforma o programa estar IOS/ANDROID
  Text, //digitar texto
  TextInput, //input
  TouchableOpacity, //botão
  View, //Como se fosse uma Div
  StyleSheet, //Estilizar
  SafeAreaView, //Como se fosse um container para pegar só a tela do celular.
  // ScrollView, Carrega tudo e rola pra baixo
  FlatList, //Carrega aos pouco a medida que vai rolando pra baixo
} from 'react-native';

interface Task{
  id: string;
  title: string;
}

export const Home = () => {
  const [newTask, setNewTask] = React.useState('')
  const [tasks, setTasks] = React.useState<Task[]>([])

  const handleAddNewTask = () => {
    const data = {
      id: String(new Date().getTime()),
      title: newTask ? newTask: 'Task empty',
    };

    setTasks([...tasks, data])

  }




  return(
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Bem-vindo, Dev</Text>
        <TextInput
          onChangeText={setNewTask}
          placeholderTextColor='#555'
          placeholder='Nova tarefa...'
          style={styles.input}
        />
        <TouchableOpacity
          onPress={handleAddNewTask}
          activeOpacity={0.7}
          style={styles.button}>
          <Text style={styles.buttonText}>Adicionar</Text>
        </TouchableOpacity>

        <Text style={styles.titleTasks}>Minhas Tarefas</Text>


        <FlatList
        data={tasks}
        keyExtractor={item => item.id}
        renderItem={({item}) =>(
          <TouchableOpacity style={styles.buttonTask}>
            <Text style={styles.titleTask}>
              {item.title}
            </Text>
          </TouchableOpacity>
        )}/>

        {/* <ScrollView>
        {tasks.map(task=>(
          <TouchableOpacity key={task.id} style={styles.buttonTask}>
            <Text style={styles.titleTask}>
              {task.title}
            </Text>
          </TouchableOpacity>
        ))}
        </ScrollView> */}


      </View>
    </SafeAreaView>

  )
};
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#121214',
  },
  container:{
    flex: 1,
    backgroundColor: '#121214',
    paddingHorizontal: 30,
    paddingVertical: 50,

  },
  title:{
    color: '#f1f1f1',
    fontSize: 24,
    fontWeight: 'bold',
  },
  titleTasks:{
    color: '#f1f1f1',
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 50,
  },
  input:{
    backgroundColor: '#29292e',
    color: '#f1f1f1',
    fontSize: 20,
    padding: Platform.OS === 'ios' ? 8 : 10,
    marginTop: 30,
    borderRadius: 10,
  },
  button:{
    backgroundColor:'#eba417',
    padding: 15,
    borderRadius: 7,
    alignItems: 'center',
    marginTop: 20,

  },
  buttonText:{
    color: '#121214',
    fontSize: 18,
    fontWeight: 'bold',

  },
  buttonTask:{
    backgroundColor: '#29292e',
    padding: 10,
    marginTop: 10,
    borderRadius: 50,
    alignItems: 'center',
  },
  titleTask:{
    color: '#f1f1f1',
    fontSize: 20,
    fontWeight: 'bold',
  }
})