import React, { useCallback } from 'react';
// import * as commentStore from '../../../../../../services/commentStore';

import{ IComment } from '../../../../../../store/ducks/comments/types';

import { AccountCircle, Edit, Delete} from '@material-ui/icons';

import { Container, Options, Info  } from './styles';

interface StateProps {
  comment: IComment;
  handleEditComment: (updatedComment: IComment) => void;
  handleDeleteComment: (commentId: string) => void;
  setIsOpen: (comment: IComment) => void;
}

const Comment: React.FC<StateProps> = ({comment, handleDeleteComment, handleEditComment, setIsOpen}) => {

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
          <Delete onClick={ () => handleDeleteComment(comment.id)} />
        </Options>
      </Info>
    </Container>
  );
};

export default Comment;
