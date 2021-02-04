import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Appbar } from 'react-native-paper';
import styles from './styles';

class ActionBar extends PureComponent {
  render() {
    const { addNote, deleteAll } = this.props;
    return (
      <Appbar style={styles.bottom}>
        <Appbar.Action
          icon="plus"
          onPress={addNote}
        />
        <Appbar.Action
          icon="delete"
          onPress={deleteAll}
        />
      </Appbar>
    );
  }
}

ActionBar.propTypes = {
  addNote: PropTypes.func.isRequired,
  deleteAll: PropTypes.func.isRequired,
};

export default ActionBar;
