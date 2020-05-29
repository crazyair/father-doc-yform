import React from 'react';
import { merge, forEach } from 'lodash';
import classNames from 'classnames';

import { YFormConfig } from './Form';
import { modifyType } from './ItemsType';
import { replaceMessage, getLabelLayout } from './utils';
import DiffDom from './component/Diff';

// TODO 以下判断是如果有 name 并且不是 list 类型才当做为表单字段从而注入 view diff 等功能
// itemProps.name && typeProps.type !== 'list'

const scenes: YFormConfig = {
  getScene: {
    // 没有 label 也和有 label 对齐
    labelLayout: {
      item: ({ formProps, itemsProps, itemProps }) => {
        let _itemProps: modifyType['itemProps'] = {};
        const { label } = itemProps;
        const _base = merge({}, formProps, itemsProps, itemProps);

        const { labelCol, wrapperCol, offset } = _base;
        const { noLabelLayoutValue, labelLayoutValue } = getLabelLayout({
          labelCol,
          wrapperCol,
          offset,
        });
        _itemProps = label ? labelLayoutValue : noLabelLayoutValue;

        return {
          itemProps: { ..._itemProps, ...itemProps },
        };
      },
    },
    // 移除 Col 栅格
    noCol: {
      item: ({ itemProps }) => {
        return { itemProps: { ...itemProps, labelCol: {}, wrapperCol: {} } };
      },
    },
    // 判断如果是 required 则每个 item 添加 rules
    required: {
      item: ({ formProps, itemProps, typeProps }) => {
        const _itemProps: modifyType['itemProps'] = {};
        const { required } = formProps;
        const { label, rules } = itemProps;
        const { formatStr } = merge({}, typeProps, itemProps);

        const _message = typeof label === 'string' && replaceMessage(formatStr || '', { label });
        if (itemProps.name && typeProps.type !== 'list') {
          if (required) {
            let hasRequired = false;
            forEach(rules, (item) => {
              hasRequired = 'required' in item;
            });
            if (!hasRequired) {
              _itemProps.rules = [
                { required, message: _message || '此处不能为空' },
                ...(itemProps.rules || []),
              ];
            }
          }
        }
        return {
          itemProps: { ..._itemProps, ...itemProps },
        };
      },
    },
    // 添加 placeholder
    placeholder: {
      item: ({ itemProps, componentProps, typeProps }) => {
        const _componentProps: modifyType['componentProps'] = {};
        const { label } = itemProps;
        const { formatStr } = merge({}, typeProps, itemProps);

        const _message = typeof label === 'string' && replaceMessage(formatStr || '', { label });
        if (itemProps.name && typeProps.type !== 'list') {
          _componentProps.placeholder = _message || '';
        }
        return {
          componentProps: { ..._componentProps, ...componentProps },
        };
      },
    },
    // 判断 disabled 给没个 item 添加 disabled
    disabled: {
      item: ({ formProps, componentProps, itemProps, typeProps }) => {
        const _componentProps: modifyType['componentProps'] = {};
        const { disabled } = formProps;
        if (itemProps.name && typeProps.type !== 'list') {
          _componentProps.disabled = disabled;
        }
        return {
          componentProps: { ..._componentProps, ...componentProps },
        };
      },
    },
    // 查看情况下每个 item 使用 view 类型渲染
    view: {
      item: ({ itemProps, typeProps }) => {
        let _itemProps;
        let _componentProps;
        if (itemProps.name && typeProps.type !== 'list') {
          // 使用 ComponentView 组件渲染
          _itemProps = { className: 'mb0', type: 'view' };
          // ComponentView 组件需要 itemProps 参数
          _componentProps = { itemProps };
        }
        return {
          itemProps: { ...itemProps, ..._itemProps },
          componentProps: { _item_type: typeProps.type, ..._componentProps },
        };
      },
    },
    diff: {
      item: ({ formProps, itemProps, typeProps }) => {
        const { diffProps: { oldValues } = {}, initialValues } = formProps;
        const { name } = merge({}, typeProps, itemProps);

        let _itemProps;

        if (itemProps.name && typeProps.type !== 'list') {
          _itemProps = {
            addonAfter: [
              itemProps.addonAfter,
              <DiffDom
                key="diff-dom"
                itemProps={itemProps}
                type={typeProps.type}
                oldValues={oldValues}
                initialValues={initialValues}
                name={name}
              />,
            ],
          };
        }
        return { itemProps: { ...itemProps, ..._itemProps } };
      },
    },
    // 搜索场景
    search: {
      form: ({ formProps }) => ({
        formProps: {
          ...formProps,
          className: classNames('yforms-search-form', formProps.className),
          // 搜索成功后不重置表单
          onCancel: () => {},
        },
      }),
      items: ({ itemsProps }) => {
        return { itemsProps: { noStyle: true, ...itemsProps } };
      },
      item: ({ itemProps, componentProps }) => {
        return {
          itemProps: { ...itemProps, label: undefined },
          componentProps: { ...componentProps, placeholder: itemProps.label },
        };
      },
    },
    // 没有 label 不和有 label 对齐 TODO: 暂时没作用
    // noLabelLayout: {
    //   item: ({ formProps, itemsProps, itemProps }) => {
    //     const { label } = itemProps;
    //     const _base = merge({}, formProps, itemsProps, itemProps);
    //     const { wrapperCol } = _base;
    //     const _itemProps = label ? {} : { labelCol: {}, wrapperCol };
    //     return {
    //       itemProps: { ...itemProps, ..._itemProps },
    //     };
    //   },
    // },
  },
};

export default scenes;
