import React, { Component } from 'react';

const l = console.log

const withSub = (WrappedComponent, DataSource, selectData) => {
	return class extends Component {
		constructor(props){

			super(props)


			this.state = {
				data : selectData(DataSource, props)
			}

			this.handleChange = this.handleChange.bind(this)
		}


		componentDidMount(){
			DataSource.addChangeListener(this.handleChange)
		}

		componentWillUnmount(){
			DataSource.removeChangeListener(this.handleChange)
		}

		handleChange(){
			this.setState({
				data : selectData(this.props)
			})
		}

		render() {
			return <WrappedComponent data={this.state.data}  {...this.props} />
		}
	}
}




export default withSub						