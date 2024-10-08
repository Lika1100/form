import { observer } from 'mobx-react-lite';
import * as React from 'react';

import { useLocalStore } from 'configs/useLocalStore';
import { FormStore, FormStoreProvider } from 'store/local/FormStore';
import PhoneInput from './PhoneInput/PhoneInput';

const App = () => {
  const store = useLocalStore(() => new FormStore());

  return (
    <FormStoreProvider store={store}>
      <PhoneInput
        onChange={store.onChange}
        onKeyDown={store.onKeyDown}
        onFocus={store.onFocus}
        prefixStore={store.prefixStore}
        formattedPhone={store.formattedPhone}
        formStatus={store.formStatus}
      />
    </FormStoreProvider>
  );
};

export default observer(App);
