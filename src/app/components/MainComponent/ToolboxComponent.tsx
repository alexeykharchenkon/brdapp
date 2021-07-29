import React from 'react';
import { Button } from 'beautiful-react-ui';
import { buttonsToolboxInitData } from '@common/data/toolboxData';

interface ToolboxProps {
    addNewNode: any;
}

export const ToolboxComponent = ({addNewNode}: ToolboxProps) => {
    return(
        <div className="toolbox">
            <div className="toolboxButtons">  
                <h3>Add Node</h3>
                {buttonsToolboxInitData?.array?.map((el, index) => (
                    <Button 
                        key={index}
                        onClick={() => addNewNode(el)}
                        className={el.className}
                    >
                        {el.text}
                    </Button>
                    ))}
            </div>
        </div>
    );
}