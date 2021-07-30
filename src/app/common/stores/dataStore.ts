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
                this.connectNodes(element.from, element.to);
                break;
        }
        this.schema = {...this.schema}
    }

    addNode = (element: ElementData) => {
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
            inputs: element.type !== NodeTypes[NodeTypes.Start] ? [{id: uuidv4()}] : [],
            outputs: element.type !== NodeTypes[NodeTypes.End] ? [{id: uuidv4()}] : [],
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
    connectNodes = (from: string, to: string) => {
        const outputsFrom = this.schema.nodes.find(n => n.id === from)?.outputs as Port[];
        const inputsTo = this.schema.nodes.find(n => n.id === to)?.inputs as Port[];

        const link = {
            input: outputsFrom[0].id,
            output: inputsTo[0].id,
        }
        this.schema.links?.push(link);
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
