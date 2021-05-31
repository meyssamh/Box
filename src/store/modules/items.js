/* eslint-disable no-magic-numbers */
const startIndex = 0;
const endIndex = 10;

const state = {
	items: [],
	item: '',
	count: 1,
	date: new Date().toISOString().slice(startIndex, endIndex),
	time: null,
	itemIndexForDelete: null,
	itemIndexForEdit: null,
	alertDisplay: false,
};

const mutations = {
	'INITIAL_ITEMS'(state, items) {
		state.items = items;
	},
	'SET_ITEM'(state, item) {
		state.item = item;
	},
	'SET_COUNT'(state, count) {
		state.count = count;
	},
	'SET_DATE'(state, date) {
		state.date = date;
	},
	'SET_TIME'(state, time) {
		state.time = time;
	},
	'NEW_ITEM'(state) {
		const newItem = {
			name: state.item,
			count: state.count,
			date: state.date,
			time: state.time,
			id: new Date().getTime(),
			notified: false
		};

		if (state.itemIndexForEdit === null) {
			state.items.push(newItem);
		} else {
			const index = state.itemIndexForEdit;
			state.items.splice(index, 1, newItem);
		}

		localStorage.setItem('items', JSON.stringify(state.items));

		state.item = '';
		state.count = 1;
		state.date = new Date().toISOString().slice(startIndex, endIndex);
		state.time = null;
		state.itemIndexForDelete = null;
		state.itemIndexForEdit = null;
	},
	'CLEAR_STATE'(state) {
		state.item = '';
		state.count = 1;
		state.date = new Date().toISOString().slice(startIndex, endIndex);
		state.time = null;
		state.itemIndexForDelete = null;
		state.itemIndexForEdit = null;
	},
	'FIND_ITEM_FOR_DELETE'(state, item) {
		const id = item.id;
		state.itemIndexForDelete = state.items.findIndex(item => {
			return item.id === id;
		});
	},
	'DELETE_ITEM'(state) {
		const index = state.itemIndexForDelete;
		state.items.splice(index, 1);
		localStorage.setItem('items', JSON.stringify(state.items));
		state.itemIndexForDelete = null;
		state.itemIndexForEdit = null;
	},
	'FIND_ITEM_FOR_EDIT'(state, item) {
		const id = item.id;
		const index = state.items.findIndex(item => {
			return item.id === id;
		});
		state.itemIndexForEdit = index;
		state.item = state.items[index].name;
		state.count = state.items[index].count;
		state.date = state.items[index].date;
		state.time = state.items[index].time;
	},
	'SET_ALERT_DISPLAY'(state, value) {
		state.alertDisplay = value;
		if (value == false) {
			localStorage.setItem('alertDisplay', value);
		}
	},
	'CHANGE_NOTIFIED'(state, index) {
		state.items[index].notified = true;
		localStorage.setItem('items', JSON.stringify(state.items));
	}
};

const actions = {
	initialItems({ commit }, items) {
		commit('INITIAL_ITEMS', items);
	},
	setItem({ commit }, item) {
		commit('SET_ITEM', item);
	},
	setCount({ commit }, count) {
		commit('SET_COUNT', count);
	},
	setDate({ commit }, date) {
		commit('SET_DATE', date);
	},
	setTime({ commit }, time) {
		commit('SET_TIME', time);
	},
	newItem({ commit }) {
		commit('NEW_ITEM');
	},
	clearState({ commit }) {
		commit('CLEAR_STATE');
	},
	findItemForDelete({ commit }, item) {
		commit('FIND_ITEM_FOR_DELETE', item);
	},
	deleteItem({ commit }) {
		commit('DELETE_ITEM');
	},
	findItemForEdit({ commit }, item) {
		commit('FIND_ITEM_FOR_EDIT', item);
	},
	setAlertDisplay({ commit }, value) {
		commit('SET_ALERT_DISPLAY', value);
	},
	changeNotified({ commit }, index) {
		commit('CHANGE_NOTIFIED', index);
	}
};

const getters = {
	item: state => {
		return state.item;
	},
	count: state => {
		return state.count;
	},
	date: state => {
		return state.date;
	},
	time: state => {
		return state.time;
	},
	items: state => {
		return state.items;
	},
	alertDisplay: state => {
		return state.alertDisplay;
	},
};

export default {
	state,
	mutations,
	actions,
	getters
};