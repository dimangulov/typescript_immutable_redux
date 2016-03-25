/// <reference path="./typings/mocha.d.ts" />
/// <reference path="./typings/chai.d.ts" />
/// <reference path="./typings/immutable.d.ts" />
System.register(['chai', 'immutable', 'chai-immutable'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var chai, Immutable, chaiImmutable;
    var expect, List, Map, Record, Actions, defaultTodo, Todo, emptyTodoList, addTodoReducer, addTodo;
    return {
        setters:[
            function (chai_1) {
                chai = chai_1;
            },
            function (Immutable_1) {
                Immutable = Immutable_1;
            },
            function (chaiImmutable_1) {
                chaiImmutable = chaiImmutable_1;
            }],
        execute: function() {
            chai.use(chaiImmutable);
            expect = chai.expect;
            List = Immutable.List;
            Map = Immutable.Map;
            Record = Immutable.Record;
            mocha.setup('bdd');
            Actions = {
                NULL: "NULL",
                ADD_TODO: "ADD_TODO"
            };
            defaultTodo = {
                title: ""
            };
            Todo = (function (_super) {
                __extends(Todo, _super);
                function Todo(props) {
                    _super.call(this, props);
                }
                return Todo;
            }(Record(defaultTodo)));
            emptyTodoList = Immutable.List([]);
            addTodoReducer = function (state, action) {
                if (state === void 0) { state = emptyTodoList; }
                switch (action.type) {
                    case Actions.ADD_TODO: {
                        return state.push(new Todo({ title: action.title }));
                    }
                    default: {
                        return state;
                    }
                }
            };
            addTodo = function (title) {
                return {
                    title: title,
                    type: Actions.ADD_TODO
                };
            };
            //tests
            describe("Todo", function () {
                it("test todo", function () {
                    var todo = new Todo({ title: "XXX" });
                    expect(todo.title).to.be.equal("XXX");
                });
                it("todo is immutable", function () {
                    var todo = new Todo({ title: "XXX" });
                    expect(function () { return todo.title = "XXX1"; }).to
                        .throw();
                });
            });
            describe("add todo reducer 2", function () {
                it("shoud use empty list on initial", function () {
                    var result = addTodoReducer(undefined, { type: Actions.NULL, title: 'hmm...' });
                    expect(result).to.equal(emptyTodoList);
                });
                it("shoud return state if not handle action", function () {
                    var state = List();
                    var result = addTodoReducer(state, { type: Actions.NULL, title: 'hmm...' });
                    expect(result).to.equal(state);
                });
                it("shoud add todo item to state", function () {
                    var todoText = "some important task";
                    var oldState = List();
                    var newState = List();
                    newState = newState.push(new Todo({ title: todoText }));
                    var result = addTodoReducer(oldState, { type: Actions.ADD_TODO, title: todoText });
                    console.log(result);
                    console.log(newState);
                    expect(result.get(0)).to.eql(newState.get(0));
                    expect(result).to.equal(newState);
                });
                it("shoud add todo item after previous", function () {
                    var oldState = List([
                        {
                            title: "task 1"
                        },
                        {
                            title: "task 2"
                        }
                    ]);
                    var todoText = "some important task";
                    var newState = oldState.push(new Todo({ title: todoText }));
                    var result = addTodoReducer(oldState, { type: Actions.ADD_TODO, title: todoText });
                    expect(result).to.equal(newState);
                });
                it("test chai immutable", function () {
                    var a = List.of(1, 2, 3);
                    var b = List.of(1, 2, 3);
                    expect(a).to.equal(b);
                    var a2 = List.of(Map({ a: 1 }));
                    var b2 = List.of(Map({ a: 1 }));
                    expect(a2).to.equal(b2);
                });
            });
            describe("add todo", function () {
                it("create right action", function () {
                    var text = "some text";
                    var action = {
                        title: text,
                        type: Actions.ADD_TODO
                    };
                    var result = addTodo(text);
                    expect(result).to.eql(action);
                });
            });
            mocha.run();
            console.log('all tests done');
        }
    }
});
//app
//todo whatever 
//# sourceMappingURL=main.js.map