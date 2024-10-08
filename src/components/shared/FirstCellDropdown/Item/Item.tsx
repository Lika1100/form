import * as React from 'react';
import './Item.css';
import { Prefix } from 'store/models/prefix';

type Props = {
  prefixItem: Prefix;
  onClose: () => void;
  setPrefix: (value: Prefix) => void;
}

const Item: React.FC<Props> = ({ prefixItem, onClose, setPrefix }) => {

  const onClick = React.useCallback(() => {
    setPrefix(prefixItem);
    onClose();
  }, [onClose, prefixItem, setPrefix])

  const {name, prefix, emoji} = prefixItem;

  return (
    <div data-testid='list-item' className='item' onClick={onClick}>
      <div>{emoji}{prefix}</div>
      <div className='item__caption'>{name}</div>
    </div>
  );
}

export default React.memo(Item);
