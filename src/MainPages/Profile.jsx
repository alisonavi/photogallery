import React, { useEffect, useState } from 'react'
import { auth, db } from '../db/DataBase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { Button, Fab, Modal } from '@material-ui/core'
import AddIcon from '@mui/icons-material/Add';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getDocs, collection, addDoc, serverTimestamp, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import EditIcon from '@mui/icons-material/Edit';


const Profile = () => {
  const [folderList, setFolderList] = useState([]);
  const [folderName, setFolderName] = useState("");
  const [isCheckedForPrivacy, setIsCheckedForPrivacy] = useState(false);
  const foldersCollectionRef = collection(db, "folders");

  const [updatedFolder, setUpdatedFolder] = useState("");
  const [updatedCheckingForPrivacy, setUpdatedCheckingForPrivacy] = useState(false);
  const getFolder = async () => {
    try {
      const data = await getDocs(foldersCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }))
        .sort((a, b) => b.timestamp - a.timestamp);
      setFolderList(filteredData);
    } catch (err) {
      console.error(err);
    }
  }
  useEffect(() => {
    getFolder();
  }, []);

  const navigate = useNavigate();
  const [user] = useAuthState(auth);
  const [isPopUpVisible, setIsPopUpVisible] = useState(false);
  const [isFolderPopUpVisible, setIsFolderPopUpVisible] = useState(false);

  const [selectedFolder, setSelectedFolder] = useState(null);

  const openChangeFolder = (folder) => {
    setSelectedFolder(folder);
    setIsFolderPopUpVisible(true);
  }
  const closeChangeFolder = () => {
    setIsFolderPopUpVisible(false);
  }

  const handleOpenPopUp = () => {
    setIsPopUpVisible(true);
  }

  const handleClosePopUp = () => {
    setIsPopUpVisible(false);
  }


  const onCreateFolder = async () => {
    try {
      await addDoc(foldersCollectionRef, {
        name: folderName,
        hidden: isCheckedForPrivacy,
        timestamp: serverTimestamp(),
      });
      getFolder();
      handleClosePopUp();
    } catch (err) {
      console.error(err);
    }
  }
  const deleteFolder = async (id) => {
    try {
      const folderDoc = doc(db, "folders", id);
      await deleteDoc(folderDoc);

      // Update the state to remove the deleted folder
      setFolderList((prevFolders) => prevFolders.filter((folder) => folder.id !== id));
      closeChangeFolder();
    } catch (err) {
      console.error(err);
    }
  };
  const updateFolder = async (id) => {
    try {
      const folderDoc = doc(db, "folders", id);
      await updateDoc(folderDoc, {
        name: updatedFolder,
        hidden: updatedCheckingForPrivacy
      });

      // Update the local state to reflect the updated folder name
      setFolderList((prevFolders) =>
        prevFolders.map((folder) =>
          folder.id === id ? { ...folder, name: updatedFolder } : folder
        )
      );
      closeChangeFolder();
    } catch (err) {
      console.error(err);
    }
  };


  return (
    <div className='profile'>
      <img className='profilePictureOnProfilePage' src={user?.photoURL || ""} height="70px" width="70px" />
      <p className='userNameOnProfilePage' > {user?.displayName} </p>
      <Fab size="medium" color="secondary" aria-label="add" className='Fab' onClick={handleOpenPopUp} >
        <AddIcon />
      </Fab>
      <div >
        <Modal
          open={isPopUpVisible}
          onClose={handleClosePopUp}
          className='divForCreatingFoldersOnProfilePage'
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div className='popUpDiv'>
            <p className='creatingAFolder'> Creating a folder </p>
            <form className='formForACreatingFolder'>
              <p className='name'> Name: </p>
              <input type='text'
                required className='inputForFolders'
                placeholder='For example: "Wonyoung avi pics"'
                onChange={(e) => setFolderName(e.target.value)} >
              </input>
            </form>
            <div className='divForCheckBox'>
              <input type='checkbox'
                id='checkBoxForPrivacy'
                className='checkBoxForPrivacy'
                checked={isCheckedForPrivacy}
                onChange={(e) => setIsCheckedForPrivacy(e.target.checked)}
              />
              <label htmlFor='checkBoxForPrivacy' className='keepTheFolderHidden'> Keep the folder hidden </label>
              <p className='onlyYou'> Only you can see this folder.</p>
            </div>
            <button
              className='create'
              onClick={onCreateFolder}> Create </button>
          </div>
        </Modal>
      </div>
      <p className='createANewfolderOnProfilePage'> Create a new folder </p>
      <div className='yourFoldersOnProfilePage'>
        <h1 className='yourFoldersH1OnProfilePage'>
          Your folders:
        </h1>
        <div className='foldersOnProfilePage'>
          {folderList.map((folder) => (
            <div key={folder.id} className='divInDiv'>
              <a className="foldersName" onClick={() => navigate(`/folders/${folder.name}`)}>{folder.name}</a>
              <Button className='editFolderButton' onClick={() => openChangeFolder(folder)}>
                <EditIcon />
              </Button>
              <div className='changeFolder'>
                <Modal
                  open={isFolderPopUpVisible && selectedFolder === folder}
                  onClose={closeChangeFolder}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <div className='popUpChangeFolder'>
                    <p className='editingTheFolder'>
                      Editing the folder
                    </p>
                    <p className='name'>
                      Name
                    </p>
                    <input
                      className='inputForChangingFolder'
                      placeholder={folder.name}
                      onChange={(e) => setUpdatedFolder(e.target.value)} />
                    <button onClick={() => updateFolder(folder.id)}>
                      OK
                    </button>
                    <div className='divForCheckBoxForFolders'>
                      <input type='checkbox'
                        id='checkBoxForPrivacy2'
                        className='checkBoxForPrivacyInFolders'
                        checked={updatedCheckingForPrivacy}
                        onChange={(e) => setUpdatedCheckingForPrivacy(e.target.checked)}
                      />
                      <label
                        htmlFor='checkBoxForPrivacy2'
                        className='keepTheFolderHiddenInFolders'>
                        Keep the folder hidden
                      </label>
                    </div>
                    <Button onClick={() => deleteFolder(folder.id)} className='deleteFolder'>
                      Delete folder
                    </Button>
                  </div>
                </Modal>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Profile

