import { NodeTypes } from "./enumTypes";

export type NodeData = {
  onDelete?: (data?: NodeData) => void;
  onConnect?: (data?: NodeData) => void;
  type?: NodeTypes;
  className?: string;
};

export interface ToolBoxElementData {
  className: string;
  type: NodeTypes;
  text: string;
}