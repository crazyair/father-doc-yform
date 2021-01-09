import YForm, { Config, useFormatFieldsValue } from './Form';
import Items from './Items';
import useSubmit from './useSubmit';
import useForm from './useForm';

import { YFormItemsContext, YFormContext, YFormListContent, YFormItemContext } from './Context';
import FormModal from './FormModal';
import Item from './Item';

type InternalYForm = typeof YForm;
interface RefYForm extends InternalYForm {
  Config: typeof Config;
  Items: typeof Items;
  Item: typeof Item;
  useForm: typeof useForm;
  useFormatFieldsValue: typeof useFormatFieldsValue;
  useSubmit: typeof useSubmit;
  YFormContext: typeof YFormContext;
  YFormItemContext: typeof YFormItemContext;
  YFormItemsContext: typeof YFormItemsContext;
  ListContent: typeof YFormListContent;
  FormModal: typeof FormModal;
}

const Form: RefYForm = YForm as RefYForm;

Form.Config = Config;
Form.Items = Items;
Form.Item = Item;
Form.useForm = useForm;
Form.useFormatFieldsValue = useFormatFieldsValue;
Form.useSubmit = useSubmit;
Form.YFormContext = YFormContext;
Form.YFormItemContext = YFormItemContext;
Form.YFormItemsContext = YFormItemsContext;
Form.ListContent = YFormListContent;
Form.FormModal = FormModal;

export default Form;
