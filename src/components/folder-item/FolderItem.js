import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { FiChevronDown, FiChevronRight, FiFolder, FiFileText, FiBookOpen, FiTrash, FiEdit2, FiFilePlus, FiFolderPlus } from 'react-icons/fi';
import { RenameInputBox } from '../rename-input/RenameInputBox';
import './folder-item.css';

const FolderItem = ({ data, originalData, updateOriginalData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isRename, setIsRename] = useState(false);
  const [showAddInput, setShowAddInput] = useState({ visible: false, isFolder: null });

  const { isFolder, name, items, id, isRoot } = data;

  const toggleExpansion = () => {
    setIsOpen(!isOpen);
  }

  const handleRenameClick = (event) => {
    event.stopPropagation();
    setIsRename(true);
  }

  const handleAddClick = (event, isFolder) => {
    event.stopPropagation();
    setIsOpen(true);
    setShowAddInput({
      visible: true,
      isFolder
    });
  }

  const addItem = (event) => {
    if (event.keyCode === 13) {
      const text = event.target.value.trim();
      if (!text) {
        setShowAddInput({ ...showAddInput, visible: false });
        return
      }
      let updatedData = insertNode(originalData, text, showAddInput.isFolder);
      updateOriginalData(updatedData);
      setShowAddInput({ ...showAddInput, visible: false });
    }
  }

  const insertNode = (node, itemName, isFolder) => {
    if (node.id === id) {
      node.items.unshift({
        id: uuidv4(),
        name: itemName,
        isFolder,
        items: []
      });
      return node;
    }
    let latestNode = [];
    latestNode = node.items.map(obj => {
      return insertNode(obj, itemName, isFolder);
    })
    return { ...node, items: latestNode };
  }

  const deleteNode = (node) => {
    if (node.id === id) {
      return null;
    }
    if (node.items && node.items.length > 0) {
      node.items = node.items.filter(item => deleteNode(item));
    }
    return {...node};
  }

  const modifyNode = (node, itemNewName) => {
    if (node.id === id) {
      let updatedNode = { ...node, name: itemNewName }
      return updatedNode;
    }
    let latestNode = [];
    latestNode = node.items.map(obj => {
      return modifyNode(obj, itemNewName);
    })
    return { ...node, items: latestNode };
  }

  const handleDeleteClick = (event) => {
    event.stopPropagation();
    let updatedData = deleteNode(originalData);
    updateOriginalData(updatedData);
  }

  if (isFolder) {
    return (
      <div className='item'>
        <div className='container__item-title item-folder' onClick={toggleExpansion}>
          <div className='item-title'>
            {isRoot ? (isOpen ? <FiChevronDown/> : <FiChevronRight/>) : (isOpen ? <FiBookOpen/> : <FiFolder/>)}
            {
              isRename ? <RenameInputBox
                actionCallback={setIsRename}
                originalData={originalData}
                modifyNode={modifyNode}
                updateOriginalData={updateOriginalData}
                isFolder={isFolder}
              /> : <div className={`item-text prevent-text-selection ${isRoot ? 'title' : ''}`} aria-label={name}>
                {name}
              </div>
            }
          </div>
          <div className='btn-container'>
            {!isRoot && (
              <FiEdit2 className='btn-icon' aria-label='Edit' onClick={handleRenameClick}/>
            )}
            <FiFilePlus className='btn-icon' aria-label='Add file' onClick={e => handleAddClick(e, false)}/>
            <FiFolderPlus className='btn-icon' aria-label='Add folder' onClick={e => handleAddClick(e, true)}/>
            {!isRoot && (
              <FiTrash className='btn-icon' aria-label='Delete' onClick={handleDeleteClick}/>
            )}
          </div>
        </div>
        <div className={`${isOpen ? 'show-sub-items' : 'hide-sub-items'}`}>
          {showAddInput.visible && (
            <div className='item item-title'>
              <span>{showAddInput.isFolder ? <FiFolder/> : <FiFileText/>}</span>
              <input className='item-text'
                aria-label='Enter new file or folder name'
                type={'text'}
                autoFocus
                onKeyDown={addItem}
                onBlur={() => setShowAddInput({...showAddInput, visible: false})}
              />
            </div>
          )}
          {items.map(item => {
            return (
              <FolderItem data={item} key={item.id} originalData={originalData} updateOriginalData={updateOriginalData}/>
            );
          })}
        </div>
      </div>
    )
  } else {
    return <div className='item container__item-title'>
      <div className='item-title'>
        <FiFileText/>
        {
          isRename ? <RenameInputBox
            actionCallback={setIsRename}
            originalData={originalData}
            modifyNode={modifyNode}
            updateOriginalData={updateOriginalData}
            isFolder={isFolder}
          /> : <div className='item-text text' aria-label={name}>
            {name}
          </div>
        }
      </div>
      <div className='btn-container'>
        <FiEdit2 className='btn-icon' aria-label='Edit' onClick={handleRenameClick}/>
        <FiTrash className='btn-icon' aria-label='Delete' onClick={handleDeleteClick}/>
      </div>
    </div>
  }
}

export default FolderItem;
