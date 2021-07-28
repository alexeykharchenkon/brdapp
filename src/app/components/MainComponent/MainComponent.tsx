import { observer } from 'mobx-react-lite';
import React from 'react';
import { useStore } from '@stores/rootStore';
import { DiagramComponent } from './DiagramComponent';
import { PropertiesComponent } from './PropertiesComponent';
import { ToolboxComponent } from './ToolboxComponent';


export const MainComponent = observer(() => {
    const {dataStore} = useStore();
    return(
        <div className="main">
            <ToolboxComponent/>
            <DiagramComponent
                schema={dataStore.schema}
                crudOperations={dataStore.crudOperations}
            />
            <PropertiesComponent/>
        </div>
    );
});