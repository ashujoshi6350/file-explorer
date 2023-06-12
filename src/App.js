import { useState } from 'react';
import data from './data/mockData';
import './App.css';
import FolderItem from './components/folder-item/FolderItem';

function App() {
  const [explorerData, setExplorerData] = useState(data);

  return (
    <div className='App'>
      <div className='page'>
        <div className='item-container'>
          <FolderItem data={explorerData} originalData={explorerData} updateOriginalData={setExplorerData}/>
        </div>
      </div>
    </div>
  );
}

export default App;
