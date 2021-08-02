import { makeAutoObservable } from "mobx";
import { createSchema } from 'beautiful-react-diagrams';
import { ActionTypes, NodeTypes } from "@models/enumTypes";
import { NodeData, ElementData} from "@models/dataTypes";
import { DiagramSchema, Port} from "beautiful-react-diagrams/@types/DiagramSchema";
import { CustomComponent } from "@components/CustomComponents/CustomComponent";
import { v4 as uuidv4 } from 'uuid';

export class DataStore {
    schema: DiagramSchema<NodeData> = createSchema<NodeData>({
        nodes: [
          {
            id: uuidv4(),
            content: 'Start',
            coordinates: [150, 60],
            outputs: [ {id: uuidv4()} ],
            render: CustomComponent,
            data: {
                onDelete: (id: string) => {this.operationsFunc(ActionTypes.DELETENODE, id)},
                onConnect: (element: any) => {this.operationsFunc(ActionTypes.CONNECTNODES, element)},
                isAFirstElement: true,
                type: NodeTypes[NodeTypes.Start],
                className: "diagram_element diagram_start",
                dataForSelect: [],
                maxInputs: 0,
                maxOutputs: 1,
          },
        }
        ]
      });

    constructor(){
        makeAutoObservable(this);
    }

    operationsFunc = (actionType: any, element: any) => {
        switch(actionType) {
            case ActionTypes.ADDNODE:
                this.addNode(element);
                break;
            case ActionTypes.DELETENODE:
                this.deleteNode(element);
                break;
            case ActionTypes.CONNECTNODES:
                this.connectNodes(element.from, element.to, element.label);
                break;
        }
        this.schema = {...this.schema}
    }

    addNode = (element: ElementData) => {
        const inputs = [];
        const outputs = [];

        if(element.type !== NodeTypes[NodeTypes.Start]) inputs.push({id: uuidv4()});
        if(element.type !== NodeTypes[NodeTypes.End]) outputs.push({id: uuidv4()});
        if(element.type === NodeTypes[NodeTypes.Decision]) outputs.push({id: uuidv4()});

        const node: any = {
          id: uuidv4(),
          content: `${element.text} ${this.schema.nodes.length + 1}`,
          coordinates: [
            this.schema.nodes[this.schema.nodes.length - 1].coordinates[0],
            this.schema.nodes[this.schema.nodes.length - 1].coordinates[1] + 100,
          ],
            render: CustomComponent,
            data: {
              onDelete: (id: string) => {this.operationsFunc(ActionTypes.DELETENODE, id)},
              onConnect:  (id: any) => {this.operationsFunc(ActionTypes.CONNECTNODES, id)},
              type: element.type,
              className: element.className.split(" ")?.map(c => "diagram_" + c).join(" "), 
              isAFirstElement: false,
              dataForSelect: [],
              maxInputs: element.maxInputs,
              maxOutputs: element.maxOutputs,
            },
            inputs: inputs,
            outputs: outputs,
        };
        this.schema.nodes.push(node); 

        this.setDataForSelect();
    }
    deleteNode = (id: string) => {
        const node = this.schema.nodes.find(n => n.id === id);

        node?.inputs?.forEach(i => {this.schema.links = this.schema.links?.filter(l => l.output !== i.id);});
        node?.outputs?.forEach(o => {this.schema.links = this.schema.links?.filter(l => l.input !== o.id);});

        this.schema.nodes = this.schema.nodes.filter(n => n.id !== id);

        this.setDataForSelect();
    }
    connectNodes = (from: string, to: string, label: string) => {
        const nodeFrom  = this.schema.nodes.find(n => n.id === from);
        const nodeTo  = this.schema.nodes.find(n => n.id === to);

        if(nodeFrom?.data?.type === NodeTypes[NodeTypes.Decision]){
            if(label === "Yes"){
                this.addLink(nodeFrom?.outputs as Port[], nodeTo?.inputs as Port[], 0, label, nodeFrom?.data?.maxOutputs as number, nodeTo?.data?.maxInputs as number);
            }else{
                this.addLink(nodeFrom?.outputs as Port[], nodeTo?.inputs as Port[], 1, label, nodeFrom?.data?.maxOutputs as number, nodeTo?.data?.maxInputs as number);
            }
        }else{
            this.addLink(nodeFrom?.outputs as Port[], nodeTo?.inputs as Port[], 0, label, nodeFrom?.data?.maxOutputs as number, nodeTo?.data?.maxInputs as number);
        }
    }

    addLink = (outputsFrom: Port[], inputsTo: Port[], i: number, label: string, maxOutputs: number, maxInputs: number) => {
        this.schema.links = this.schema.links?.filter(l => l.input !== outputsFrom[i].id);

        const linksOut = this.schema.links?.filter(l => l.input  === outputsFrom[i].id);
        const linksIn = this.schema.links?.filter(l => l.output  === inputsTo[0].id);

        if(linksOut?.length as number < maxOutputs && linksIn?.length as number < maxInputs) 
            this.schema.links?.push({ input: outputsFrom[i].id,  output: inputsTo[0].id, label: label });
    }

    setDataForSelect = () => {
        this.schema.nodes.forEach(node => {
            if(node.data?.type !== NodeTypes[NodeTypes.End]) {
                node.data?.dataForSelect?.splice(0);
                this.schema.nodes.forEach(n => {
                    if(n.id !== node.id && n.data?.type !== NodeTypes[NodeTypes.Start])
                        node.data?.dataForSelect?.push({
                            label: n.content?.toString() as string, 
                            value: n.id
                        });
                });
            }
        });
    }
}
