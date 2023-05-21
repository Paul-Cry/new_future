export const state = () => ({
  cards: [{
    image: null
  }],
  api: 'http://localhost:1000'
})

export const mutations = {
  SET_DATA(state, data){
    const updata = data.map((element)=>{
      element.image = `${state.api}/img/${element.image}`
      return element
    })
   
    state.cards = updata
  }
}

export const actions = {
  getData({state, commit}) {
    fetch(`${state.api}/cards_get`)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Ошибка при выполнении запроса');
        }
      })
      .then(data => {
        // Обработка полученных данных
        commit("SET_DATA", data)

      })
      .catch(error => {
        // Обработка ошибки
        console.error(error);
      });

  }
}

export const getters = {

}
