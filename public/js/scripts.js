$(function() {

	//gets the average presure,speed and temp from an array of
	//num-decimals
	function getAvg(array) {
		var sum = 0;
		for (var i=0; i < array.length; i++) {
			sum += array[i];
		}
		//console.log('the array sum is: ' + sum);
		var avg = (sum/(array.length)).toFixed(2);
		//console.log('the average is: ' + avg);
		//return avg;
	
	}// getAvg 

	//testing function
    //var test = [34.96,34.94,34.8,34.76,34.7,34.7,34.4];
	//getAvg(test);


	


	function returnData(data) {
		//api data on data
		//console.log(data);

		// array of retDates,retTemp,retPres and retSpeed
		var retResults = [];
		// setting the first value in arrays, as specify by c3js.org chart library - timeseries.
		var retDates = ['x'];
		var retTemp = ['Average Temperature'];
		var retPres = ['Average Pressure'];
		var retSped = ['Average Speed'];

		//parsing data
		for (var key in data) {
			//if property belongs to object
			if(data.hasOwnProperty) {
				if((data[key].t !== null) && (data[key].p !== null) && 
					(data[key].s !== null)) {

					retDates.push(key);	//strings  	
					retTemp.push(data[key].t); //temp
					retPres.push(data[key].p); //pres
					retSped.push(data[key].s); //speed

				} //data is not null
				    
			}//if hasOwnProperty
			
		}//for key in data

		console.log(retDates);
		console.log(retTemp);
		console.log(retPres);
		console.log(retSped);
		
		// just retTemp data
		var removed = [];
		var newsubarray = [];
		if (retTemp.length > 0) {
			//console.log(retTemp.length); //length is 3
			for (var i=0; i < retTemp.length; i++) {
				//all three sub arrays
				var subarray = retTemp[i];
				//console.log(subarray);
				//find strings remove them
				
				for (var y=0; y < subarray.length; y++) {
					if (typeof(subarray[y]) !== "number") {
						//remove strings.object returns true
						//each instance one is found.
						removed += delete subarray[subarray[y]];
						
					} //if
					else {
						//need to separate numbers
						newsubarray += subarray[y] + ', ';

					}//else push them to a new object array
					
					
				}//inner loop
				
				
			}//outer loop
			console.log(removed); //removes avg temp string
			console.log(newsubarray); //add other two arrays into one single array


		}// if greater than zero

		document.getElementById('apidat').innerHTML = newsubarray;
		var apidatexplan = document.getElementById('apidatexplan').innerHTML += 'right now it returns the sum of the last two object sub-arrays for temperature \n but before that I\'ve removed the strings array';
	
	} //returnData





	function grabData() {

		$.ajax({
			url: 'http://foundationphp.com/phpclinic/podata.php?&raw&callback=?',
			jsonpCallback: 'jsonReturnData',
			dataType: 'jsonp',
			data: {
				startDate:'20150301',
				endDate: '20150302',
				format:'json'
			},
			success:function(response,status,http) {
				//console.log(response);
				returnData(response);
				
				
			},//success
			error: function(http, status, error) {
				console.log(error);
			} 

		});//ajax	

	}//grabData

	grabData();


	
	

	
	

}); //pageloaded

