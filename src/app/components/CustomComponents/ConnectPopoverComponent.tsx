import React, {  useState } from 'react';
import { Popover } from 'beautiful-react-ui';
import { Select } from 'beautiful-react-ui';


export const ConnectPopoverComponent = (props: any) => {
  const {from, dataForSelect, trigger, onConnect} = props;

  const [isOpen, setIsOpen] = useState<boolean>(false); 
  const [selected, setSelected] = useState<any>();

  const chooseSelected = (item: any) => {
    setSelected(item);
    onConnect({from: from, to: item, label: ""});
  }

  return (
    <Popover trigger={trigger} onToggle={() => setIsOpen(!isOpen)} isOpen={isOpen}>
        <div className={"popover"}>
            Connect to
            <Select
                options={dataForSelect}  
                onChange={(item: any) => chooseSelected(item)} 
                value={selected} 
                className={"select"}
                clearable={false}
            />
        </div>
    </Popover>
  );
};
