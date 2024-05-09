export default (App) => {
  let { app, store, redirect } = App
  console.log('auth 2', App, app, store)
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