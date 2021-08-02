import React, { cloneElement } from 'react';
import { Button } from 'beautiful-react-ui';
import { styles } from '@styles/customNodesStyles';
import { NodeTypes } from '@models/enumTypes';
import { ConnectPopoverComponent } from './ConnectPopoverComponent';
import { ConnectPopoverDecisionComponent } from './ConnectPopoverDecisionComponent';

export const CustomComponent = ({ id, content, data, inputs, outputs }: any) => {

  return (  
    <div className={data.className}>
      <div style={{textAlign: 'right'}}>
        {!data.isAFirstElement && 
        <Button 
          icon="times" 
          size="small" 
          color="danger"
          onClick={() => data.onDelete(id)}
        />}
        {data.type !== NodeTypes[NodeTypes.End] && data.type !== NodeTypes[NodeTypes.Decision] && 
          <ConnectPopoverComponent 
            trigger={<Button icon="plus" size="small" color="primary"/>}
            onConnect={data.onConnect}
            dataForSelect={data.dataForSelect}
            from={id}
          />
        }
          {data.type === NodeTypes[NodeTypes.Decision] && 
          <>
            <ConnectPopoverDecisionComponent 
              trigger={<Button icon="plus" size="small" color="primary">Yes</Button>}
              onConnect={data.onConnect}
              dataForSelect={data.dataForSelect}
              from={id}
              label={"Yes"}
            />
            <ConnectPopoverDecisionComponent 
              trigger={<Button icon="plus" size="small" color="primary">No</Button>}
              onConnect={data.onConnect}
              dataForSelect={data.dataForSelect}
              from={id}
              label={"No"}
            />
          </>
        }
      </div>
      <div role="button" style={{padding: '15px'}}>
        {content}
      </div>
      <div style={styles.portsContainerStyle}>
        {inputs?.map((port: any) => cloneElement(port, {style: styles.inPortStyle}, "in"))}
        {outputs?.map((port: any) => cloneElement(port, {style: styles.outPortStyle}, "out"))}
      </div>
    </div> 
);
}