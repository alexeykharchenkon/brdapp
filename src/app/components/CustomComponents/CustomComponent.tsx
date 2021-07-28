import React from 'react';
import { Button } from 'beautiful-react-ui';

export const CustomComponent = ({ id, content, data, inputs, outputs }: any) => (
    <div style={{background: 'purple'}}>
      <div style={{textAlign: 'right'}}>
        <Button icon="times" size="small" onClick={()=>data.onClick(id)}/>
      </div>
      <div role="button" style={{padding: '15px'}}>
        {content}
      </div>
      <div style={{marginTop: '10px',display:'flex', justifyContent:'space-between'}}>
        {inputs?.map((port: any) => React.cloneElement(port, {style: { width: '25px', height: '25px', background: '#1B263B' }}))}
        {outputs?.map((port: any) => React.cloneElement(port, {style: { width: '25px', height: '25px', background: '#1B263B' }}))}
      </div>
    </div>
);