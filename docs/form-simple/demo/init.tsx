import { Button } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import { Form } from 'yforms-simple';
import moment from 'moment';

export const delay = (timeout = 0) =>
  new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });

type Fields = {
  age?: string;
  nei?: string;
  start?: string;
  end?: string;
};

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 4, span: 16 },
};

const Demo = () => {
  const [enable, setEnable] = useState(true);
  const [form] = Form.useForm();
  const [detail, setDetail] = useState<Fields>({});
  const [loading, setLoading] = useState(true);

  const loadData = useCallback(async () => {
    await delay(250);
    setDetail({ age: '1', nei: 'nei', start: '1610767167', end: '1611767667' });
    setLoading(false);
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);
  return (
    <div>
      <Button onClick={() => setEnable((c) => !c)}>刷新</Button>
      {JSON.stringify(enable)}
      <Form<Fields>
        {...layout}
        loading={loading}
        form={form}
        onFinish={(values) => {
          console.log('v', values);
        }}
        initialValues={detail}
      >
        <div>
          <Form.Items<Fields> isShow={() => enable} shouldUpdate>
            {[
              {
                type: 'input',
                label: '内部form',
                initFormat: (_, values) => `${values.age}values.age`,
                format: (value) => `${value}-提交修改值`,
                name: 'nei',
              },
            ]}
          </Form.Items>
        </div>
        {[
          {
            label: '年龄',
            type: 'input',
            name: 'age',
            initFormat: (value) => `${value}format`,
            format: (value) => `${value}-提交修改值`,
            componentProps: { placeholder: '请输入年龄' },
          },
          {
            type: 'rangePicker',
            name: 'range',
            label: '日期区间',
            initFormat: (_, { start, end }) => {
              return [start && moment.unix(Number(start)), end && moment.unix(Number(end))];
            },
            format: [
              { name: 'range', removeField: true },
              {
                name: 'start',
                format: (_, { range = [] }) => range[0] && `${moment(range[0]).format('LLLL')}`,
              },
              {
                name: 'end',
                format: (_, { range = [] }) => range[1] && `${moment(range[1]).format('LLLL')}`,
              },
            ],
          },
          {
            type: 'button',
            ...tailLayout,
            componentProps: { children: '提交', htmlType: 'submit' },
          },
          {
            type: 'button',
            ...tailLayout,
            componentProps: {
              children: '重置',
              onClick: () => {
                form.resetFields();
              },
            },
          },
        ]}
      </Form>
    </div>
  );
};
export default Demo;