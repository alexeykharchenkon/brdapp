import { NodeTypes } from "@models/enumTypes";
import { ElementData } from "@models/dataTypes";

const elementsArray: ElementData[] = [
    {
        className: "element start",  
        type: NodeTypes[NodeTypes.Start], 
        text: 'Start',
        maxInputs: 0,
        maxOutputs: 1,
    },
    {
        className: "element end",  
        type: NodeTypes[NodeTypes.End], 
        text: 'End',
        maxInputs: 10,
        maxOutputs: 0,
    },
    {
        className: "element phase",  
        type: NodeTypes[NodeTypes.Phase], 
        text: 'Phase',
        maxInputs: 10,
        maxOutputs: 1,
    },
    {
        className: "element decision",  
        type: NodeTypes[NodeTypes.Decision], 
        text: 'Decision',
        maxInputs: 1,
        maxOutputs: 2,
    },
    {
        className: "element subworkflow", 
        type: NodeTypes[NodeTypes.SubWorkFlow], 
        text: 'Sub Workflow',
        maxInputs: 10,
        maxOutputs: 1,
    },
];

export const initData = {
    elementsArray
}
      