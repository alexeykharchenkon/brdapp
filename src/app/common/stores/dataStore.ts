import { makeAutoObservable } from "mobx";
import { createSchema } from 'beautiful-react-diagrams';
import { ActionTypes } from "@models/enumTypes";
import { NodeData } from "@models/dataTypes";
import { DiagramSchema, Port} from "beautiful-react-diagrams/@types/DiagramSchema";
import { CustomComponent } from "@components/CustomComponents/CustomComponent";

export class DataStore {

    schema: DiagramSchema<NodeData> = createSchema<NodeData>({
        nodes: [
          {
            id: 'node-1',
            content: 'Node 1',
            coordinates: [150, 60],
            outputs: [ { id: 'port-1', alignment: 'right' } ],
            render: CustomComponent,
            data: {
              //  onDelete: this.deleteNode,
            }
          },
        ]
      });

    constructor(){
        makeAutoObservable(this);
    }

    crudOperations = (actionType: any, element: any) => {
        switch(actionType) {
            case ActionTypes.ADDNODE:
                this.addNode(element);
                break;
            case ActionTypes.DELETENODE:
                this.deleteNode(element);
                break;
            case ActionTypes.CONNECTNODES:
                this.connectNodes(element, "port-1");
                break;
        }
        this.schema = {...this.schema}
    }

    addNode = (element: any) => {
        this.schema.nodes.push(element); 
    }
    deleteNode = (id: string) => {
        const node = this.schema.nodes.find(n => n.id === id);

        node?.inputs?.forEach(i => {this.schema.links = this.schema.links?.filter(l => l.input !== i.id);});
        node?.outputs?.forEach(o => {this.schema.links = this.schema.links?.filter(l => l.output !== o.id);});

        this.schema.nodes = this.schema.nodes.filter(n => n.id !== id);
    }
    connectNodes = (from: string, to: string) => {
        const currNode = this.schema.nodes.find(n => n.id === from);
        const inputs = currNode?.inputs as Port[];
        const link = {
            input: inputs[0].id,
            output: to,
        }
        this.schema.links?.push(link);
    }
}
