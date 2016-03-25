///<reference path="../typings/main.d.ts"/>

import {ITodo, Todo} from "./todo";
import {addTodoReducer, addTodo, IAddTodoData} from "./actions";
import {Actions} from "./constants";

import chai = require('chai');
import Immutable = require('immutable');
import chaiImmutable from 'chai-immutable';

chai.use(chaiImmutable);

const expect = chai.expect;

import List = Immutable.List;
import Map = Immutable.Map;
import Record = Immutable.Record;

mocha.setup("bdd");

const emptyTodoList = Immutable.List<ITodo>([]);

//tests
describe("Todo", () => {
    it("test todo", () => {
       var todo = new Todo({title: "XXX"});
        expect(todo.title).to.be.equal("XXX");
    }); 

    it("todo is immutable", () => {
        var todo = new Todo({title: "XXX"});
        expect(() => todo.title = "XXX1").to
            .throw();
    });
});

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