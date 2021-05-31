/* eslint-disable no-magic-numbers */
/* eslint-disable no-undef */
import Sinon from 'sinon';

import * as Items from './items';

const mutations = Items.default.mutations;
const actions = Items.default.actions;
const getters = Items.default.getters;

const defaultItem = {
	name: 'Bread',
	count: 4,
	date: '2021-01-09',
	time: '11:15',
	id: new Date().getTime()
};

describe('items.js', () => {

	describe('mutations', () => {

		let state;

		beforeEach(() => {
			state = {
				items: [],
				item: '',
				count: 1,
				date: new Date().toISOString().slice(0, 10),
				time: null,
				itemIndexForDelete: null,
				itemIndexForEdit: null,
				alertDisplay: false,
			};
		});

		test('INITIAL_ITEMS initialisiert items', () => {
			const items = [defaultItem];
			mutations.INITIAL_ITEMS(state, items);

			expect(state.items).toBe(items);
		});

		test('SET_ITEM sets the name of new item', () => {
			const item = 'Bread';
			mutations.SET_ITEM(state, item);

			expect(state.item).toBe(item);
		});

		test('SET_COUNT sets the count of items', () => {
			const count = 8;
			mutations.SET_COUNT(state, count);

			expect(state.count).toBe(count);
		});

		test('SET_DATE sets the chosen date', () => {
			const date = '2022-10-03';
			mutations.SET_DATE(state, date);

			expect(state.date).toBe(date);
		});

		test('SET_TIME sets the chosen time', () => {
			const time = '14:06';
			mutations.SET_TIME(state, time);

			expect(state.time).toBe(time);
		});

		test('NEW_ITEM adds new item to state.items and saves state.items to localStorage', () => {
			const item = 'Bread';
			const count = 6;
			const date = '2022-04-12';
			const time = '09:18';

			state.item = item;
			state.count = count;
			state.date = date;
			state.time = time;

			mutations.NEW_ITEM(state);

			const items = state.items[0];
			expect(items.name).toBe(item);
			expect(items.count).toBe(count);
			expect(items.date).toBe(date);
			expect(items.time).toBe(time);
		});

		test('NEW_ITEM edits the current item in state.items and saves state.items to localStorage', () => {
			state.items.push(defaultItem);

			const item = 'Apple';
			const count = 16;
			const date = '2021-12-11';
			const time = '20:00';

			state.itemIndexForEdit = 0;
			state.item = item;
			state.count = count;
			state.date = date;
			state.time = time;

			mutations.NEW_ITEM(state);

			const items = state.items[0];
			expect(items.name).toBe(item);
			expect(items.count).toBe(count);
			expect(items.date).toBe(date);
			expect(items.time).toBe(time);
		});

		test('CLEAR_STATE resets every item in state but state.items', () => {
			const newState = {
				items: [],
				item: '',
				count: 1,
				date: new Date().toISOString().slice(0, 10),
				time: null,
				itemIndexForDelete: null,
				itemIndexForEdit: null
			};

			state.items = [defaultItem];
			state.item = 'Orange';
			state.count = 7;
			state.date = '2025-04-27';
			state.time = '13:15';
			state.itemIndexForDelete = 9;
			state.itemIndexForEdit = 5;

			mutations.CLEAR_STATE(state);

			expect(state.items).not.toBe(newState.items);
			expect(state.item).toBe(newState.item);
			expect(state.count).toBe(newState.count);
			expect(state.date).toBe(newState.date);
			expect(state.time).toBe(newState.time);
			expect(state.itemIndexForDelete).toBe(newState.itemIndexForDelete);
			expect(state.itemIndexForEdit).toBe(newState.itemIndexForEdit);
		});

		test('FIND_ITEM_FOR_DELETE finds an item in state.items and saves its index in state.itemIndexForDelete', () => {
			state.items.push(defaultItem);

			mutations.FIND_ITEM_FOR_DELETE(state, defaultItem);

			expect(state.itemIndexForDelete).not.toBe(null);
			expect(state.itemIndexForDelete).toBe(0);
		});

		test('DELETE_ITEM deletes an item from state.items, sets state.itemIndexForDelete to null and saves state.items to localStorage', () => {
			state.items.push(defaultItem);
			state.itemIndexForDelete = 0;

			mutations.DELETE_ITEM(state);

			expect(state.items.length).toBe(0);
			expect(state.itemIndexForDelete).toBe(null);
		});

		test('FIND_ITEM_FOR_EDIT finds an item in state.items, saves it\'s index in state.itemIndexForEdit and pre-populates needed state items', () => {
			state.items.push(defaultItem);

			mutations.FIND_ITEM_FOR_EDIT(state, defaultItem);

			expect(state.itemIndexForEdit).toBe(0);
			expect(state.item).toBe(defaultItem.name);
			expect(state.count).toBe(defaultItem.count);
			expect(state.date).toBe(defaultItem.date);
			expect(state.time).toBe(defaultItem.time);
		});

		test('SET_ALERT_DISPLAY will change alertDisplay in satet and if the payload is equal to false will save alertDisplay in localStorage', () => {
			const value = true;
			mutations.SET_ALERT_DISPLAY(state, value);

			expect(state.alertDisplay).toBe(value);
		});

		test('CHANGE_NOTIFIED will change notified value of an item in state.items and save items in localStorage', () => {
			const index = 0;
			state.items.push(defaultItem);

			mutations.CHANGE_NOTIFIED(state, index);
			expect(state.items[index].notified).toBe(true);
		});
	});

	describe('actions', () => {

		let commit;

		beforeEach(() => {
			commit = Sinon.spy();
		});

		test('initialItems triggers INITIAL_ITEMS and passes the payload', () => {
			const items = [defaultItem];
			actions.initialItems({ commit }, items);

			expect(commit.args[0][0]).toBe('INITIAL_ITEMS');
			expect(commit.args[0][1]).toBe(items);
		});

		test('setItem triggers SET_ITEM and passes the payload', () => {
			const item = 'Bread';
			actions.setItem({ commit }, item);

			expect(commit.args[0][0]).toBe('SET_ITEM');
			expect(commit.args[0][1]).toBe(item);
		});

		test('setCount triggers SET_COUNT and passes the payload', () => {
			const count = 5;
			actions.setCount({ commit }, count);

			expect(commit.args[0][0]).toBe('SET_COUNT');
			expect(commit.args[0][1]).toBe(count);
		});

		test('setDate triggers SET_DATE and passes the payload', () => {
			const date = new Date().toISOString().slice(0, 10);
			actions.setDate({ commit }, date);

			expect(commit.args[0][0]).toBe('SET_DATE');
			expect(commit.args[0][1]).toBe(date);
		});

		test('setTime triggers SET_TIME and passes the payload', () => {
			const time = '17:29';
			actions.setTime({ commit }, time);

			expect(commit.args[0][0]).toBe('SET_TIME');
			expect(commit.args[0][1]).toBe(time);
		});

		test('newItem triggers NEW_ITEM', () => {
			actions.newItem({ commit });

			expect(commit.args[0][0]).toBe('NEW_ITEM');
		});

		test('clearState triggers CLEAR_STATE', () => {
			actions.clearState({ commit });

			expect(commit.args[0][0]).toBe('CLEAR_STATE');
		});

		test('findItemForDelete triggers FIND_ITEM_FOR_DELETE and passes the payload', () => {
			actions.findItemForDelete({ commit }, defaultItem);

			expect(commit.args[0][0]).toBe('FIND_ITEM_FOR_DELETE');
			expect(commit.args[0][1]).toMatchObject(defaultItem);
		});

		test('deleteItem triggers DELETE_ITEM', () => {
			actions.deleteItem({ commit });

			expect(commit.args[0][0]).toBe('DELETE_ITEM');
		});

		test('findItemForEdit triggers FIND_ITEMFOR_EDIT and passes the payload', () => {
			actions.findItemForEdit({ commit }, defaultItem);

			expect(commit.args[0][0]).toBe('FIND_ITEM_FOR_EDIT');
			expect(commit.args[0][1]).toMatchObject(defaultItem);
		});

		test('setAlertDisplay triggers SET_ALERT_DISPLAY and passes the payload', () => {
			const value = true;
			actions.setAlertDisplay({ commit }, value);

			expect(commit.args[0][0]).toBe('SET_ALERT_DISPLAY');
			expect(commit.args[0][1]).toBe(value);
		});

		test('changeNotified will trigger CHANGE_NOTIFIED and passes the payload', () => {
			const index = 9;
			actions.changeNotified({ commit }, index);

			expect(commit.args[0][0]).toBe('CHANGE_NOTIFIED');
			expect(commit.args[0][1]).toBe(index);
		});
	});

	describe('getters', () => {

		let state;

		beforeEach(() => {
			state = {
				items: [],
				item: '',
				count: 1,
				date: new Date().toISOString().slice(0, 10),
				time: null,
				itemIndexForDelete: null,
				itemIndexForEdit: null,
				alertDisplay: false,
			};
		});

		test('item returns state.item', () => {
			const item = getters.item(state);
			expect(item).toBe(state.item);

			state.item = 'Bread';
			const newItem = getters.item(state);
			expect(newItem).toBe(state.item);
		});

		test('count returns state.count', () => {
			const count = getters.count(state);
			expect(count).toBe(state.count);

			state.count = 7638;
			const newCount = getters.count(state);
			expect(newCount).toBe(state.count);
		});

		test('date returns state.date', () => {
			const date = getters.date(state);
			expect(date).toBe(state.date);
		});

		test('time returns state.time', () => {
			const time = getters.time(state);
			expect(time).toBe(state.time);

			state.time = '22:50';
			const newTime = getters.time(state);
			expect(newTime).toBe(state.time);
		});

		test('items returns state.items', () => {
			const items = getters.items(state);
			expect(items).toBe(state.items);

			state.items = [defaultItem];
			const newItems = getters.items(state);
			expect(newItems).toBe(state.items);
		});

		test('alertDisplay will return state.alertDisplay', () => {
			const alertDisplay = getters.alertDisplay(state);
			expect(alertDisplay).toBe(state.alertDisplay);
			
			state.alertDisplay = true;
			const newAlertDisplay = getters.alertDisplay(state);
			expect(newAlertDisplay).toBe(state.alertDisplay);
		});
	});
});