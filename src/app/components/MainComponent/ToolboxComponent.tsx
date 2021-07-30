import React from 'react';
import { Button } from 'beautiful-react-ui';
import { initData } from '@common/data/initData';
import { ActionTypes } from '@models/enumTypes';

interface ToolboxProps {
    operationsFunc: any;
}

export const ToolboxComponent = ({operationsFunc}: ToolboxProps) => {
    return(
        <div className="toolbox">
            <div className="toolboxButtons">  
                <h3>Add Node</h3>
                {initData?.elementsArray?.map((el, index) => (
                    <Button 
                        key={index}
                        onClick={() => {
                            operationsFunc(ActionTypes.ADDNODE, el);
                          }}
                        className={el.className}
                    >
                        {el.text}
                    </Button>
                    ))}
            </div>
        </div>
    );
}