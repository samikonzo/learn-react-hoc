import Dispatcher from '../dispatcher/AppDispatcher.js'
import Constants from '../constants/AppConstants.js'
import { EventEmitter } from 'events'


const Events = {
	'CHANGE_STATE' : 'CHANGE_STATE'
}

const initState = {
	empty: true,
}

let state = Object.assign({}, initState)




Dispatcher.register( function(action){
	switch(action.type){

		// login
		/*case Constants.CHECK_LOGIN : {
			State.loading = true
			AppStore.emitChange()
			break;
		}*/

	}
})	


const AppStore = Object.assign({}, EventEmitter.prototype, {
	addChangeListener(f){
		this.on(Events.CHANGE_STATE, f)
	},

	removeChangeListener(f){
		this.removeListener(Events.CHANGE_STATE, f)
	},

	emitChange(){
		//l('emit')
		this.emit(Events.CHANGE_STATE)
	},

	getState(...props){
		//l(...props)
		return state
	}
})


export default AppStore


/*setTimeout(function f(){
	AppStore.emitChange()

	setTimeout(f, 2000)
}, 2000)*/