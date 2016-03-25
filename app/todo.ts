import {Record} from 'immutable';

export interface ITodo {
    title: string;
}

const defaultTodo:ITodo = {
    title: ""
};

export class Todo extends Record(defaultTodo) implements ITodo {
    title:string;

    constructor(props:ITodo) {
        super(props);
    }
}