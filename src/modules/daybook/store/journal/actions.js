// export default myAction = async ({ commit }) => {
//
// }

import journalApi from "@/api/journal"

export const loadEntries = async ({ commit }) => {

    const { data } = await journalApi.get('/entries.json')
    const entries = []

    if (!data) {
        commit('setEntries', [])
        return
    }

    for (const id of Object.keys(data)) {
        entries.push({
            id,
            ...data[id]
        })
    }
    
    // TODO: sort desc by date

    commit('setEntries', entries)
}

export const updateEntry = async ({ commit }, entry) => {
    const {id, ...body} = entry
    
    await journalApi.put(`/entries/${id}.json`, body)

    commit('updateEntry', { ...entry })
}

export const createEntry = async ({ commit }, entry) => {
    
    const { data } = await journalApi.post('/entries.json', entry)
    
    commit('addEntry', { id: data.name, ...entry })

    return data.name
}


export const deleteEntry = async ({ commit }, id) => {

    await journalApi.delete(`/entries/${id}.json`)

    commit('removeEntry', id)

}
