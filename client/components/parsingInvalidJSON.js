console.clear()
var l = console.log

var structure = [
	"{\"modules\":[{\"id\":\"1\",\"screens\":[{\"id\":1,\"label\":\"Screen1\",\"zones\":[{\"h\":458,\"w\":642,\"x\":111,\"y\":74,\"id\":16},{\"h\":84,\"w\":562,\"x\":156,\"y\":456,\"id\":17},{\"h\":1080,\"w\":1920,\"x\":0,\"y\":0,\"id\":\"4_c_0\"}]},{\"id\":2,\"label\":\"Screen2\",\"zones\":[{\"h\":470,\"w\":676,\"x\":1051,\"y\":74,\"id\":4},{\"h\":428,\"w\":562,\"x\":1108,\"y\":576,\"id\":5},{\"h\":1080,\"w\":1920,\"x\":0,\"y\":0,\"id\":\"3_c_0\"}]},{\"id\":3,\"label\":\"Screen3\",\"zones\":[{\"h\":376,\"w\":944,\"x\":488,\"y\":79,\"id\":2},{\"h\":222,\"w\":1592,\"x\":164,\"y\":411,\"id\":4},{\"h\":1080,\"w\":1920,\"x\":0,\"y\":0,\"id\":\"3_c_0\"}]},{\"id\":4,\"label\":\"Screen4\",\"zones\":[{\"h\":197,\"w\":1501,\"x\":209,\"y\":716,\"id\":4},{\"h\":160,\"w\":1592,\"x\":164,\"y\":911,\"id\":1},{\"h\":1080,\"w\":1920,\"x\":0,\"y\":0,\"id\":\"3_c_0\"}]}]}],\"project\":{\"width\":1920,\"height\":1080}}",
	'{"modules": [{"id": "1", "screens": [{"id": 3, "label": "spring", "zones": [{"h": 94, "r": 0, "w": 876, "x": 522, "y": 617, "id": 7}, {"h": 137, "r": 0, "w": 973, "x": 473, "y": 480, "id": 6}, {"h": 360, "r": 0, "w": 640, "x": 1280, "y": 720, "id": "4_c_0"}, {"h": 360, "r": 0, "w": 640, "x": 640, "y": 720, "id": "3_c_0"}, {"h": 360, "r": 0, "w": 640, "x": 0, "y": 720, "id": "2_c_0"}, {"h": 720, "r": 0, "w": 1920, "x": 0, "y": 0, "id": "1_c_0"}]}]}], "project": {"width": 1920, "height": 1080}}',
	'{"project":{"height":1080,"width":1920}"',
	'{"modules": [{"id": "1", "screens": [{"id": 1, "label": "Scene 1", "zones": [{"h": 1920, "r": 0, "w": 1080, "x": 0, "y": 0, "id": "1_c_0" }]}]}], "project": {"width": 1080, "height": 1920}}',
	'{"modules": [{"id": "11", "screens": [{"id": 1, "label": "Scene 209"}]}], "project": {"width": 1080, "height": 1920}}',
 	'{"modules": [{"id": "11", "screens": [{"id": 1, "label": "Scene 209, "zones": [{"h": 1920, "r": 0, "w": 1080, "x": 0, "y": 0, "id": "1_c_0"}]}]}], "project": {"width": 1080, "height": 1920}}'
]


structure.forEach((str,i )=> findModulesAndProject(str, i))


function findModulesAndProject(str, num){
	var regExp_module_project = /(?:(?:modules).*?:(.*]).*?)?(?:(?:project).*?:(.*?}))/im
	var matches = str.match(regExp_module_project)
	var modules = matches[1]
	var project = matches[2]

	//l({modules, project})

	if(modules){
		try {
			modules = JSON.parse(modules)
		
		} catch(e) {
			l("CANT PARSE MODULE", num)
			
			// modify modules by hand parser
			var handedParsePrepare = findArrayAndObject(modules)

			try {
				modules = JSON.parse(handedParsePrepare)
			} catch(e) {
				l('OH NO, STILL CANT PARSE MODULE', num)
			}
		}
	}

	if(project){
		try{
			project = JSON.parse(project)

		} catch(e){
			l("CANT PARSE PROJECT", num)
			var handedParsePrepare = findArrayAndObject(project)

			try{
				project = JSON.parse(handedParsePrepare)
			} catch(e){
				l('OH NO, STILL CANT PARSE PROJECT', num)
			}
		}
	}


	l({modules, project})
	return {modules, project}
}


