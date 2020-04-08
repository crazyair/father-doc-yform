import React from 'react';
import { merge, reverse } from 'lodash';
import { ButtonProps } from 'antd/lib/button';

import { YForm } from '../..';
import { YFormProps } from '../Form';
import { YFormItemProps, YFormDataSource } from '../Items';
import { submitFormatValues } from '../utils';
import { YFormSecureButtonProps } from './SecureButton';
import { YFormFieldBaseProps } from '../ItemsType';

export const submitModify: YFormFieldBaseProps<YFormSubmitProps>['modifyProps'] = ({
  componentProps,
  formProps,
}) => {
  const { form, onSave, formatFieldsValue, submitComponentProps } = formProps;
  const mergeCProps = merge({}, submitComponentProps, componentProps);
  const _cProps = { form, onSave, formatFieldsValue, ...mergeCProps };
  return { componentProps: _cProps };
};

export interface ShowBtns {
  showSubmit?: ButtonProps;
  showSave?: YFormSecureButtonProps;
  showCancel?: ButtonProps;
  showEdit?: ButtonProps;
  showBack?: ButtonProps;
}

type showBtns = {
  [P in keyof ShowBtns]?: boolean | ShowBtns[P];
};

export interface YFormSubmitProps
  extends Pick<YFormProps, 'form' | 'onSave' | 'formatFieldsValue' | 'disabled'> {
  showBtns?: showBtns | boolean;
  reverseBtns?: boolean;
}

export default (props: YFormSubmitProps) => {
  const { form, onSave, formatFieldsValue, showBtns = true, reverseBtns, disabled } = props;

  const { getFieldsValue } = form || {};

  const formatValues = values => {
    return formatFieldsValue ? submitFormatValues(values, formatFieldsValue) : values;
  };

  const handleOnSave = async e => {
    e.preventDefault();
    if (onSave && getFieldsValue) {
      await onSave(formatValues(getFieldsValue()));
    }
  };

  const _showBtns: ShowBtns = {
    showSubmit: { children: '提交', type: 'primary', htmlType: 'submit' },
    showSave: { children: '保存', type: 'primary', onClick: handleOnSave },
    showCancel: { children: '取消' },
    showEdit: { children: '编辑' },
    showBack: { children: '返回', type: 'link' },
  };

  const { showSubmit, showSave, showCancel, showEdit, showBack } = merge({}, _showBtns, showBtns);

  const actionBtns: { [key: string]: YFormDataSource } = {
    submit: {
      type: 'button',
      noStyle: true,
      isShow: !!showSubmit,
      plugins: { disabled: false },
      componentProps: showSubmit,
    },
    save: {
      type: 'secureButton',
      noStyle: true,
      isShow: !!showSave,
      plugins: { disabled: false },
      componentProps: showSave,
    },
    cancel: {
      type: 'button',
      noStyle: true,
      isShow: !!showCancel,
      plugins: { disabled: false },
      componentProps: showCancel,
    },
    edit: {
      type: 'button',
      noStyle: true,
      isShow: !!showEdit,
      plugins: { disabled: false },
      componentProps: showEdit,
    },
    back: {
      type: 'button',
      noStyle: true,
      isShow: !!showBack,
      plugins: { disabled: false },
      componentProps: showBack,
    },
  };

  let btns: YFormItemProps['children'];
  if (disabled) {
    btns = [actionBtns.edit, actionBtns.back];
  } else {
    btns = [actionBtns.submit, actionBtns.save, actionBtns.cancel];
  }
  if (reverseBtns) {
    btns = reverse(btns);
  }
  return (
    <YForm.Items isShow={!!showBtns}>
      {[{ className: 'button-more-left', dataSource: btns }]}
    </YForm.Items>
  );
};
