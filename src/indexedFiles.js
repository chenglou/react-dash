var indexedFiles = [
  {
    name: 'animation',
    type: 'Component',
    extraHeaders: [
      ['ReactCSSTransitionGroup', 'high-level-api-reactcsstransitiongroup'],
      ['ReactTransitionGroup', 'low-level-api-reacttransitiongroup'],
    ]
  },
  {name: 'two-way-binding-helpers', type: 'Mixin'},
  {
    name: 'class-name-manipulation',
    type: 'Extension',
    extraHeaders: [
      ['classSet', ''],
    ]
  },
  {name: 'test-utils', type: 'Test'},
  {name: 'clone-with-props', type: 'Extension'},
  {
    name: 'update',
    type: 'Extension',
    extraHeaders: [
      ['update.push', 'available-commands'],
      ['update.unshift', 'available-commands'],
      ['update.splice', 'available-commands'],
      ['update.set', 'available-commands'],
      ['update.merge', 'available-commands'],
      ['update.apply', 'available-commands'],
    ]
  },
  {
    name: 'pure-render-mixin',
    type: 'Mixin',
    extraHeaders: [
      ['PureRenderMixin', '']
    ]
  },
  {name: 'perf', type: 'Extension'},
  {name: 'top-level-api', type: 'Method'},
  {name: 'component-api', type: 'Method'},
  {name: 'component-specs', type: 'Interface'},
  {name: 'tags-and-attributes', type: 'Tag'},
  {name: 'events', type: 'Event'},
];

module.exports = indexedFiles;
