import { IBook } from '../../store/ducks/books/types';
import { Dispatch } from 'redux';

interface StateProps {
  books: IBook[];
}

interface DispatchProps {
  dispatch: Dispatch;
}

interface LocationProps {
  location: {
    state: string;
  };
}

export type Props = StateProps & DispatchProps & LocationProps;

export interface State {
  books: {
    data: IBook[]
  }
}
