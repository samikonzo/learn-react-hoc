import React from 'react'
import AppStore from '../flux/stores/AppStore'
import Insider from './Insider.jsx'
import WithSub from './WithSubscription.jsx'
import './Home.less'
import './parsingInvalidJSON.js'

let InsiderWithSub = WithSub(Insider, AppStore, AppStore.getState)

global.l = console.log

class Home extends React.Component{
	constructor(props){
		super(props)

		this.state = {
			data: this.props.data
		}

		this.onChange_Home = this.onChange_Home.bind(this)
	}


	componentWillReceiveProps(nextProps){
		this.onChange_Home()
	}

	onChange_Home(){
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

	render(){

		let className = 'Home '
		if(this.state.isBlinked) className += 'Home--blinked'

		return(
			<div className={className}>
				{/*<h1> Home component </h1>
				<InsiderWithSub />*/}
			</div>
		)
	}
}

const HomeWithSub = WithSub(Home, AppStore, AppStore.getState )


export default HomeWithSub