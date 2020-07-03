import React, { useCallback } from 'react';

import{ IComment } from '../../../../../../store/ducks/comments/types';

import { AccountCircle, Edit, Delete} from '@material-ui/icons';

import { Container, Options, Info  } from './styles';
import { useComments } from '../../../../../../hooks/commentsContext';

interface StateProps {
  comment: IComment;
  setIsOpen: (comment: IComment) => void;
}

const Comment: React.FC<StateProps> = ({comment, setIsOpen}) => {

  const { deleteComment } = useComments();

  const formatDate = useCallback((created_at: Date) => {
    const date = new Date(created_at);
    return date.toLocaleDateString();
  }, []);

  return (
    <Container>
      <span>
        <AccountCircle />
      </span>
      <Info>
        <strong>
          {comment.author}
          <span>published on {formatDate(comment.created_at)}</span>
        </strong>
        <p>{comment.body}</p>

        <Options>
          <Edit onClick={ () => setIsOpen(comment)} />
          <Delete onClick={ () => deleteComment(comment.id)} />
        </Options>
      </Info>
    </Container>
  );
};

export default Comment;
