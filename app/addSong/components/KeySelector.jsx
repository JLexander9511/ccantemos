import { useEffect, useState } from "react"
import { WithContext as ReactTags } from 'react-tag-input';

const KeyCodes = {
    comma: 188,
    enter: 13
  };

const delimiters = [KeyCodes.comma, KeyCodes.enter];

function KeySelector({addKeys, exKeys = []}) {
    const [key, setKey] = useState([]);

    useEffect(() => {
      const newKeys = exKeys.map(key => ({ id: key, text: key }));
      setKey(() => newKeys);
  }, [])
    
    useEffect(() => {
        addKeys(key)
    }, [key])
    

    const handleDelete = i => {
        setKey(key.filter((key, index) => index !== i));
      };
    
      const handleAddition = keys => {
        setKey([...key, keys]);
        
      };
    
      const handleDrag = (keys, currPos, newPos) => {
        const newKeys = key.slice();
    
        newKeys.splice(currPos, 1);
        newKeys.splice(newPos, 0, keys);
    
        // re-render
        setKey(newKeys);
      };
    
      const handleTagClick = index => null;


  return (
    <ReactTags
          tags={key}
          delimiters={delimiters}
          handleDelete={handleDelete}
          handleAddition={handleAddition}
          handleDrag={handleDrag}
          handleTagClick={handleTagClick}
          inputFieldPosition="bottom"
          autocomplete
          placeholder="Introduzca un tono"
        />
  )
}

export default KeySelector