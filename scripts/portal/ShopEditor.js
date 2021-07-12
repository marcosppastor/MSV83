// 유나스토리 상점관리 스크립트 (goo.gl/w7zrtI)
// MIT License하에서 마음껏 배포 가능
// by ???

importPackage(Packages.database);
importPackage(Packages.server);

Array.prototype.safeSwap = function (x,y)
{
	if(x == y)
		return true;
	
	if(x >= 0 && x < this.length-1 && y >= 0 && y < this.length-1)
	{
		var b = this[x];
		this[x] = this[y];
		this[y] = b;
		
		return true;
	}
	return false;
}

var status = -1;
var ItemArray = new Array();
var Shopid = -1;
var CurrentItemIndex = -1;
var ItemInformationProvider = MapleItemInformationProvider.getInstance();

var INT_MAX = 0x11111111;

// Selection constants on status INITIAL
var EDIT_SHOP = 0;
var RELOAD_SHOP = 1;

// Selection constants on status GOT_SHOP_ID
var ADD_ITEM_FIRST = 0;

// Selection constants on status ITEM_SELECTED
var NOOP = 0;
var DELETE_ITEM = 1;
var EDIT_ITEM = 2;
var EDIT_REQ_ITEM = 3;
var EDIT_REQ_ITEM_Q = 4;
var ADD_ITEM_AFTER = 5;
var MOVE_UP = 6;
var MOVE_DOWN = 7;
var MOVE_MANUALLY = 8;
var MOVE_TO_FIRST = 9;
var MOVE_TO_LAST = 10;

// Status constants
var INITIAL = 0;

var GOT_TASK = -1;

var GOT_SHOP_ID = -1;
var ITEM_SELECTED = -1;
var GOT_ITEM_MANAGE_TASK = -1;

var GOT_ITEM_CODE = -1;
var GOT_REQ_ITEM_CODE = -1;
var GOT_REQ_ITEM_QUANTITY = -1;
var GOT_ITEM_INFO_TO_ADD = -1;
var GOT_ITEM_POS_TO_MOVE = -1;

function start()
{
	action(1, 0, 0);
}

function action(mode, type, selection)
{
	if (mode == 0)
	{
	    cm.dispose();
	    return;
	}
	status++;
	
	// This is GM only script
	if(!cm.getPlayer().isGM())
	{
		cm.sendOk("여행은 재밌으신가요?"); // GM이 아닌 일반 유저에게 보이는 대사는 여길 수정
		cm.dispose();
	}
	
	switch(status)
	{
		case INITIAL:
			getTask();
			break;
			
		case GOT_TASK:
			if(selection == EDIT_SHOP)
			{
				getShopId();
			}
			else if(selection == RELOAD_SHOP)
			{
				MapleShopFactory.getInstance().clear();
				cm.sendOk("게임 내 상점을 다시 불러왔습니다.\r\n" +
						"변경하신 사항이 적용되었습니다.");
				INITIAL = status + 1;
			}
			break;
			
		case GOT_SHOP_ID:
			Shopid = selection;
			listShopItems(Shopid);
			break;
			
		case ITEM_SELECTED:
			// 맨 앞에 아이템 추가
			if(selection == ADD_ITEM_FIRST)
			{
				CurrentItemIndex = -1;
				getItemInfoToAdd();
			}
			// 아이템 편집
			else
			{
				CurrentItemIndex = selection-1;
				getItemManageTask(ItemArray[CurrentItemIndex]);
			}
			break;
		
		case GOT_ITEM_MANAGE_TASK:
			switch(selection)
			{
				case NOOP:
					getItemManageTask(ItemArray[CurrentItemIndex]);
					break;
					
				case DELETE_ITEM:
					ItemArray[CurrentItemIndex].itemid = -1; // It marks to delete
					UpdateShopitems();
					listShopItems(Shopid);
					break;
				case MOVE_UP:
					if(ItemArray.safeSwap(CurrentItemIndex, CurrentItemIndex-1))
						UpdateShopitems();
					listShopItems(Shopid);
					break;
				case MOVE_DOWN:
					if(ItemArray.safeSwap(CurrentItemIndex, CurrentItemIndex+1))
						UpdateShopitems();
					listShopItems(Shopid);
					break;
				case MOVE_TO_FIRST:
					if(ItemArray.safeSwap(CurrentItemIndex, 0))
						UpdateShopitems();
					listShopItems(Shopid);
					break;
				case MOVE_TO_LAST:
					if(ItemArray.safeSwap(CurrentItemIndex, ItemArray.length-1))
						UpdateShopitems();
					listShopItems(Shopid);
					break;
					
				// Need more info
				case EDIT_ITEM:
					getItemCode();
					break;
				case EDIT_REQ_ITEM:
					getReqItemCode();
					break;
				case EDIT_REQ_ITEM_Q:
					getReqItemQuantity();
					break;
				case ADD_ITEM_AFTER:
					getItemInfoToAdd();
					break;
				case MOVE_MANUALLY:
					getItemPosToMove();
					break;
			}
			break;
		
		case GOT_ITEM_CODE:
			ItemArray[CurrentItemIndex].itemid = selection;
			UpdateShopitems();
			listShopItems(Shopid);
			break;
			
		case GOT_REQ_ITEM_CODE:
			ItemArray[CurrentItemIndex].reqitem = selection;
			if(ItemArray[CurrentItemIndex].reqitem == 0)
				ItemArray[CurrentItemIndex].reqitemq = 0;
			else
				ItemArray[CurrentItemIndex].price = 0;
			UpdateShopitems();
			listShopItems(Shopid);
			break;
			
		case GOT_REQ_ITEM_QUANTITY:
			if(ItemArray[CurrentItemIndex].reqitem == 0)
				ItemArray[CurrentItemIndex].price = selection;
			else
				ItemArray[CurrentItemIndex].reqitemq = selection;
			UpdateShopitems();
			listShopItems(Shopid);
			break;
			
		case GOT_ITEM_INFO_TO_ADD:
			var itemInfoString = cm.getText().replaceAll("\\s","").split(",");
			
			var mappableParseInt = function(str) { return parseInt(str, 10); };
			itemInfo = itemInfoString.map(mappableParseInt);
			
			// 아이템아이디, 가격, 필요아이템(메소=0)
			// 3개가 아니면 잘못된 입력
			if(itemInfo.length == 3)
			{
				var item = new Array();
				item.shopitemid = 0;
				item.itemid = itemInfo[0];
				item.price = (itemInfo[2] == 0) ? itemInfo[1] : 0;
				//item.position = CurrentItemIndex+1;
				item.reqitem = itemInfo[2];
				item.reqitemq = (itemInfo[2] > 0) ? itemInfo[1] : 0;
				item.rank = 0;
				ItemArray.splice(CurrentItemIndex+1, 0, item);
				UpdateShopitems();
			}
			listShopItems(Shopid);
			break;
		case GOT_ITEM_POS_TO_MOVE:
			if(ItemArray.safeSwap(CurrentItemIndex, selection))
				UpdateShopitems();
			listShopItems(Shopid);
			break;
	}

}

