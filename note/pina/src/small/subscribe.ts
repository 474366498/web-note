

export function addSubscription(subscriptions: Array<Function> = [], callback: Function) {
  console.log('subscribe 4', callback)
  subscriptions.push(callback)

  const removeSubscription = () => {
    const idx = subscriptions.indexOf(callback)
    if (idx > -1) {
      subscriptions.splice(idx, 1)
    }
  }

  return removeSubscription
}


export function triggerSubscriptions(subscription: Array<Function>, ...args: Array<any>) {
  subscription.slice().forEach(cb => cb(...args))
}


