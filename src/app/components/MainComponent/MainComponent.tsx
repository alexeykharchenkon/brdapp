import { observer } from 'mobx-react-lite';
import React from 'react';
import { useStore } from '@stores/rootStore';
import { DiagramComponent } from './DiagramComponent';

export const MainComponent = observer(() => {
    const {dataStore} = useStore();
    return(
        <div className="main">
            <DiagramComponent
                schema={dataStore.schema}
                crudOperations={dataStore.crudOperations}
            />
        </div>
    );
});