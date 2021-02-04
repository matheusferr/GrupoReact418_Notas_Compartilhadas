/* eslint-disable no-console */
import React, { PureComponent } from 'react';
import { SafeAreaView } from 'react-native';
import noteService from '../../services';
import autoID from './utils/autoID';
import NoteCardList from './components/NoteCardList';
import ActionBar from './components/ActionBar';
import styles from './styles';

export default class Home extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      notes: [],
    };
  }

  componentDidMount() {
    //  Atualiza a lista ao iniciar o App;
    this.refresh();
  }

  refresh = (callback) => {
    /*
     *  Recebe todas as notas do SQLite (SELECT * FROM ...) e então as formata em um modelo
     *  simplificado;
     */
    noteService.getAllNotes().then((data) => {
      //  Variável auxiliar para o armazenamento dos valores formatados;
      let newNotes = [];

      //  Converte data de volta para array;
      const notes = JSON.parse(data);

      if (notes) {
        //  Formata todos os items do objeto data.
        newNotes = JSON.parse(data).map((note) => ({
          ...note,
          date: new Date(Date.parse(note.date)),
        }));
      }
      //  Salva o array formatado no state;
      this.setState({ notes: newNotes });

      // Executa o callback caso o mesmo tenha sido passado como argumento desta função;
      if (callback) callback();
    });
  }

  deleteAll = () => {
    //  Deleta todas as notas do SQLite (DELETE FROM ...);
    noteService.deleteAll().then(() => {
      console.log('deleting all notes');
      //  Atualiza a lista;
      this.refresh();
    });
  }

 addNote = () => {
   const { notes } = this.state;
   // Cria uma nova nota com o modelo padrão;
   const newNote = {
     id: autoID(),
     message: 'Digite algo',
     date: new Date(Date.now()),
   };

   // Cria a nota no SQLite (INSERT INTO ...);
   noteService.addNewNote(notes, newNote).then(() => {
     console.log("Note's Id: ", newNote.id);
     //  Atualiza a lista;
     this.refresh();
   });
 }

 render() {
   const { notes } = this.state;
   return (
     <SafeAreaView style={styles.container}>
       <NoteCardList refresh={this.refresh} list={notes} />
       <ActionBar addNote={this.addNote} deleteAll={this.deleteAll} />
     </SafeAreaView>
   );
 }
}
