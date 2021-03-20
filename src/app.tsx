import { ConfigProvider } from 'antd';
import React from 'react';
import moment from 'moment';
import zhCN from 'antd/lib/locale/zh_CN';
import 'moment/locale/zh-cn';

moment.locale('zh-cn');

export function rootContainer(container: React.Component) {
  return <ConfigProvider locale={zhCN}>{container}</ConfigProvider>;
}
