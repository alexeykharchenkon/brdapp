import { makeAutoObservable } from "mobx";
import { createSchema } from 'beautiful-react-diagrams';
import { v4 as uuidv4 } from 'uuid';
import { ActionTypes } from "@models/ActionTypes";

export class DataStore {

    schema: any = createSchema({
        nodes: [
          {
            id: 'node-1',
            content: 'Node 1',
            coordinates: [150, 60],
            outputs: [ { id: 'port-1', alignment: 'right' } ],
          },
        ]
      });

      //uuidv4()
    constructor(){
        makeAutoObservable(this);
    }

    crudOperations = (actionType: any, node: any) => {
        console.log("CRUD");
        switch(actionType) {
            case ActionTypes.ADDNODE:
                this.schema.nodes.push(node);
                this.schema = {...this.schema}
                console.log("Add")
                break;
            case ActionTypes.REMOVENODE:
                this.schema.nodes = this.schema?.nodes?.filter(node => node.id === id);
                break;
        }
    }
}
