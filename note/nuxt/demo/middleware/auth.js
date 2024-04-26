export default (state) => {
  let { app, store, redirect } = state
  console.log('auth 2', state, app, store)
  store.commit('getToken')
  let token = store.state.token
  console.log('token', token)
  if (!token) {
    redirect("/login")
  }
}

/*
state : {
  isStatic : false ,
  isDev ,
  app : Object ,
  store : Object ,
  redirect : Function
}
*/