function findArrayAndObject(str){
	var startEndLvlSymbol = '-'
	var groupOpen = 'open'
	var groupClose = 'close'
	var objectLvl = 1
	var objectLvlSymbol = '!'
	var arrayLvl = 1
	var arrayLvlSymbol = '_'
	
 
 	// modificate string : replace [] {} with -_1open- etc
	str = str.split('')
	 
	for(var i = 0; i < str.length; i++){
		if(str[i] == '['){
			str[i] = startEndLvlSymbol + arrayLvlSymbol + arrayLvl + groupOpen + startEndLvlSymbol
			//str[i] = '[' + startEndLvlSymbol +  arrayLvlSymbol.repeat(arrayLvl) 
			arrayLvl++
		}
		
		if(str[i] == ']'){
			arrayLvl--
			str[i] = startEndLvlSymbol + arrayLvlSymbol + arrayLvl + groupClose + startEndLvlSymbol
			//str[i] = arrayLvlSymbol.repeat(arrayLvl) + ']'
		}
		
		if(str[i] == '{'){
			str[i] = startEndLvlSymbol + objectLvlSymbol + objectLvl + groupOpen + startEndLvlSymbol
			//str[i] = //'{' + objectLvlSymbol.repeat(objectLvl)
			objectLvl++
		}
		
		if(str[i] == '}'){
			objectLvl--
			str[i] =  str[i] = startEndLvlSymbol + objectLvlSymbol + objectLvl + groupClose + startEndLvlSymbol
			 //str[i] = //objectLvlSymbol.repeat(objectLvl) + '}'
		}
	}
	
	str = str.join('')




	return getStructureRecursive(str)
	
	function getStructureRecursive(str, parentType, lvl){
		var tempValue = 'A_'
		var regExp = new RegExp(`${startEndLvlSymbol}([${arrayLvlSymbol}|${objectLvlSymbol}])(\\d+)${groupOpen}${startEndLvlSymbol}(.*?)${startEndLvlSymbol}\\1\\2${groupClose}${startEndLvlSymbol}`)
		var regExpGlobal = new RegExp(`${startEndLvlSymbol}([${arrayLvlSymbol}|${objectLvlSymbol}])(\\d+)${groupOpen}${startEndLvlSymbol}(.*?)${startEndLvlSymbol}\\1\\2${groupClose}${startEndLvlSymbol}`, 'g')
		
		//l(str)
		
		// find all matches
		var matchesGlobal = str.match(regExpGlobal)
		
		
		
	 	// if no matches => return current string
		if(!matchesGlobal){
			str = normalizeString(str)

			// add separator {} or []
			if(parentType == 'object'){
				str = `{${str}}`
			} else {
				str = `[${str}]`
			}

			return str
		}
		
		// replace original match to tempValue_num (just for edit other props)
		matchesGlobal.forEach((strWithMatch, i) => {
			//l('strWithMatch')
			//l(strWithMatch)
			str = str.replace(strWithMatch, tempValue + i)
		})

		//l(parentType)
		//l(str)
		

		// normalise string : 
		str = normalizeString(str)

		
		matchesGlobal.forEach((strWithMatch, i) => {
			//l(strWithMatch)
			
			var matches = strWithMatch.match(regExp)
			
			var type = matches[1] == objectLvlSymbol ? 'object' : 'array'
			var lvl = matches[2]
			var inside = matches[3]
			//l(matches)
			//l(matchesGlobal)
		 	//l(type, lvl)

		 	// look inside [] {}
			if(inside){
				inside = getStructureRecursive(inside, type)
			} 

			// replace back tempValue_num with inside
			str = str.replace(tempValue+i, inside)
		})


		// add separator {} or []
		if(parentType == 'object'){
			str = `{${str}}`
		} else {
			str = `[${str}]`
		}

		return str


		function normalizeString(str){
			str = str.split(',').map(item => {
				return item.split(':').map(param => {
					param = param.trim()
					param.replace("'", '"')
					// add " 
					if(param[0] == '"' && param[param.length - 1] != '"') param = param + '"'
					//l(param)
					return param
				}).join(':')
			}).join(',')
			
			return str
		}
	}
}