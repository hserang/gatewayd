
module.exports = function(controllers, router) {
  return function mapCRUD(resource) {
    console.log('RESOURCE', resource);
    console.log('RESOURCE', controllers[resource]);
    router.get('/' + resource, controllers[resource].index);
    router.post('/' + resource, controllers[resource].create);
    router.get('/' + resource + '/:id', controllers[resource].show);
    router.put('/' + resource + '/:id', controllers[resource].update);
    router.delete('/' + resource + '/:id', controllers[resource].destroy);
  }
}

