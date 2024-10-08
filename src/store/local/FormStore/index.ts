import { createContextLocalStore } from '../createContextLocalStore';
import { FormStore } from './FormStore';

const { Provider, useStore } = createContextLocalStore(FormStore);

export { Provider as FormStoreProvider, useStore as useFormStore, FormStore };
