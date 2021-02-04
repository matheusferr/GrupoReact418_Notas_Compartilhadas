import firestore from '@react-native-firebase/firestore';

class NoteService {
  constructor() {
    //  Cria ou utiliza (caso já exista) a coleção "notes" no Firebase;
    this.collection = firestore().collection('notes');
  }

  /*
   *  Note que todos os métodos dessa classe retornam uma Promise, sendo esta assíncrona, portanto,
   *  deve-se aguardar a conclusão da mesma por meio da palavra await ou do método then (então).
   */

  getAllNotes() {
    //  Seleciona todas as notas por data em ordem crescente;
    return this.collection.orderBy('date', 'asc').get();
  }

  addNewNote(data) {
    //  Insere uma nova nota na coleção;
    return this.collection.add(data);
  }

  updateNote(data, id) {
    //  Atualiza uma nota da coleção;
    return this.collection.doc(id).update(data);
  }

  deleteNote(id) {
    //  Deleta uma nota específica da coleção;
    return this.collection.doc(id).delete();
  }

  deleteAll() {
    //  Deleta todas as notas da coleção;
    return this.collection.get().then((data) => {
      data.forEach(({ id }) => {
        this.collection.doc(id).delete();
      });
    });
  }
}

const noteService = new NoteService();

export default noteService;
