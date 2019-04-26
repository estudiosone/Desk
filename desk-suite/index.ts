/* eslint-disable no-param-reassign */
import _Vue from 'vue';
import Core from './core';
// import Firebase from 'firebase'

/* eslint-disable-next-line max-len */
export default function DeskSuitePlugin<DeskSuitPlugOptions>(Vue: typeof _Vue, options?: DeskSuitPlugOptions): void {
  // do stuff with options
  Vue.prototype.$deskSuite = new Core();
}

export class DeskSuitPlugOptions {

}
