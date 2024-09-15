import { useEffect, useState } from "react"
import { WithContext as ReactTags } from 'react-tag-input';

const KeyCodes = {
    comma: 188,
    enter: 13
  };
  
const delimiters = [KeyCodes.comma, KeyCodes.enter];

function TagSelector({addTags, exTags = []}) {


    const [tags, setTags] = useState([]);

    useEffect(() => {
      const newTags = exTags.map(tag => ({ id: tag, text: tag }));
      setTags(() => newTags);
  }, [])
    
    useEffect(() => {
        addTags(tags)

    }, [tags])

    

    const handleDelete = i => {
        setTags(tags.filter((tag, index) => index !== i));
      };
    
      const handleAddition = (tag) => {
        setTags([tag, ...tags]);
      };
    
      const handleDrag = (tag, currPos, newPos) => {
        const newTags = tags.slice();
    
        newTags.splice(currPos, 1);
        newTags.splice(newPos, 0, tag);
    
        // re-render
        setTags(newTags);
      };
    
      const handleTagClick = index => null;

  return (
    <ReactTags
          tags={tags}
          delimiters={delimiters}
          handleDelete={handleDelete}
          handleAddition={handleAddition}
          handleDrag={handleDrag}
          handleTagClick={handleTagClick}
          inputFieldPosition="bottom"
          autocomplete
          placeholder="Introduzca un tag"
        />
  )
}

export default TagSelector