var global_time_passed = 0;
var vidcurrenttime = 0;

room.update = function(msec) {

	global_time_passed += msec/1000; 
	vidcurrenttime = room.objects["mainvideo"].current_time;
	//room.objects["TextSync_mycurrenttime" ].text = vidcurrenttime;
	
		//change room color based on time to fade lights
		if(vidcurrenttime < 17)
		{
			room.objects["cinemaroom"].col.x = 1 - (vidcurrenttime/20);
		}
		else
		{
			room.objects["cinemaroom"].col.x = 0.15;
		}
	
	//wait 3 seconds to test values, but update every 2
	//if your current time is greater then the global text sync... then you become master sync guy
	//if you dont have the highest playback time, then DO NOT sync your current time to the global text sync
	if(global_time_passed > 3)
	{
		if(vidcurrenttime > room.objects["TextSync_myglobaltime"].pos.x)
		{
			if(global_time_passed%2 < 0.1)
			{
				room.objects["TextSync_myglobaltime"].pos.x  = vidcurrenttime;
				room.objects["TextSync_myglobaltime"].sync  = true;
			}
		}
		
		//if current video time is NOT within 5 seconds of the global sync then sync to the global sync
		if (Math.abs(vidcurrenttime - room.objects["TextSync_myglobaltime"].pos.x) > 5)
		{
			room.seekVideo("main4kvid", room.objects["TextSync_myglobaltime"].pos.x);
		}
		

	}
}