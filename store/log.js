export const state = () => ({
  user: {
    name: '',
    password: '',
  },
  $nuxt: null,
  api: 'http://localhost:1000'
})

export const mutations = {
  loginUser(state, data) {
    console.log('DATA USER')
    console.log(data)
    state.user.name = data.user
    window.$nuxt.$root.$loading.finish();
    this.$router.push("/");
  },
  exit(state){
    window.$nuxt.$root.$loading.start();
    window.location.reload();
    state.user = ''
    setTimeout(()=>{
      window.$nuxt.$root.$loading.finish();
    }, 500)
    
  }
  
}

export const actions = {
  checkAccount({ state, commit }, user) {
    return new Promise((resolve, reject) => {
      fetch('https://example.com/authenticate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: user.name,
          password: user.password
        })
      })
        .then(response => response.json())
        .then(data => {
          console.log('password')
          console.log(data)
        })
        .catch(error => console.error(error));
    })

  },
  login({ state, commit, rootState  }, user) {
  
    window.$nuxt.$root.$loading.start();
    fetch(`${state.api}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: user.name,
        password: user.password
      }),
    })
      .then(response => {
        if (response.ok) {
          console.log('Успешно');
          return response.json();
        } else {
          window.$nuxt.$root.$loading.finish();
          throw new Error('Ошибка при выполнении запроса');
        }
      })
      .then(data => {
        // Обработка успешного ответа
      
        commit('loginUser', data)
      })
      .catch(error => {
        // Обработка ошибки
        console.error(error);
      });
    // this.$nextTick(() => {
    //   this.$nuxt.$loading.start();
    //   this.getData().then(()=>{
    //   })
    // })

  },
  registr({state, commit}, user){
    window.$nuxt.$root.$loading.start();
    fetch(`http://localhost:1000/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: user.name,
        password: user.password
      }),
    })
      .then(response => {
        if (response.ok) {
          console.log('Успешно');
          return response.json();
        } else {
         
          throw new Error('Ошибка при выполнении запроса');
        }
      })
      .then(data => {
        // Обработка успешного ответа
      
        commit('loginUser', data)
      })
      .catch(error => {
        // Обработка ошибки
        console.error(error);
      });
  }

}

export const getters  = {
  getUserName: (state) => {
    return state.user.name;
  }
}
