import { NodeTypes } from "@models/enumTypes";
import { ToolBoxElementData } from "../models/dataTypes";

const array: ToolBoxElementData[] = [
    {className: "element start",  type: NodeTypes.Start, text: 'Start'},
    {className: "element end",  type: NodeTypes.End, text: 'End'},
    {className: "element phase",  type: NodeTypes.Phase, text: 'Phase'},
    {className: "element decision",  type: NodeTypes.Decision, text: 'Decision'},
    {className: "element subworkflow",  type: NodeTypes.SubWorkFlow, text: 'Sub Workflow'},
];

export const buttonsToolboxInitData = {
    array
}
      