const state = {
	check:[],
	count:[],
	done:false,
	start:false,
	save:false
}

const mutations = {
	setCheck(state,data){
		state.check = data
	},
	setCount(state,data){
		state.count = data
	},
	setDone(state,data){
		state.done = data
	},
	setStart(state,data){
		state.start = data
	},
	setSave(state,data){
		state.save = data
	}
}

const store = {
	state:state,
	mutations:mutations
}

export default store