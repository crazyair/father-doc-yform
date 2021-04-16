/* eslint-disable func-names */
/* eslint-disable no-param-reassign */
import { IApi } from '@umijs/types';

export default function (api: IApi) {
  api.modifyBundleConfigOpts((memo) => {
    memo.miniCSSExtractPluginPath = require.resolve('mini-css-extract-plugin');
    memo.miniCSSExtractPluginLoaderPath = require.resolve('mini-css-extract-plugin/dist/loader');
    return memo;
  });
}
