import React, { Component } from 'react';
import WithSubscription from './WithSubscription.jsx'
import AppStore from '../flux/stores/AppStore'
//styles
import './Insider.less'

class Insider extends Component {
	constructor(props){
		super(props)

		this.state={
			isBlinked : false
		}

		this.onChange_Insider = this.onChange_Insider.bind(this)
	}

	componentWillReceiveProps(nextProps){
		this.onChange_Insider()
	}

	onChange_Insider(){
		this.setState({
			isBlinked: true,
		}, () => {
			setTimeout(() => {
				this.setState({
					isBlinked: false
				})
			}, 1000)
		})
	}



	render() {

		let className = 'Insider '
		if(this.state.isBlinked) className += 'Insider--blinked'

		return (
			<div className={className}> Insider </div>
		);
	}
}

let InsiderWithSub = WithSubscription(Insider, AppStore, AppStore.getState)

export default InsiderWithSub