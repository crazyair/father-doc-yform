import React from 'react';
import moment, { isMoment } from 'moment';
import Numbro from 'numbro';
import { Tag } from 'antd';
import { includes, isArray, map } from 'lodash';
import SwapRightOutlined from '@ant-design/icons/SwapRightOutlined';

import { YFormItemsTypeDefine, YFormFieldBaseProps } from '../ItemsType';

const noData = <span style={{ color: '#ccc' }}>-/-</span>;

export interface YFormComponentView {
  _item_type?: string;
  value?: React.ReactNode;
  addonBefore?: React.ReactNode;
  addonAfter?: React.ReactNode;
  viewProps?: YFormFieldBaseProps['viewProps'];
  suffix?: React.ReactNode;
  [key: string]: any;
}

export default (props: YFormComponentView) => {
  const { _item_type, children, viewProps, addonBefore, addonAfter, suffix, value } = props;
  const { format } = viewProps || {};
  let _value = value;

  const _addonAfter = addonAfter || suffix;
  const _addonBefore = addonBefore;

  // 金额格式化
  if (_item_type === 'money') {
    _value = Numbro(_value).format('0,0.00');
  }
  // 日期格式化
  if (_item_type === 'datePicker' || _item_type === 'rangePicker') {
    const {
      format: thisFormat,
      picker = 'date',
    } = props as YFormItemsTypeDefine['datePicker']['componentProps'];
    let _format;
    // 对比 antd 各个类型的默认格式化
    if (thisFormat) {
      _format = thisFormat;
    } else if (picker === 'date') {
      let timeFormat = '';
      if (props.showTime) {
        timeFormat = typeof props.showTime === 'boolean' ? 'HH:mm:ss' : props.showTime.format;
      }
      _format = `YYYY-MM-DD ${timeFormat}`;
    } else if (picker === 'year') {
      _format = 'YYYY';
    } else if (picker === 'quarter') {
      _format = 'YYYY-\\QQ';
    } else if (picker === 'month') {
      _format = 'YYYY-MM';
    } else if (picker === 'week') {
      _format = 'YYYY-wo';
    } else if (picker === 'time') {
      _format = 'HH:mm:ss';
    }
    const dateFormat = typeof _format === 'string' ? _format : _format[0];
    if (_item_type === 'datePicker') {
      if (isMoment(_value)) {
        // 设置日期格式，为数组时支持多格式匹配，展示以第一个为准。配置参考 moment.js
        // https://ant.design/components/date-picker-cn/#DatePicker
        _value = moment(_value).format(dateFormat);
      }
    } else if (_item_type === 'rangePicker') {
      _value = (
        <>
          {_value[0] ? moment(_value[0]).format(dateFormat) : noData}
          &nbsp;{props.separator || <SwapRightOutlined />}&nbsp;
          {_value[1] ? moment(_value[1]).format(dateFormat) : noData}
        </>
      );
    }
  }
  if (_item_type === 'checkbox') {
    if (value) _value = <Tag>{children}</Tag>;
  }
  if (_item_type === 'select') {
    const {
      options,
      optionLabelProp,
      onAddProps,
      showField = 'name',
    } = props as YFormItemsTypeDefine['select']['componentProps'];
    const list = [];
    map(options, (item, index) => {
      if (includes(isArray ? value : [value], item.id)) {
        if (optionLabelProp && onAddProps) {
          list.push(onAddProps(item, index)[optionLabelProp]);
        } else if (typeof showField === 'function') {
          list.push(showField(item, index));
        } else {
          list.push(item[showField]);
        }
      }
    });
    _value = map(list, (item) => <Tag key={item}>{item}</Tag>);
  }
  if (_item_type === 'radio') {
    const {
      options,
      showField = 'name',
    } = props as YFormItemsTypeDefine['radio']['componentProps'];
    if (value) {
      const list = [];
      _value = map(options, (item, index) => {
        if (value === item.id) {
          if (typeof showField === 'function') {
            list.push(showField(item, index));
          } else {
            list.push(item[showField]);
          }
        }
      });
      _value = map(list, (item) => <Tag key={item}>{item}</Tag>);
    }
  }
  if (_item_type === 'checkboxGroup') {
    const { options } = props as YFormItemsTypeDefine['checkboxGroup']['componentProps'];
    if (value && isArray(value)) {
      const list = map(options, (item) => {
        if (includes(value, item.id)) {
          return item.name;
        }
      });
      _value = map(list, (item, index) => <Tag key={index}>{item}</Tag>);
    }
  }

  if (_item_type === 'switch') {
    const {
      checkedChildren = '开',
      unCheckedChildren = '关',
    } = props as YFormItemsTypeDefine['switch']['componentProps'];
    _value = <Tag>{value ? checkedChildren : unCheckedChildren}</Tag>;
  }

  if (format) {
    _value = format(value);
  }
  return (
    <span className="ant-form-text">
      {_addonBefore && <span style={{ color: '#999' }}>{_addonBefore} </span>}
      {_value === undefined || _value === '' ? noData : _value}
      {_addonAfter && <span style={{ color: '#999' }}> {_addonAfter}</span>}
    </span>
  );
};
