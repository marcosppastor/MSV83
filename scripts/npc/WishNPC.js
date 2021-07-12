
/*

var status = -1;

function start() {
  action(1,0,0);
}

function action(mode,type,selection){
    if(mode == 1)
        status++;
    else{
        cm.dispose();
        return;
    }
    if(status == 0){
        cm.sendGetText("Type you item");
    }else if(status == 1){
        cm.sendSimple(cm.searchItem(cm.getText()));
    }else if(status == 2){
        cm.sendOk("There you got");
        cm.gainItem(selection);
        cm.dispose();
    }
}

*/