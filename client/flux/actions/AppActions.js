import Dispatcher from '../dispatcher/AppDispatcher.js'
import Constants from '../constants/AppConstants.js'
import api from '../api/api.js'
import DispatcherFix from './DispatcherFix.js'

const AppActions = {

	/*
		actionName(){
			Dispatcher.dispatch({
				type: Constants.ACTION_CONSTATN_NAME
			})

			api.apiFunc().then(
				data => { 
					Dispatcher.dispatch({
						type: Constants.RESPONSE_CONSTANT_NAME,
						data: data})
				},

				err => { }
			)

		}
	*/
}



/**
*	Dispatchers multiRequest issue fix
*/

DispatcherFix(AppActions)

//////////////////////////////////////


export default AppActions