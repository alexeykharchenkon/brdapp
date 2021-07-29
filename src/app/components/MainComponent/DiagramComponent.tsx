import React from 'react';
import Diagram, { useSchema } from 'beautiful-react-diagrams';
import { v4 as uuidv4 } from 'uuid';
import { ActionTypes } from '@models/enumTypes';
import { CustomComponent } from '@components/CustomComponents/CustomComponent';
import { ToolboxComponent } from './ToolboxComponent';
import { PropertiesComponent } from './PropertiesComponent';
import { ToolBoxElementData } from '@models/dataTypes';

export const DiagramComponent = ({schema, crudOperations} : any) => {
    const [schemaIn, { onChange }] = useSchema(schema);

    const copiedSchema = {
      ...schemaIn,
        nodes: [...schema.nodes],
        links: [...schema.links],
    };

    const deleteNode = (id: any) => {
      crudOperations(ActionTypes.DELETENODE, id);
    };

    const connectNodes = (id: any) => {
      crudOperations(ActionTypes.CONNECTNODES, id);
    }
  
    const addNewNode = (element: ToolBoxElementData) => {
      var classNameArray = element.className.split(" ");
      const className = classNameArray?.map(c => "diagram_" + c).join(" ");
      let len = schema.nodes.length;

      const node: any = {
        id: uuidv4(),
        content: `${element.text} ${len + 1}`,
        coordinates: [
          schema.nodes[len - 1].coordinates[0],
          schema.nodes[len - 1].coordinates[1] + 100,
        ],
          render: CustomComponent,
          data: {
            onDelete: deleteNode,
            onConnect: connectNodes,
            type: element.type,
            className, 
          },
          inputs: [{id: uuidv4()}],
          outputs: [{id: uuidv4()}],
      };

      crudOperations(ActionTypes.ADDNODE, node);
    }

    return(
      <>
        <ToolboxComponent
          addNewNode={addNewNode}
        />
        <div className="diagram">
          <Diagram 
            schema={copiedSchema} 
            onChange={onChange}
          />
        </div>
        <PropertiesComponent/>
      </>
    );
}