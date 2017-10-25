import App from 'App'

function errorLoading(err) {
  console.error('Dynamic page loading failed', err)
}
function loadRoute(cb) {
  return module => cb(null, module.default)
}

const routes = {
  component: App,
  childRoutes: [
    {
      path: '/',
      getComponent(location, cb) {
        System.import('Home')
          .then(loadRoute(cb))
          .catch(errorLoading)
      }
    },
    {
      path: 'test',
      getComponent(location, cb) {
        System.import('Test')
          .then(loadRoute(cb))
          .catch(errorLoading)
      }
    }
  ]
}

export default routes
