declare module "*.txt" {
  const file: string;
  export default file;
}

declare module "*.txt.js" {
  const file: string;
  export default file;
}

// The build bundles a browser version of Node's util module.
declare module "util" {
  export function format(...args: unknown[]): string;
}
