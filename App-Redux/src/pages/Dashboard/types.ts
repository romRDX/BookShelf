import { IBook } from '../../store/ducks/books/types';
import { Dispatch } from 'redux';

interface StateProps {
  books: IBook[];
}

interface DispatchProps {
  dispatch: Dispatch;
}

export type Props = StateProps & DispatchProps;

export interface State {
  books: {
    data: IBook[]
  }
}
