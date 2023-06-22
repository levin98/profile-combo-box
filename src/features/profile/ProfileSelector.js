import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsis } from '@fortawesome/free-solid-svg-icons'
import { useSelector, useDispatch } from 'react-redux'
import { add, update, remove, selectProfile, setRename, setRenameText } from './profileSlice'
import './ProfileSelector.css'

const ProfileSelector = () => {
    const dispatch = useDispatch()
    const profiles = useSelector(state => state.profile.profiles)
    const selectedProfileID = useSelector(state => state.profile.selectedProfileID)
    const rename = useSelector(state => state.profile.rename)
    const renameText = useSelector(state => state.profile.renameText)

    const addProfile = () => {
        const profile = {
            id: profiles.length + 1,
            name: `Profile ${profiles.length + 1}`,
        }
        dispatch(add(profile))
    }

    const duplicateProfile = () => {
        const newProfileName = `${profiles[profiles.length-selectedProfileID].name} Duplicate 1`
        const existingProfileNames = profiles.filter(n => n.name === newProfileName || n.name.startsWith(`${newProfileName} (`))
        const profile = {
            id: profiles.length + 1,
            name: existingProfileNames.length === 0 ? newProfileName : `${newProfileName} (${existingProfileNames.length})`,
        }
        dispatch(add(profile))
    }

    const renameProfile = () => {
        dispatch(update({id: selectedProfileID, name: renameText}))
        dispatch(setRename(false))
        dispatch(setRenameText(''))
    }

    const deleteProfile = () => {
        dispatch(remove(selectedProfileID))
    }

    const onClickRename = () => {
        dispatch(setRenameText(profiles[profiles.length-selectedProfileID].name))
        dispatch(setRename(true))
    }

    return (
        <div>
            <label htmlFor="profile">Profile: </label>

            {!rename && (
                <>
                    <select name="profile" id="profile" value={selectedProfileID} onChange={e => dispatch(selectProfile(e.target.value))}>
                        {profiles.map(profile => (
                            <option key={profile.id} value={profile.id}>{profile.name}</option>
                        ))}
                    </select>

                    <div className="dropdown inline-block ml-3">
                        <button data-testid="option-button" className='bg-white px-1'><FontAwesomeIcon icon={faEllipsis} /></button>
                        <div className="dropdown-options hidden absolute bg-white">
                            <button className='px-1' onClick={addProfile}>Add</button><br />
                            <button className='px-1' onClick={onClickRename}>Rename</button><br />
                            <button className='px-1' onClick={duplicateProfile}>Duplicate</button><br />
                            <button className='px-1' onClick={deleteProfile}>Delete</button>
                        </div>
                    </div>
                </>
            )}

            {rename && (
                <>
                    <input name='profile' type="text" value={renameText} onChange={e => dispatch(setRenameText(e.target.value))} />
                    <button className='bg-white ml-2 px-1' onClick={renameProfile}>Save</button>
                </>
            )}  
            
            
        </div>
    )
}

export default ProfileSelector;