function getTask()
{
	GOT_TASK = status + 1;
	var msg = "#h #님 안녕하세요.\r\n" +
				"#L" + EDIT_SHOP + "#상점 수정하기#l\r\n" +
				"#L" + RELOAD_SHOP + "#상점 다시 불러오기#l\r\n";
	cm.sendSimple(msg);
}

function getShopId()
{
	GOT_SHOP_ID = status + 1;
	cm.sendGetNumber("수정할 상점 번호를 입력하세요.", 0, 1, INT_MAX);
}

function listShopItems(Shopid)
{
	var ps = DatabaseConnection.getConnection().prepareStatement("SELECT * FROM shopitems WHERE shopid = ? ORDER BY position ASC");
	ps.setInt(1, Shopid);
	var rs = ps.executeQuery();
	
	var msg = "#b" + Shopid + "번 상점#k에서 판매중인 아이템 목록은 다음과 같습니다.\r\n\r\n";
	
	msg += "#L" + ADD_ITEM_FIRST + "#여기에 아이템 추가#l\r\n";
	
	for(var i=0; rs.next(); i++)
	{
		ItemArray[i] = new Array();
		ItemArray[i].shopitemid = rs.getString("shopitemid");
		ItemArray[i].itemid = rs.getString("itemid");
		ItemArray[i].price = rs.getString("price");
		ItemArray[i].position = rs.getString("position");
		ItemArray[i].reqitem = rs.getString("reqitem");
		ItemArray[i].reqitemq = rs.getString("reqitemq");
		ItemArray[i].rank = rs.getString("rank");
		
		msg += "#L" + (i+1) + "#";
		if(ItemInformationProvider.itemExists(ItemArray[i].itemid))
		{
			msg += "#i" + ItemArray[i].itemid + "# ";
			msg += "#e#t" + ItemArray[i].itemid + "##n ";
		}
		else
		{
			msg += "ItemCode "
			msg += "#e[" + ItemArray[i].itemid + "]#n ";
		}
		msg += ItemArray[i].price + " ";
		if(ItemArray[i].reqitem == 0)
		{
			msg += "메소";
		}
		else
		{
			if(ItemInformationProvider.itemExists(ItemArray[i].reqitem))
			{
				msg += "#i" + ItemArray[i].reqitem + "# ";
				msg += "#t" + ItemArray[i].reqitem + "# ";
			}
			else
			{
				msg += "ItemCode "
				msg += "[" + ItemArray[i].reqitem + "] ";
			}
			msg += ItemArray[i].reqitemq + " 개 ";
		}
		
		msg += "#l\r\n";
	}
	
	ITEM_SELECTED = status + 1;
	cm.sendSimple(msg);
}

