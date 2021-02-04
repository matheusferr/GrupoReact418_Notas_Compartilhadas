import AsyncStorage from '@react-native-async-storage/async-storage';

/*
 *  Para fins demonstrativos, foi utilizado o Async Storage para simular as ações do Firestore.
 *  Caso queira migrar para o Firebase, clone o branch Firebase e siga as instruções de instalação
 *  em https://cbt-ifsp-tcc-react.netlify.app/notascompartilhadas.
 */
class NoteService {
  /*
     *  Note que todos os métodos dessa classe retornam uma Promise, sendo esta assíncrona,
     *  portanto, deve-se aguardar a conclusão da mesma por meio da palavra await ou do método
     *  then (então).
     */

  //  Seleciona todas as notas
  getAllNotes = () => AsyncStorage.getItem('@notes')

  //  Insere uma nova nota na coleção;
  addNewNote = (data, note) => {
    data.push(note);
    return AsyncStorage.setItem('@notes', JSON.stringify(data));
  }

  updateNote = (data, newMessage, id) => {
    //  Atualiza uma nota da coleção;
    const noteIndex = data.findIndex((item) => item.id === id);
    // eslint-disable-next-line no-param-reassign
    data[noteIndex].message = newMessage;
    return AsyncStorage.setItem('@notes', JSON.stringify(data));
  }

  deleteNote = (data, id) => {
    const noteIndex = data.findIndex((item) => item.id === id);
    data.splice(noteIndex, 1);
    //  Deleta uma nota específica da coleção;
    return AsyncStorage.setItem('@notes', JSON.stringify(data));
  }

  deleteAll = () => AsyncStorage.setItem('@notes', '');
}

const noteService = new NoteService();

export default noteService;
