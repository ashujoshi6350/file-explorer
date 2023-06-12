import React, { useState } from 'react';
import './rename-input.css'

export const RenameInputBox = ({ actionCallback, originalData, modifyNode, updateOriginalData, isFolder }) => {
  const [showError, setShowError] = useState(false);

  const renameItem = (event) => {
    setShowError(false);
    if (event.keyCode === 13) {
      const text = event.target.value.trim();
      if (!text) {
        setShowError(true);
        return
      }
      let updatedData = modifyNode(originalData, text);
      updateOriginalData(updatedData);
      actionCallback(false);
    }
  }

  const handleOutsideClick = () => {
    actionCallback(false);
    setShowError(false);
  }

  return (
    <div>
      <input className='item-text'
        type={'text'}
        aria-label={`Rename ${isFolder ? 'folder' : 'file'}`}
        autoFocus
        onKeyDown={renameItem}
        onBlur={handleOutsideClick}
      />
      {showError && <div className='error'>{`${isFolder ? 'Folder' : 'File'} name must be provided`}</div>}
    </div>
  )
}