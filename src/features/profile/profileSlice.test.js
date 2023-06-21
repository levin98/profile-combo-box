import reducer, { add, update, remove, selectProfile } from './profileSlice'

test('should return the initial state', () => {
    expect(reducer(undefined, { type: undefined })).toEqual({ profiles: [{ id: 1, name: 'Profile 1' }], selectedProfileID: 1 })
})

test('should handle add', () => {
    expect(reducer({ profiles: [{ id: 1, name: 'Profile 1' }], selectedProfileID: 1 }, add({ id: 2, name: 'Profile 2' }))).toEqual({
        profiles: [{ id: 2, name: 'Profile 2' }, { id: 1, name: 'Profile 1' }],
        selectedProfileID: 2,
    })
})

test('should handle update', () => {
    expect(reducer({ profiles: [{ id: 1, name: 'Profile 1' }], selectedProfileID: 1 }, update({ id: 1, name: 'Profile 2' }))).toEqual({
        profiles: [{ id: 1, name: 'Profile 2' }],
        selectedProfileID: 1,
    })
})

test('should handle remove', () => {
    expect(reducer({ profiles: [{ id: 1, name: 'Profile 1' }, { id: 2, name: 'Profile 2' }], selectedProfileID: 2 }, remove(2))).toEqual({
        profiles: [{ id: 1, name: 'Profile 1' }],
        selectedProfileID: 1,
    })
})

test('should handle remove with only one profile', () => {
    expect(reducer({ profiles: [{ id: 1, name: 'Profile 1' }], selectedProfileID: 1 }, remove(1))).toEqual({
        profiles: [{ id: 1, name: 'Profile 1' }],
        selectedProfileID: 1,
    })
})

test('should handle select profile', () => {
    expect(reducer({ profiles: [{ id: 1, name: 'Profile 1' }, { id: 2, name: 'Profile 2' }], selectedProfileID: 2 }, selectProfile(1))).toEqual({
        profiles: [{ id: 1, name: 'Profile 1' }, { id: 2, name: 'Profile 2' }],
        selectedProfileID: 1,
    })
})