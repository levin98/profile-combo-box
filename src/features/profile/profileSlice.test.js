import reducer, { add, update, remove, selectProfile, setRename, setRenameText } from './profileSlice'

const initialState = { 
    profiles: [{ id: 1, name: 'Profile 1' }], 
    selectedProfileID: 1, 
    rename: false, 
    renameText: '',
}

const initialStateWithMultipleProfiles = {
    ...initialState,
    profiles: [{ id: 1, name: 'Profile 1' }, { id: 2, name: 'Profile 2' }],
}

test('should return the initial state', () => {
    expect(reducer(undefined, { type: undefined })).toEqual(initialState)
})

test('should handle add', () => {
    expect(reducer(initialState, add({ id: 2, name: 'Profile 2' }))).toEqual({
        ...initialState,
        profiles: [{ id: 2, name: 'Profile 2' }, { id: 1, name: 'Profile 1' }],
        selectedProfileID: 2,
    })
})

test('should handle update', () => {
    expect(reducer(initialState, update({ id: 1, name: 'Profile 2' }))).toEqual({
        ...initialState,
        profiles: [{ id: 1, name: 'Profile 2' }],
    })
})

test('should handle remove', () => {
    expect(reducer(initialStateWithMultipleProfiles, remove(2))).toEqual(initialState)
})

test('should handle remove with only one profile', () => {
    expect(reducer(initialState, remove(1))).toEqual(initialState)
})

test('should handle select profile', () => {
    expect(reducer(initialStateWithMultipleProfiles, selectProfile(2))).toEqual({
        ...initialStateWithMultipleProfiles,
        selectedProfileID: 2,
    })
})

test('should handle set rename', () => {
    expect(reducer(initialState, setRename(true))).toEqual({
        ...initialState,
        rename: true,
    })
})

test('should handle set rename text', () => {
    expect(reducer(initialState, setRenameText('Profile 2'))).toEqual({
        ...initialState,
        renameText: 'Profile 2',
    })
})