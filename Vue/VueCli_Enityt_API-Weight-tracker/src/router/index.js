import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'

Vue.use(Auth, {
  issue: 'https://dev-914592.okta.com/oauth2/default',
  client_id: '0oarzv49mviiYppbt356',
  redirect_uri: 'http://localhost:8080/implicit/callback',
  scope: 'openid profile email'
})

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/implicit/callcack',
      component: Auth.handleCallBack()
    }
  ]
})

router.beforeEach(Vue.prototype.$auth.authRedirectGuard())

export default router