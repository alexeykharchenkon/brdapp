import React from 'react';
import Diagram, { useSchema } from 'beautiful-react-diagrams';
import { ToolboxComponent } from './ToolboxComponent';
import { PropertiesComponent } from './PropertiesComponent';

export const DiagramComponent = ({schema, operationsFunc} : any) => {
    const [schemaIn, { onChange }] = useSchema(schema);

    const copiedSchema = {
      ...schemaIn,
        nodes: [...schema.nodes],
        links: [...schema.links],
    };

    return(
      <>
        <ToolboxComponent
          operationsFunc={operationsFunc}
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