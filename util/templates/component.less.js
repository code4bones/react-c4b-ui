module.exports = (componentName) => ({
  content: `// Generated with util/create-component.js
@import "../variables.less";
@import "../typography.less";

.foo-bar {
  @include font-defaults;

  color: $harvey-green;
}
`,
  extension: `.less`
});
