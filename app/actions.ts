import {Actions} from "./constants";
import {List} from 'immutable';
import {ITodo, Todo} from "./todo";

export interface IAction{
    type:string;
}

export interface IAddTodoData extends IAction{
    title:string;
}

export const addTodo = (title:string):IAddTodoData => {
    return {
        title: title,
        type: Actions.ADD_TODO
    };
};

export const addTodoReducer = (state:List<ITodo> = List<ITodo>(), action:IAddTodoData):List<ITodo> => {
    switch (action.type){
        case Actions.ADD_TODO: {
            return state.push(new Todo({title: action.title}));
        }
        default:{
            return state;
        }
    }
};

