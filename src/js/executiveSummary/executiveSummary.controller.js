var app = angular.module("weeklyReports", []);
app.controller("reportsCtrl", function($scope,$http, $timeout) {
    $scope.printOption=function(){
        window.print();
    };

    $http({ method: 'GET', url: '../mock-data/tableData.json' }).success(function (data) {
            $scope.tableData = data; // response data 
        }).
        error(function (data) {
            console.log("error");
    });

        var tableDatas={};
        var incidentDataJson=[
            ["Weekly Report (MM/DD/YYYY)"],
            ["Overall","Green","Green","Green","Green","Green","Green"],
            ["Incidents"],
            ["Problem Records"]
        ];
        var slaViewData= [
			["Sev 1","4 hours",,,0],
			["Sev 2","8 hours",,,0],
			["Sev3/4","NA",,"NA","NA"]
		];
        var csvfiles=["all incidents.csv","all problems records.csv"];
        var allResults=[];

		for (var i = 0; i < csvfiles.length; i++)
		{
         	Papa.parse("../mock-data/"+csvfiles[i], {
		        download: true,
		        dynamicTyping: true,
		        complete: function(results) { 
		        	allResults.push(results);
		        	if (allResults.length === csvfiles.length)
		            {
		            	function getfulldate(today) { //returns date in mm/dd/yyyy format
		            		var currentDate=today.getDate(),
		            			currentMonth=today.getMonth()+1;
		            		var x=(currentMonth<10)?('0'+currentMonth):currentMonth;
		            		var y=(currentDate<10)?('0'+currentDate):currentDate;
			            	return (x+'/'+y+'/'+today.getFullYear());
			            }
			            function getLastSunday(d) { //returns last sunday date takes input as mm/dd/yyyy
						  	var t = new Date(d);
						  	t.setDate(t.getDate() - t.getDay());
						  	return t;
						}
						function getDateStamp(dateStamp) {
							var monthName=["Jan", "Feb", "Mar", "Apr", "May", "June","July", "Aug", "Sept", "Oct", "Nov", "Dec"];
							var newDate= new Date(dateStamp);
							return newDate.getDate()+"-"+monthName[newDate.getMonth()]+"-"+newDate.getFullYear();
						}

						var lastSundaydate=getLastSunday(getfulldate(new Date()));
						tableDatas["date"]=getDateStamp(lastSundaydate);
						var lastSunday=getfulldate(lastSundaydate);
						var i=2;
						incidentDataJson[0][i-1]=lastSunday;
						do{
							var newlastSundaydate=new Date(lastSundaydate.setDate(lastSundaydate.getDate() - 7));
							var newlastSunday=getfulldate(newlastSundaydate);
							incidentDataJson[0][i]=newlastSunday;
							lastSundaydate=newlastSundaydate;
							lastSunday=newlastSunday;
							i++;
						} while(i<7)

						/***incident Count ***/
						var firstEl=true,criticalCount=0,highCount=0,lowCount=0;

						for (var i=1;i<incidentDataJson[0].length;i++) {
							var dateTo=incidentDataJson[0][i];
			                var to=new Date(dateTo);
			                var newto=new Date(dateTo);
			                var dateFrom=new Date(newto.setDate(newto.getDate() - 6));
			                var incidentCount=0;
							for (var j=1;j<allResults[1].data.length-1;j++) {
								var getDate=allResults[1].data[j][8];
							    var daterange=getDate.substring(0, getDate.indexOf(' '));
							    var check=new Date(daterange);
								if(check >= dateFrom && check <= to ) {
			                    	incidentCount++;
			                    	if(allResults[1].data[j][0]==="Critical" && firstEl) {
			                    		criticalCount++;
			                    	}
			                    	if(allResults[1].data[j][0]==="High" && firstEl) {
			                    		highCount++;
			                    	}
			                    	if((allResults[1].data[j][0]==="Medium" || allResults[1].data[j][0]==="Low") && firstEl) {
			                    		lowCount++;
			                    	}


			                	}
							}
							firstEl=false;
							incidentDataJson[2][i]=incidentCount;
						}
						/***problem Count ***/
						for (var i=1;i<incidentDataJson[0].length;i++) {
							var dateTo=incidentDataJson[0][i];
			                var to=new Date(dateTo);
			                var newto=new Date(dateTo);
			                var dateFrom=new Date(newto.setDate(newto.getDate() - 6));
			                var problemCount=0;
							for (var j=1;j<allResults[0].data.length-1;j++) {
								var getDate=allResults[0].data[j][9];
							    var daterange=getDate.substring(0, getDate.indexOf(' '));
							    var check=new Date(daterange);
								if(check >= dateFrom && check <= to && allResults[0].data[j][3]==="Draft" ) {
			                    	problemCount++;
			                	}
							}
							incidentDataJson[3][i]=problemCount;
						}

		            }//close outer if
		            slaViewData[0][2]=criticalCount;
		            slaViewData[0][3]=criticalCount;
		            slaViewData[1][2]=highCount;
		            slaViewData[1][3]=highCount;
		            slaViewData[2][2]=lowCount;
		            tableDatas["incidentData"]=incidentDataJson;
		            tableDatas["slaView"]=slaViewData;

		            $timeout(function(){
			           // $scope.incidentDataJson=incidentDataJson;
			            $scope.tableDatas=tableDatas;
		            });
		        }//complete
		    });//papa parse
		}//for

        

});//app

