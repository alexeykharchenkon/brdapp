import React, { useCallback } from 'react';
import Diagram, { createSchema, useSchema } from 'beautiful-react-diagrams';
import { Button } from 'beautiful-react-ui';
import { v4 as uuidv4 } from 'uuid';
import { ActionTypes } from '@models/ActionTypes';
import { CustomComponent } from '../CustomComponents/CustomComponent';

const initialSchema: any = createSchema({
  nodes: [
    {
      id: 'node-1',
      content: 'Node 1',
      coordinates: [150, 60],
      outputs: [ { id: 'port-1', alignment: 'right' } ],
    },
  ]
});

interface DiagramProps {
  initialSchema: any;
  crudOperations: any;
}

export const DiagramComponent = ({schema, crudOperations} : any) => {
    const [schemaIn, { onChange }] = useSchema(schema);
    
    const copiedSchema = {
      ...schemaIn,
      nodes: [...schema.nodes],
    };

    const deleteNodeFromSchema = (id: any) => {
      const nodeToRemove: any = schemaIn.nodes.find(node => node.id === id);
      crudOperations(ActionTypes.REMOVENODE, nodeToRemove);
    };
  
    const addNewNode = () => {
      console.log("Add in Component")
      console.log(copiedSchema)

      const nextNode: any = {
        id: uuidv4(),
        content: `Node ${schema.nodes.length+1}`,
        coordinates: [
          schema.nodes[schema.nodes.length - 1].coordinates[0],
          schema.nodes[schema.nodes.length - 1].coordinates[1] + 100,
        ],
          render: CustomComponent,
          data: {onClick: deleteNodeFromSchema},
          inputs: [{ id: uuidv4()}],
          outputs: [{ id: uuidv4()}],
      };

      crudOperations(ActionTypes.ADDNODE, nextNode);
    }

    return(
        <div className="diagram">
            <div>
                <Button 
                  color="primary" 
                  icon="plus" 
                  onClick={addNewNode} 
                  >Add new node</Button>
            </div>
            <div style={{ height: '100%'}}>
                <Diagram schema={copiedSchema} onChange={onChange}/>
            </div>
        </div>
    );
}