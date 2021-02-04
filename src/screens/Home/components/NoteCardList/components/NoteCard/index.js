import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  Button, Card, Paragraph, TextInput,
} from 'react-native-paper';
import moment from 'moment';
import styles from './styles';

class NoteCard extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isEditing: false,
      currentMessage: props.content.message,
    };
  }

  //  Salva o texto digitado no state;
  handleTextChange = (text) => this.setState({ currentMessage: text })

  //  Habilita a edição da nota;
  openEditor = () => this.setState({ isEditing: true });

  //  Executa o método on delete com o id da nota como parâmetro
  handleDelete = () => {
    const { content, onDelete } = this.props;
    onDelete(content.id);
  }

  handleSave = () => {
    const { currentMessage } = this.state;
    const { content, onSave } = this.props;

    //  Cancela a edição caso não tenha alteração;
    if (currentMessage !== content.message) {
      onSave(currentMessage, content.id);
      this.setState({
        isEditing: false,
      });
    }
  }

  handleCancel = () => {
    const { content } = this.props;

    //  Desabilita a edição da nota e redefine o texto digitado;
    this.setState({
      isEditing: false,
      currentMessage: content.message,
    });
  }

  render() {
    const { isEditing, currentMessage } = this.state;
    const { content } = this.props;

    //  O módulo moment.js é utilizado para formatar as datas das notas;
    return (
      <Card style={styles.card}>
        <Card.Title
          title={content.id}
          subtitle={moment(content.date).format('DD/MM/YY')}
        />
        <Card.Content>
          {!isEditing ? (<Paragraph>{content.message}</Paragraph>)
            : (
              <TextInput
                value={currentMessage}
                onChangeText={this.handleTextChange}
                mode="flat"
                multiline
              />
            )}
        </Card.Content>
        <Card.Actions>
          {!isEditing ? (
            <>
              <Button
                icon="pencil"
                color="#fecd1a"
                onPress={this.openEditor}
                mode="contained"
              >
                Edit
              </Button>
              <Button
                icon="delete"
                color="#f05454"
                style={styles.deleteButton}
                onPress={this.handleDelete}
                mode="contained"
              >
                Delete
              </Button>
            </>
          ) : (
            <>
              <Button
                icon="content-save"
                color="#4caf50"
                onPress={this.handleSave}
                mode="contained"
              >
                Save
              </Button>
              <Button
                icon="close"
                color="#f05454"
                style={styles.deleteButton}
                onPress={this.handleCancel}
                mode="contained"
              >
                Cancel
              </Button>
            </>
          )}
        </Card.Actions>
      </Card>
    );
  }
}

NoteCard.propTypes = {
  content: PropTypes.shape({
    id: PropTypes.string,
    date: PropTypes.shape({
      nanoseconds: PropTypes.number,
      seconds: PropTypes.number,
    }),
    message: PropTypes.string,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default NoteCard;
