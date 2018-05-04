/**
*	Dispatchers multiRequest issue fix
* 	by creating queue of requests
*/

import Dispatcher from '../dispatcher/AppDispatcher.js'


function DispatcherFix(AppActions){

	function dispatchingCheck(fName, args){
		/**
		*	check Dispatcher.isDispatching
			if Dispather not buzy return false 
			else 
				return true (and prevent original func) 
				create queue (if not exist)
				add
		*/

		if(Dispatcher.isDispatching()){

			// in no queue -> create
			if(!Dispatcher._queue) Dispatcher._queue = []

			// add functionName and arguments in queue	
			Dispatcher._queue.push({
				fName: fName,
				arguments: args,
			})	

			// if (Dispatcher.isDispatching) "checker" not running -> run it
			if(!Dispatcher._queueTimer){
				Dispatcher._queueTimer = setTimeout( function f(){

					// check Dispatcher is buzy? run new timer : run queue funcs
					if(Dispatcher.isDispatching()){
						Dispatcher._queueTimer = setTimeout( f, 100 )
					} else {

						//  check queue existing
						if(Dispatcher._queue){

							// get first function and remove it from queue
							var delayedF = Dispatcher._queue.splice(0,1)[0]

							// run function
							AppActions[delayedF.fName].apply(null, delayedF.arguments)

							// check queue length ? run timer for next : remove queue
							if(!Dispatcher._queue.length){
								delete Dispatcher._queue
								delete Dispatcher._queueTimer	
							} else {
								Dispatcher._queueTimer = setTimeout( f, 100 )
							}
						}

					}

				}, 100)	
			} 

			return true
		} else {
			return false
		}
	}

	for(let fName in AppActions){
		let savedF = AppActions[fName]

		AppActions[fName] = function(){
			if(dispatchingCheck(fName, arguments))	return
		
			savedF.apply(null, arguments)
		}
	}

}

export default DispatcherFix

//////////////////////////////////////