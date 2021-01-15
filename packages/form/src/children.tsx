import React from 'react';
import { Form } from 'antd';
import { get, isArray, isObject, map, set } from 'lodash';
import { FormProps, ItemsType } from './form';
import { getOnlyKey } from './utils';

const _getOnlyKey = getOnlyKey();

export const useRenderChildren = (props: FormProps) => {
  const { itemsType, children, initialValues } = props;
  const formatValues = {};
  const each = (children: FormProps['children'], pIndex?: number) => {
    const dom = map(isArray(children) ? children : [children], (item, index) => {
      if (isArray(item)) {
        return each(item, index);
      }
      if (React.isValidElement(item)) {
        return item;
      }
      if (isObject(item)) {
        const _item = item as ItemsType;
        const { componentProps, format, deFormat, isShow, ...rest } = _item;
        const { name, shouldUpdate } = rest;

        if (deFormat) {
          set(formatValues, name, deFormat(get(initialValues, name), initialValues));
        }

        const key = _getOnlyKey(index, pIndex, name);
        const typeProps = get(itemsType, _item.type);
        if (typeProps) {
          const _component = _item.component || typeProps.component;
          const _dom = (
            <Form.Item {...rest} key={key}>
              {/* 如果有传 component 则使用当前的 */}
              {React.cloneElement(_component, componentProps as Record<string, any>)}
            </Form.Item>
          );

          // 传 isShow 判断
          if ('isShow' in _item) {
            if (!isShow) return null;
            if (typeof isShow === 'function') {
              return (
                <Form.Item noStyle key={key} shouldUpdate={shouldUpdate}>
                  {(form) => isShow(form.getFieldsValue(true)) && _dom}
                </Form.Item>
              );
            }
          }
          return _dom;
        }
      }
    });
    return dom;
  };
  const dom = each(children);
  return { formatValues, dom };
};