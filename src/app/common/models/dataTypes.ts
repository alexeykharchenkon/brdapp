export type NodeData = {
  onDelete?: (id: string) => void;
  onConnect?: (data?: NodeData) => void;
  type?: string;
  className?: string;
  isAFirstElement?: boolean;
  dataForSelect?: DataForSelect[],
  maxInputs: number;
  maxOutputs: number;
};

export interface ElementData {
  className: string;
  type: string;
  text: string;
  maxInputs: number;
  maxOutputs: number;
}
export interface ConnectPair {
  from: string;
  to: string;
}

export interface DataForSelect {
  label: string;
  value: string;
}