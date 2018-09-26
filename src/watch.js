import React from 'react';
import './index.css';
import TextArea from './textarea'
import KeyboardNormal from './keyboard.normal'
import KeyboardZoom from './keyboard.wip'

// FileName: watch.js file
// Description:
//

//	@function: deviceIndependenceSize
//	@params:
//		ppi : device independent pixel per inch values.
//		watchSize: Target AppleWatch size. Only two sizes are supported, 38mm and 42mm
//	If you pass 'ppi' and 'watchSize' properties to Watch component,
//	This function will help you calculate Watch display width and height in pixels.
const deviceIndependenceSize = (ppi,watchSize) => {
	var width,height,deviceWidthInPixel,deviceHeightInPixel;
	if(watchSize === 42){
		// AppleWatch Series 3 + size 42mm has a resolution of 312x390 px, 302 ppi
		//	DeviceSize: {Width:33.3, Height: 38.6mm}
		//	ScreenSize: {Width: 26mm , Height: 33mm}
		width = 26; height = 33;
		deviceWidthInPixel = width/25.4*ppi;
		deviceHeightInPixel = height/25.4*ppi;
		return {width: deviceWidthInPixel, height:deviceHeightInPixel};
	}else if(watchSize === 38){
		// AppleWatch Series 3 + size 38mm has a resolution of 272x340 px, 290 ppi
		// 	DeviceSize: {Width: 33.3mm, Height:42.5mm}
		//	ScreenSize: {Width: 24mm, Height: 30mm}
		width = 24; height = 30;
		deviceWidthInPixel = width/25.4*ppi;
		deviceHeightInPixel = height/25.4*ppi;
		return {width: deviceWidthInPixel, height:deviceHeightInPixel};
	}else{
		return {width:0, height:0}
	}
}

// Watch component renders a smartwatch interface
class Watch extends React.Component {

	constructor(props){
		super(props);
		if(props.size !== undefined && props.devicePPI !== undefined){
			this.screenSize = deviceIndependenceSize(this.props.devicePPI,this.props.size);
		}else{
			// you are not going to use pre-defined Watch size.
		}

		// React Component States.
		// inputChar: a variable containing your input character from Keyboard.
		// if 'inputChar' value has changed by onKeyCharReceived function,
		// Watch Component will re-render the interface
		this.state = {
			inputPhrase: ""
		};

		//add the target phrases here or load them from external files
		this.targetPhrase =  "target phrase one";
	}

	onKeyCharReceived = (c) => {
		//console.log("[Watch onHandleChange "+c);
		this.setState({inputChar : c});
		this.state.inputPhrase += c;
	};


	// //log data to files
	// //this sample code only logs the target phrase and the user's input phrases
	// //TODO: you need to log other measurements, such as the time when a user inputs each char, user id, etc.
	saveData = () => {
		let log_file = JSON.stringify({
			targetPhrase: this.targetPhrase,
			inputPhrase: this.state.inputPhrase
		})
		download(log_file, "results.txt", "text/plain");
	}


	render(){
		// style={{}} is an inline styling with calculated screen size
		if(this.props.type === 'normal'){
			return(
				<div className="watch">
					 <label>{this.targetPhrase}</label>
					<TextArea inputChar={this.state.inputChar}/>
					<KeyboardNormal originalScale={this.props.originalScale} onKeyCharReceived ={this.onKeyCharReceived}/>
					<button onClick={this.saveData}>SAVE</button>
				</div>
			);
		}else if(this.props.type === 'zoom'){
			return(
				<div className="watch">
				  <label>{this.targetPhrase}</label>
					<TextArea inputChar={this.state.inputChar}/>
					<KeyboardZoom originalScale={this.props.originalScale} onKeyCharReceived ={this.onKeyCharReceived}/>
					<button onClick={this.saveData}>SAVE</button>
				</div>
			);
		}else{
			// exception
		}

		/*
		if(this.props.type === 'normal'){
			return(
				<div className="watch" style={{width:this.screenSize.width, height:this.screenSize.height}} >
					<TextArea inputChar={this.state.inputChar}/>
					<KeyboardNormal original_scale={this.props.original_scale} displaySize = {this.screenSize} onKeyCharReceived ={this.onKeyCharReceived}/>
				</div>
			);
		}else if(this.props.type === 'zoom'){
			return(
				<div className="watch" style={{width:this.screenSize.width, height:this.screenSize.height}} >
					<TextArea inputChar={this.state.inputChar}/>
					<KeyboardZoom original_scale={this.props.original_scale} displaySize = {this.screenSize} onKeyCharReceived ={this.onKeyCharReceived}/>
				</div>
			);
		}else{
			// exception
		}*/
	}
}

function download(text, name, type) {
	 // console.log(JSON.parse(text));
	 var a = document.createElement("a");
	 var file = new Blob([text], {type: type});
	 a.href = URL.createObjectURL(file);
	 a.download = name;
	 a.click();
}

export default Watch