function getItemManageTask(item)
{
	var msg = "\r\n";

	msg += "#L" + NOOP + "##l\r\n"; // No-op to prevent mistakes
	
	if(ItemInformationProvider.itemExists(item.itemid))
	{
		msg += "#i" + item.itemid + "# ";
		msg += "#e#t" + item.itemid + "##n ";
	}
	else
	{
		msg += "ItemCode "
		msg += "#e[" + item.itemid + "]#n ";
	}
	msg += item.price + " ";
	if(item.reqitem == 0)
	{
		msg += "메소";
	}
	else
	{
		if(ItemInformationProvider.itemExists(item.reqitem))
		{
			msg += "#i" + item.reqitem + "# ";
			msg += "#t" + item.reqitem + "# ";
		}
		else
		{
			msg += "ItemCode "
			msg += "[" + item.reqitem + "] ";
		}
		msg += item.reqitemq + " 개 ";
	}
	msg += "\r\n";
	
	msg += "#r#L" + DELETE_ITEM + "#삭제#l#k " +
			"#L" + EDIT_ITEM + "#아이템 변경#l" +
			"#L" + EDIT_REQ_ITEM_Q + "#가격 변경#l " +
			"#L" + EDIT_REQ_ITEM + "#지불수단 변경#l\r\n" +
			"#L" + ADD_ITEM_AFTER + "#이 아이템 뒤에 아이템 추가#l\r\n" +
			"\r\n\r\n" +
			"위치 변경\r\n" +
			"#L" + MOVE_UP + "# 한 칸 위로#l" +
			"#L" + MOVE_DOWN + "# 한 칸 아래로#l" +
			"#L" + MOVE_MANUALLY + "# 직접 입력#l\r\n" +
			"#L" + MOVE_TO_FIRST + "# 가장 위로#l" +
			"#L" + MOVE_TO_LAST + "# 가장 아래로#l\r\n";
	
	GOT_ITEM_MANAGE_TASK = status + 1;
	cm.sendSimple(msg);
}

function getItemCode()
{
	GOT_ITEM_CODE = status + 1;
	cm.sendGetNumber("수정할 아이템 코드를 입력하세요.", 0, 1, INT_MAX);
}
					
function getReqItemCode()
{
	GOT_REQ_ITEM_CODE = status + 1;
	cm.sendGetNumber("필요한 아이템 코드(메소일 경우 0)를 입력하세요.", 0, 1, INT_MAX);
}
function getReqItemQuantity()
{
	GOT_REQ_ITEM_QUANTITY = status + 1;
	cm.sendGetNumber("필요한 메소(또는 아이템 개수)를 입력하세요.", 0, 1, INT_MAX);
}
				
function getItemInfoToAdd()
{
	GOT_ITEM_INFO_TO_ADD = status + 1;
	cm.sendGetText("추가할 아이템 정보를 입력하세요.\r\n" + 
					"아이템아이디, 가격, 필요아이템(메소=0)");
}

function getItemPosToMove()
{
	GOT_ITEM_POS_TO_MOVE = status + 1;
	cm.sendGetNumber("이동시킬 위치를 입력해주세요.", 0, 0, INT_MAX);
}

function UpdateShopitems()
{	
	for(var i=0; i < ItemArray.length; i++)
	{
		if(ItemArray[i].itemid == -1)
		{
			ps = DatabaseConnection.getConnection().prepareStatement("DELETE FROM shopitems WHERE shopitemid = ? LIMIT 1");
			ps.setInt(1, ItemArray[i].shopitemid);
			ps.executeUpdate();
		}
		if(ItemArray[i].shopitemid == 0)
		{
			ps = DatabaseConnection.getConnection().prepareStatement("INSERT INTO shopitems(shopid,itemid,price,position,reqitem,reqitemq,rank) VALUES(?,?,?,?,?,?,?)");
			ps.setInt(1, Shopid);
			ps.setInt(2, ItemArray[i].itemid);
			ps.setInt(3, ItemArray[i].price);
			//ps.setInt(4, ItemArray[i].position);
			ps.setInt(4, i);
			ps.setInt(5, ItemArray[i].reqitem);
			ps.setInt(6, ItemArray[i].reqitemq);
			ps.setInt(7, ItemArray[i].rank);
			cm.sendOk(ps);
			ps.executeUpdate();
		}
		else
		{
			ps = DatabaseConnection.getConnection().prepareStatement("UPDATE shopitems SET itemid = ?, price = ?, position = ?, reqitem = ?, reqitemq = ? WHERE shopitemid = ? LIMIT 1");
			ps.setInt(1, ItemArray[i].itemid);
			ps.setInt(2, ItemArray[i].price);
			//ps.setInt(3, ItemArray[i].position);
			ps.setInt(3, i);
			ps.setInt(4, ItemArray[i].reqitem);
			ps.setInt(5, ItemArray[i].reqitemq);
			ps.setInt(6, ItemArray[i].shopitemid);
			ps.executeUpdate();
		}
	}
}