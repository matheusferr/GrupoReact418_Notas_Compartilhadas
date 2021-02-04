/* eslint-disable no-console */
import React, { PureComponent, createRef } from 'react';
import { SafeAreaView } from 'react-native';
import { noteService } from '../../services';
import NoteCardList from './components/NoteCardList';
import ActionBar from './components/ActionBar';
import styles from './styles';

export default class Home extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      notes: [],
    };

    this.flatRef = createRef();
  }

  componentDidMount() {
    //  Atualiza a lista ao iniciar o App;
    this.refresh();
  }

  refresh = (callback = null) => {
    /*
     *  Recebe todas as notas do Firestore (SELECT * FROM ...) e então as formata em um modelo
     *  simplificado;
     */
    noteService.getAllNotes().then((data) => {
      //  Constante auxiliar para o armazenamento dos valores formatados;
      const newNotes = [];

      /*
       *  Formata todos os items do objeto data. Não é possível utilizar o método map pois data não
       *  é um array;
       */
      data.forEach((snapshot) => {
        const { message, date } = snapshot.data();
        newNotes.push({
          id: snapshot.id,
          message,
          date,
        });
      });

      //  Salva o array formatado no state;
      this.setState({ notes: newNotes });

      /*
       *  Executa o callback caso o mesmo não seja nulo, em outras palavtas, caso callback tenha
       *  sido passado como argumento desta função;
       */
      if (callback) callback();
    });
  }

  deleteAll = () => {
    //  Deleta todas as notas do Firestore (DELETE FROM ...);
    noteService.deleteAll().then(() => {
      console.log('deleting all notes');
      //  Atualiza a lista;
      this.refresh();
    });
  }

  addNote = () => {
    // Cria uma nova nota com o modelo padrão;
    const newNote = {
      message: 'Digite algo',
      date: new Date(Date.now()),
    };

    // Cria a nota no Firestore (INSERT INTO ...);
    noteService.addNewNote(newNote).then(({ id }) => {
      console.log("Note's Id: ", id);
      //  Atualiza a lista;
      this.refresh();
    });
  }

  render() {
    const { notes } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <NoteCardList innerRef={this.flatRef} refresh={this.refresh} list={notes} />
        <ActionBar addNote={this.addNote} deleteAll={this.deleteAll} />
      </SafeAreaView>
    );
  }
}
