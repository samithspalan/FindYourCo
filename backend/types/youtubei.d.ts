declare module 'youtubei.js' {
  // Minimal typings to satisfy TypeScript when using dynamic import
  // The package exports a default Innertube class, but also may expose named export.
  const Innertube: any;
  export default Innertube;
  export { Innertube };
}
