
export default function orderBy(data, type, direction){

  const typeDirection = type + '/' + direction;

  switch(typeDirection){

    case 'DATE/DESC': {
      const sortedArray = data.slice().sort((a, b) => b.created_at - a.created_at);
      return sortedArray;
    }

    case 'DATE/ASC': {
      const sortedArray = data.slice().sort((a, b) => a.created_at - b.created_at);
      return sortedArray;
    }

    case 'A-Z/DESC': {
      const sortArray = data.slice().sort(function(a, b) {
        return b.title.localeCompare(a.title);
      });

      return sortArray;
    }

    case 'A-Z/ASC': {
      const sortArray = data.slice().sort(function(a, b) {
        return a.title.localeCompare(b.title);
      });

      return sortArray;
    }

    default: {
      return data;
    }
  }
};
