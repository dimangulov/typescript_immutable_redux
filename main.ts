/// <reference path="./typings/mocha.d.ts" />
/// <reference path="./typings/chai.d.ts" />
/// <reference path="./typings/immutable.d.ts" />

import chai = require('chai');
import Immutable = require('immutable');
import chaiImmutable = require('chai-immutable');

chai.use(chaiImmutable);

const expect = chai.expect;
import List = Immutable.List;
import Map = Immutable.Map;
import Record = Immutable.Record;

mocha.setup('bdd');

const Actions = {
    NULL: "NULL",
    ADD_TODO: "ADD_TODO"
};

interface ITodo {
    title: string;
}

class Todo extends Record({}) implements ITodo {
    title:string;

    constructor(props:ITodo) {
        super(props);
    }
}

interface IAction{
    type:string;
}

interface IAddTodoData extends IAction{
    title:string;
}

const emptyTodoList = Immutable.List<ITodo>([]);

const addTodoReducer = (state:List<ITodo> = emptyTodoList, action:IAddTodoData):List<ITodo> => {
    switch (action.type){
        case Actions.ADD_TODO: {
            return state.push(new Todo({title: action.title}));
        }
        default:{
            return state;
        }
    }
};

const addTodo = (title:string):IAddTodoData => {
  return {
      title: title,
      type: Actions.ADD_TODO
  };
};

//tests
describe("add todo reducer 2", () => {
    it("shoud use empty list on initial", () => {
        var result = addTodoReducer(undefined, {type: Actions.NULL, title: 'hmm...'});
        expect(result).to.equal(emptyTodoList);
    });

    it("shoud return state if not handle action", () => {
        var state = List<ITodo>();

        var result = addTodoReducer(state, {type: Actions.NULL, title: 'hmm...'});
        expect(result).to.equal(state);
    });

    it("shoud add todo item to state", () => {
        var todoText = "some important task";

        var oldState = List<ITodo>();
        var newState  = List<ITodo>();
        newState = newState.push(new Todo({title: todoText}));

        var result = addTodoReducer(oldState, {type: Actions.ADD_TODO, title: todoText});
        console.log(result);
        console.log(newState);
        expect(result.get(0)).to.eql(newState.get(0));
        expect(result).to.equal(newState);
    });

    it("shoud add todo item after previous", () => {
        var oldState = List<ITodo>([
            {
                title: "task 1"
            },
            {
                title: "task 2"
            }
        ]);
        var todoText = "some important task";
        var newState = oldState.push(new Todo({title: todoText}));

        var result = addTodoReducer(oldState, {type: Actions.ADD_TODO, title: todoText});
        expect(result).to.equal(newState);
    });

    it("test chai immutable", () => {
        var a = List.of(1, 2, 3);
        var b = List.of(1, 2, 3);
        expect(a).to.equal(b);

        var a2 = List.of(Map({a: 1}));
        var b2 = List.of(Map({a: 1}));
        expect(a2).to.equal(b2);
    });
});

describe("add todo", () => {
    it("create right action", () => {
        var text = "some text";
        var action:IAddTodoData = {
            title: text,
            type: Actions.ADD_TODO
        };

        var result = addTodo(text);
        expect(result).to.eql(action);
    })
});

mocha.run();
console.log('all tests done');

//app

//todo whatever