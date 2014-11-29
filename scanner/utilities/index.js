module.exports = {

	arrayToCommaSeparatedString : function(array){
		/* Printing available scan modules */
		var list = "";
		array.forEach(function(element){
			list += element + ", ";
		});
		list = list.slice(0, list.length - 2); //cutting out trailing ', '
		return list;
	},

	objectToCommaSeparatedString : function(object){
		/* Printing available scan modules */
		var list = "";
		Object.keys(object).forEach(function(property){
			list += property + ", ";
		});
		list = list.slice(0, list.length - 2); //cutting out trailing ', '
		return list;
	}

}