/* eslint-disable no-console */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { FlatList } from 'react-native';
import { Text } from 'react-native-paper';
import NoteCard from './components/NoteCard';
import noteService from '../../../../services/note.service';
import styles from './styles';

class NoteCardList extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      refreshing: false,
    };
  }

  onRefresh = () => {
    const { refresh } = this.props;
    //  Alterna o estado de atualização;
    this.setState({ refreshing: true });
    //  Atualiza a lista e redefine o estado de atualização;
    refresh(() => { this.setState({ refreshing: false }); });
  }

  onHandleSave = (message, id) => {
    const { list, refresh } = this.props;
    console.log(`saving item: ${id}`);
    noteService.updateNote(list, message, id).then(() => refresh());
  }

  onHandleDelete = (id) => {
    const { list, refresh } = this.props;
    console.log(`deleting item: ${id}`);
    noteService.deleteNote(list, id).then(() => refresh());
  }

  //  Extrai as chaves dos items;
  keyExtractor = ({ id }) => id

  //  Componente a ser renderizado por item;
  renderItem = ({ item }) => (
    <NoteCard
      key={item.id}
      onSave={this.onHandleSave}
      onDelete={this.onHandleDelete}
      content={item}
    />
  )

  render() {
    const { refreshing } = this.state;
    const { list } = this.props;
    return (
      <FlatList
        style={styles.container}
        data={list}
        keyExtractor={this.keyExtractor}
        renderItem={this.renderItem}
        removeClippedSubviews={false}
        contentContainerStyle={list.length === 0 ? styles.emptyList : null}
        ListEmptyComponent={(
          <Text style={styles.emptyListText}>Banco de notas vazio!</Text>
          )}
        onRefresh={this.onRefresh}
        refreshing={refreshing}
      />
    );
  }
}

NoteCardList.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    message: PropTypes.string,
    date: PropTypes.instanceOf(Date),
  })).isRequired,
  refresh: PropTypes.func.isRequired,
};

export default NoteCardList;
