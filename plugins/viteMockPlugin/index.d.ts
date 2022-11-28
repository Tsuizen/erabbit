import { Plugin } from 'vite';

declare interface viteOption {
  mockPath: string;
}

declare function viteMockPlugin(options: viteOption): Plugin;

export default viteMockPlugin ;
