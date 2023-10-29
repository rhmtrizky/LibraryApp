import React from 'react';
import { Button, Popover } from 'antd';

const content = (
  <div>
    <p>'Book is out of stock'</p>
  </div>
);

const ButtonStock: React.FC = () => (
  <Popover
    content={content}
    title="Sorry"
  >
    <Button type="primary">Sold out</Button>
  </Popover>
);

export default ButtonStock;
