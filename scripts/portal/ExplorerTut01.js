/* RED 1st impact
    Above the Maple tree
    Made by Daenerys
*/

var status = -1;

function action(mode, type, selection) {
    if (mode == 1)
	status++;
    else
	status--;
    if (status == 0) {
	    //cm.sendNextS("I should complete Mai's quest first.",16);
		cm.warp(4000013);
		cm.dispose();
    }
}