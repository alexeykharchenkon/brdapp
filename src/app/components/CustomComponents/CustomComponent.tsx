import React, { cloneElement } from 'react';
import { Button } from 'beautiful-react-ui';

const portsContainerStyle = {display:'flex', justifyContent:'space-between'};
const inPortStyle = {
  width: '25px', 
  height: '25px', 
  background: '#26c6da', 
  pointerEvents: 'none',
  borderRadius: '50%',
  border: '1px solid #101111',
};
const outPortStyle = {
  width: '25px', 
  height: '25px', 
  background: '#f44336', 
  pointerEvents: 'none',
  borderRadius: '50%',
  border: '1px solid #101111',
};

export const CustomComponent = ({ id, content, data, inputs, outputs }: any) => (
    <div className={data.className}>
      <div style={{textAlign: 'right'}}>
        <Button icon="times" size="small" onClick={()=>data.onDelete(id)}/>
        <Button icon="plus" size="small" onClick={()=>data.onConnect(id)}/>
      </div>
      <div role="button" style={{padding: '15px'}}>
        {content}
      </div>
      <div style={portsContainerStyle}>
        {inputs?.map((port: any) => cloneElement(port, {style: inPortStyle}))}
        {outputs?.map((port: any) => cloneElement(port, {style: outPortStyle}))}
      </div>
    </div>
);